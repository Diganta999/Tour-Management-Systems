import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import statusCode from "http-status-codes"
import bcrypt from "bcryptjs"

import { generateToken } from "../../utils/jwt";
import { envVars } from "../../config/env";

const authLoginService= async(payload:Partial<IUser>)=>{
    const {email,password}=payload;
    const isUserExist= await User.findOne({email})
    if(!isUserExist){
        throw new AppError(statusCode.BAD_GATEWAY,"user not exist")
    }
    const isPasswordMatched =await bcrypt.compare(password as string,isUserExist.password as string)
    if(!isPasswordMatched){
        throw new AppError(statusCode.BAD_REQUEST,"password is incorrect")
    }
    const jwtPayload = {
        userId:isUserExist._id,
        email:isUserExist.email,
        role:isUserExist.role
    }
    const accessToken = generateToken(jwtPayload,envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRES)

    
    return {
        email:isUserExist.email,
        accessToken:accessToken
    }

}

export const AuthService={
    authLoginService
}