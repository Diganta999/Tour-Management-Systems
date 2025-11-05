import AppError from "../../errorHelpers/AppError";
import { IsActive, IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import statusCode from "http-status-codes"
import bcrypt from "bcryptjs"
import { createUserToken } from "../../utils/userTokens";
import { generateToken, verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

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
    const token=await createUserToken(isUserExist);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password :  pass,...rest}=isUserExist.toObject()
    
    return {
        accessToken:token.accessToken,
        refreshToken:token.refreshToken,
        user:rest
    }

}
const getNewAccessToken= async(refreshToken:string)=>{
    
    const verifyRefreshToken = verifyToken(refreshToken,envVars.JWT_REFRESH_SECRET) as JwtPayload;
    
    if(!verifyRefreshToken){
        throw new AppError(statusCode.BAD_GATEWAY,"refresh token is not   verified")
    }
    
    const isUserExist= await User.findOne({email:verifyRefreshToken.email})
    
    if(!isUserExist){
        throw new AppError(statusCode.BAD_GATEWAY,"user not exist")
    }
    if(isUserExist.isActive===IsActive.BLOCKED){
        throw new AppError(statusCode.BAD_REQUEST,"You are Blocked")
    }
    if(isUserExist.isActive===IsActive.INACTIVE){
        throw new AppError(statusCode.BAD_GATEWAY,"you are Inactive")
    }
    if(isUserExist.isDeleted){
        throw new AppError(statusCode.BAD_REQUEST,"User is Deleted")
    }
    const jwtPayload = {
        userId:isUserExist._id,
        email:isUserExist.email,
        role:isUserExist.role
    }

    const accessToken = generateToken(jwtPayload,envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRES)
    
    return {
       accessToken
    }

}

export const AuthService={
    authLoginService,
    getNewAccessToken
}