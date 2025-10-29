/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { UserServices } from "./user.service";

const createUserController =async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const user =UserServices.createUserService(req.body)
        
        res.status(httpStatus.CREATED).json({
            message:"user create successfully",
            user
        })

    } catch (error :any) {
        console.log(error)
        next(error)
    }
}

export const userController ={
    createUserController 
}