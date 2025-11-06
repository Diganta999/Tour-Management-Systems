/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import statusCode from "http-status-codes"
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utils/setCookie";
import { JwtPayload } from "jsonwebtoken";

const authLoginController = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const user = await AuthService.authLoginService(req.body)
    
    setAuthCookie(res,user)
    
    sendResponse(res,{
        statusCode:statusCode.OK,
        message:"Login successfully",
        success:true,
        data:user
    })
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

 export const AuthController ={
    authLoginController,
    getNewAccessToken,
    logoutController,
    resetPasswordController
}