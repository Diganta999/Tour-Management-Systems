import { Types } from "mongoose";
export enum PaymentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    FAILED = 'failed',
    REFUNDED = 'refunded'
}
export interface IPayment {
    amount: number;
    transactionId: string;
    bookingId: Types.ObjectId ;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    paymentGateway?: any;
    invoiceUrl?: string;
    status: PaymentStatus;
}