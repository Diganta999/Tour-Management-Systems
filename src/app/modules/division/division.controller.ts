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
            message:"All division retrieve successfully",
            data:allDivision.allDivision,
            meta:{
                total:allDivision.total
            }

          })
})
const retrieveSingleDivisionController= catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
  console.log(req.params.slug)
    const oneDivision = await DivisionService.retrieveSingleDivisionServices(req.params.slug);
    sendResponse(res,{
            success:true,
            statusCode:statusCode.OK,
            message:"Division retrieve successfully",
            data:oneDivision

          })
})
const updateDivisionController = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const id = req.params.id;
    const data = req.body;
    const updateDivision = await DivisionService.updateDivisionService(id,data);
    sendResponse(res,{
            success:true,
            statusCode:statusCode.OK,
            message:"Division update successfully",
            data:updateDivision
          })
})
const deleteDivisionController=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
  const id = req.params.id;
  const data = await DivisionService.deleteDivisionService(id);
   sendResponse(res,{
            success:true,
            statusCode:statusCode.OK,
            message:"Division Delete successfully",
            data:data
          })
})

export const DivisionController ={
    createDivisionController,
    retrieveAllDivisionController,
    retrieveSingleDivisionController,
    updateDivisionController,
    deleteDivisionController
}