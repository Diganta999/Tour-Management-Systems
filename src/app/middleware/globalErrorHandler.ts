/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { envVars } from "../config/env";


export const globalErrorHandler = async(err:any,req:Request,res:Response,next:NextFunction)=>{
    let statusCode = 500 ;
    let message =`Something went wrong  `;
    
    if(err.code===11000){
        
        const duplicate = err.message.match(/"([^"]*)"/)
        statusCode=400
        message = `duplicate field is : ${duplicate[1]}`
    }
   else if(err instanceof AppError){
        statusCode=err.statusCode
        message=err.message
    } 
    else if(err instanceof Error){
        statusCode=500
        message=err.message
    }


    res.status(statusCode).json({
        success:false,
        message,
        err,
        stack:envVars.NODE_ENV==="DEVELOPMENT" ? err.stack : null
    }) 
}