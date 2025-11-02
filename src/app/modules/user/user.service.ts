import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes"

const createUserService = async (payload: Partial<IUser>) => {

    const {email,...rest}=payload;
    const isUserExist = await User.findOne({email});
    if(isUserExist){
        throw  new AppError(httpStatus.BAD_REQUEST,"user is all ready exist")
    }
    const auths:IAuthProvider ={provider:"credential",providerId:email as string} 
const user = await User.create({
    email,
    auths,
    ...rest
})
 return user
}

const getAllUsersService=async()=>{
    const users = await User.find({})
    const total= await User.countDocuments()
    return {
        data:users,
        meta:{
            total:total
        }
    }
}


export const UserServices = {
    createUserService,
    getAllUsersService
}