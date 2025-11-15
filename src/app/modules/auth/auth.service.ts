/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppError from "../../errorHelpers/AppError";
import {  IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import statusCode from "http-status-codes"
import bcrypt from "bcryptjs"
import { createNewAccessTokenWithRefreshToken, createUserToken } from "../../utils/userTokens";
import { JwtPayload } from "jsonwebtoken";
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
     const tokenInfo = await createNewAccessTokenWithRefreshToken(refreshToken)
   
    
    return {
       accessToken:tokenInfo
    }

}
const resetPasswordService= async(decodedToken:JwtPayload,oldPassword:string,newPassword:string)=>{
     
   const user = await User.findById(decodedToken.userId)  ;
   

   const isPasswordMatched =await  bcrypt.compare(oldPassword,user!.password as string)
   if(!isPasswordMatched){
    throw new AppError(statusCode.FORBIDDEN,"password dost not match !!!!!")
   }
   const newHashPassword = await bcrypt.hash(newPassword,Number(envVars.SLOT_ROUND));
   user!.password=newHashPassword;
   await user?.save()

    
    return {
       
    }

}

export const AuthService={
    authLoginService,
    getNewAccessToken,
    resetPasswordService
}