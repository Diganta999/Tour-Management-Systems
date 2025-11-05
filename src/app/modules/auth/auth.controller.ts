/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import statusCode from "http-status-codes"
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utils/setCookie";

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
        message:"token generate successfully",
        success:true,
        data:tokenInfo
    })
})

 export const AuthController ={
    authLoginController,
    getNewAccessToken
}