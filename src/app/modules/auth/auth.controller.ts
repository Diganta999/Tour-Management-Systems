/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import statusCode from "http-status-codes"
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utils/setCookie";
import { JwtPayload } from "jsonwebtoken";
import { createUserToken } from "../../utils/userTokens";
import { envVars } from "../../config/env";
import passport from "passport";
import { IUser } from "../user/user.interface";

const authLoginController = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    // const user = await AuthService.authLoginService(req.body)

    passport.authenticate("local",async(err:any,user:any,info:any)=>{
        if(err){
          return next(err)
        }
      const createToken= await createUserToken(user)
      const {password:pass,...rest}=user.toObject()
      setAuthCookie(res,createToken)
         sendResponse(res,{
        statusCode:statusCode.OK,
        message:"Login successfully",
        success:true,
        data:{
            accessToken:createToken.accessToken,
            refreshToken:createToken.refreshToken,
            user:rest
        }
    })
    })(req,res,next)
    
    
    
   
})
const getNewAccessToken = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        throw new AppError(statusCode.BAD_REQUEST,"no refresh token received from cookies !!!!!!!!")
    }
    const tokenInfo = await AuthService.getNewAccessToken(refreshToken as string)
    setAuthCookie(res,tokenInfo)
    sendResponse(res,{
        statusCode:statusCode.OK, 
        message:"refreshToken generate successfully",
        success:true,
        data:tokenInfo
    })
})
const logoutController = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
   res.clearCookie("accessToken",{
    httpOnly:true,
    secure:false,
    sameSite:"lax"
   })
   res.clearCookie("refreshToken",{
    httpOnly:true,
    secure:false,
    sameSite:"lax"
   })
    sendResponse(res,{
        statusCode:statusCode.OK, 
        message:"logout successfully",
        success:true,
        data:null
    })
})
const resetPasswordController = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const {oldPassword,newPassword}=req.body;
    const decodedToken= req.user;
   const user = await AuthService.resetPasswordService(decodedToken as JwtPayload,oldPassword,newPassword)
    sendResponse(res,{
        statusCode:statusCode.OK, 
        message:"password reset successfully",
        success:true,
        data:null
    })
})
const googleCallBackController = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
     let redirectTo = req.query.state ? req.query.state as string : ""

    if (redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1)
    }

    
    const user = req.user;

    if (!user) {
        throw new AppError(statusCode.NOT_FOUND, "User Not Found")
    }

    const tokenInfo =await createUserToken(user)

   await setAuthCookie(res, tokenInfo)


    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)
})

 export const AuthController ={
    authLoginController,
    getNewAccessToken,
    logoutController,
    resetPasswordController,googleCallBackController
}