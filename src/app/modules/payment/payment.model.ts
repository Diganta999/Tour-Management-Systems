import { model, Schema } from "mongoose";
import { IPayment, PaymentStatus } from "./payment.interface";

export const paymentSchema = new Schema<IPayment>({
    amount:{type:Number,required:true},
    transactionId:{type:String,required:true,unique:true},
    bookingId:{type:Schema.Types.ObjectId,
        ref:"Booking"
    ,required:true,
    unique:true},
    paymentGateway:{type:Schema.Types.Mixed},
    invoiceUrl:{type:String},
    status:{type:String,enum:Object.values(PaymentStatus),default:PaymentStatus.PENDING}
},{
    timestamps:true
})        

export const Payment = model<IPayment>("Payment", paymentSchema);