import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { BookingService } from "./booking.service"
import { sendResponse } from "../../utils/sendResponse"

const createBookingController = catchAsync(async(req:Request,res:Response)=>{
  const booking = await BookingService.createBookingService()
  sendResponse(res,{
    statusCode:201,
    success:true,
    message:'Booking created successfully',
    data:booking
  })
})

const getBookingController = catchAsync(async(req:Request,res:Response)=>{
  const bookings = await BookingService.getBookingDetailsService(req.params.id)
  sendResponse(res,{
    statusCode:200,
    success:true,
    message:'Booking retrieved successfully',
    data:bookings
  })
})

const getMyBookingController = catchAsync(async(req:Request,res:Response)=>{
  const bookings = await BookingService.getMyBookingDetailsService(req.params.id)
  sendResponse(res,{
    statusCode:200,
    success:true,
    message:'My bookings retrieved successfully',
    data:bookings
  })
})

const getOneBookingController = catchAsync(async(req:Request,res:Response)=>{
  const booking = await BookingService.getOneBookingDetailsService(req.params.id)
  sendResponse(res,{
    statusCode:200,
    success:true,
    message:'Booking details retrieved successfully',
    data:booking
  })
})

const updateBookingController = catchAsync(async(req:Request,res:Response)=>{
  const updatedBooking = await BookingService.updateBookingService(req.params.id, req.body)
  sendResponse(res,{
    statusCode:200,
    success:true,
    message:'Booking updated successfully',
    data:updatedBooking
  })
})

const deleteBookingController = catchAsync(async(req:Request,res:Response)=>{
  const cancelledBooking = await BookingService.cancelBookingService(req.params.id)
  sendResponse(res,{
    statusCode:200,
    success:true,
    message:'Booking cancelled successfully',
    data:cancelledBooking
  })
})  

export const BookingController = {
  createBookingController,
  getBookingController,
  getMyBookingController,
  getOneBookingController,
  updateBookingController,
  deleteBookingController



}