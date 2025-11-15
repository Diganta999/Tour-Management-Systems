/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { DivisionService } from "./division.service";
import { sendResponse } from "../../utils/sendResponse";
import statusCode from "http-status-codes"
import { catchAsync } from "../../utils/catchAsync";
const createDivisionController = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
          const division = await DivisionService.createDivisionService(req.body);
          sendResponse(res,{
            success:true,
            statusCode:statusCode.OK,
            message:"Division create successfully",
            data:division
          })
})

const retrieveAllDivisionController= catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const allDivision = await DivisionService.retrieveAllDivisionService()
    sendResponse(res,{
            success:true,
            statusCode:statusCode.OK,
            message:"Division create successfully",
            data:allDivision.allDivision,
            meta:{
                total:allDivision.total
            }

          })
})

export const DivisionController ={
    createDivisionController,
    retrieveAllDivisionController
}