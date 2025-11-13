/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { envVars } from "../config/env";


export const globalErrorHandler = async(err:any,req:Request,res:Response,next:NextFunction)=>{
    let statusCode = 500 ;
    let message =`Something went wrong  `;
    const errorSource:any = [];
    
    
    if(err.code===11000){
        
        const duplicate = err.message.match(/"([^"]*)"/)
        statusCode=400
        message = `duplicate field is : ${duplicate[1]}`
    }
    else if(err.name==="CastError"){
        statusCode=400
        message="Invalid MongoDB ObjectID . Please provide a valid id"
    }
   else if(err instanceof AppError){
        statusCode=err.statusCode
        message=err.message
    } 
    else if(err.name==="ValidationError"){
        statusCode=400
        message="validation error occurred"
          const simplifiedError=Object.values(err.errors)
          simplifiedError.forEach((simplifiedErrorObject:any)=>errorSource.push({
            path:simplifiedErrorObject.path,
            message:simplifiedErrorObject.message
          }))
          console.log("error sources is very dengarus",errorSource)
          
    }
    else if(err instanceof Error){
        statusCode=500
        message=err.message 
    }
    


    res.status(statusCode).json({
        success:false,
        message, 
        errorSource,
        err,
        stack:envVars.NODE_ENV==="DEVELOPMENT" ? err.stack : null
    }) 
}