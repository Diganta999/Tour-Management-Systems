import {  model, Schema } from "mongoose";
import { BookingStatus, IBooking } from "./booking.interface";

export const BookingSchema = new Schema<IBooking>({
    user:{type:Schema.Types.ObjectId,ref:"User",required:true},
    tour:{type:Schema.Types.ObjectId,ref:"Tour",required:true},
    payment:{type:Schema.Types.ObjectId,ref:"Payment",required:true},
    numberOfGuests:{type:Number,required:true},
    status:{type:String,enum:Object.values(BookingStatus),default:BookingStatus.PENDING}
},{
    timestamps:true
});

export const Booking = model<IBooking>("Booking",BookingSchema);