import { Types } from "mongoose";
export enum BookingStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled'
}
export interface IBooking {
    user: Types.ObjectId;
    tour: Types.ObjectId;
    payment: Types.ObjectId;
    numberOfGuests: number;
    status: BookingStatus;
    
    
}