import { Request, Response } from "express";
import httpStatusCode from "http-status-codes"


const notFound = async(req:Request,res:Response)=>{
    res.status(httpStatusCode.NOT_FOUND).json({
        success:false,
        message:"Route not Found.Please conform your route!!!!!!"
    })
}
export default notFound;