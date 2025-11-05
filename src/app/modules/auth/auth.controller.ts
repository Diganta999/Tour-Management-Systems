/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import statusCode from "http-status-codes"
import AppError from "../../errorHelpers/AppError";

const authLoginController = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const user = await AuthService.authLoginService(req.body)
    res.cookie("accessToken",user.accessToken,{
        httpOnly:true,
        secure:false
    })
    res.cookie("refreshToken",user.refreshToken,{
        httpOnly:true,
        secure:false
    })
    
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
    sendResponse(res,{
        statusCode:statusCode.OK, 
        message:"token generate successfully",
        success:true,
        data:tokenInfo.accessToken
    })
})

 export const AuthController ={
    authLoginController,
    getNewAccessToken
}