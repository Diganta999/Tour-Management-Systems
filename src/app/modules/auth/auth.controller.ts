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

 export const AuthController ={
    authLoginController
}