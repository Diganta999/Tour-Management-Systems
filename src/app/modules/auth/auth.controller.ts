/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import statusCode from "http-status-codes"

const authLoginController = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const user = await AuthService.authLoginService(req.body)
    sendResponse(res,{
        statusCode:statusCode.OK,
        message:"Login successfully",
        success:true,
        data:user
    })
})
const getNewAccessToken = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    // const refreshToken = req.cookies.refreshToken;
    const refreshToken = req.headers.authorization;
    const tokenInfo = await AuthService.getNewAccessToken(refreshToken as string)
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