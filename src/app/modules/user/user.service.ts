import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import statusCode from "http-status-codes"
import bcryptjs from "bcryptjs"
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const createUserService = async (payload: Partial<IUser>) => {

    const { email, password, ...rest } = payload;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
        throw new AppError(statusCode.BAD_REQUEST, "user is all ready exist")
    }
    const inCryptPassword = await bcryptjs.hash(password as string,Number(envVars.SLOT_ROUND));
    
    const authProvider: IAuthProvider = { provider: "credential", providerId: email as string }
    const user = await User.create({
        email,
        auths:[authProvider],
        password: inCryptPassword,
        ...rest
    })
    return user ;
}

const updateUserService=async(userId:string,payload:Partial<IUser>,decodedToken:JwtPayload)=>{
    const isUserExist = await User.findById(userId);
    if(!isUserExist){
        throw new AppError(statusCode.FORBIDDEN,"You are not authorized")
    }
    if(decodedToken.role===Role.USER || decodedToken.role===Role.GUIDE){
        if(decodedToken.userId!==userId){
            throw new AppError(statusCode.FORBIDDEN,"You are not authorized")
        }
    }
    if(payload.role){
        if(decodedToken.role===Role.USER || payload.role===Role.GUIDE){
            throw new AppError(statusCode.FORBIDDEN,"You are not authorized")

        }
        if(decodedToken.role===Role.ADMIN || payload.role===Role.SUPER_ADMIN){
            throw new AppError(statusCode.FORBIDDEN,"You are not authorized")
        }
    }

    if(payload.isActive || payload.isDeleted || payload.isVerified){
        throw new AppError(statusCode.FORBIDDEN,"You are not authorized")
    }

    if(payload.password){
        payload.password= await bcryptjs.hash(payload.password,envVars.SLOT_ROUND)
    }

    const newUpdateUser = await User.findByIdAndUpdate(userId,payload,{new:true,runValidators:true}) 
    return newUpdateUser;
    
}


const getAllUsersService = async () => {
    const users = await User.find({})
    const total = await User.countDocuments()
    return {
        data: users,
        meta: {
            total: total
        }
    }
}


export const UserServices = {
    createUserService,
    getAllUsersService,
    updateUserService
}
