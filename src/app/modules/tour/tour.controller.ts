/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import statusCode from "http-status-codes"
import { TourService } from "./tour.service";

const createTourTypeController = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
       const tourType = await TourService.createTourTypeService(req.body)

       sendResponse(res,{
         success:true,
            statusCode:statusCode.OK,
            message:"Tour Type create successfully",
            data:tourType
       })
})

const retrieveAllTourTypeController = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const tourType = await TourService.retrieveAllTourTypeService()
    sendResponse(res,{
         success:true,
            statusCode:statusCode.OK,
            message:" All TourType retrieve successfully",
            data:tourType.tourTypes,
            meta:{
                total:tourType.total
            }
       })
})


const updateTourTypeController = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const data = req.body;
    const tourType = await TourService.updateTourTypeService(id,data)
      sendResponse(res,{
         success:true,
            statusCode:statusCode.OK,
            message:"Tour Type update successfully",
            data:tourType
       })
})



// Tour management 
const createTourController=catchAsync(async(req: Request, res: Response, next: NextFunction) => {
      const tour = await TourService.createTourService(req.body)
       sendResponse(res,{
         success:true,
            statusCode:statusCode.OK,
            message:"Tour create successfully",
            data:tour
       })
})



export const TourController ={
      createTourTypeController,
      retrieveAllTourTypeController,
      updateTourTypeController,
      createTourController
}