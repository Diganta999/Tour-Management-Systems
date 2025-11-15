import AppError from "../../errorHelpers/AppError";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";
import statusCode from "http-status-codes"

const createDivisionService=async(payload:Partial<IDivision>)=>{

    const isDivisionExist = await Division.findOne({name:payload.name});
    if(isDivisionExist){
        throw new AppError(statusCode.BAD_REQUEST,"A Division with this name already exist")
    }

    const division = await Division.create(payload)
    return division;

}

const retrieveAllDivisionService = async()=>{
    const allDivision = await Division.find()
    const total = await Division.countDocuments()
    return{
        allDivision,
        total
    }
}

export const DivisionService={
    createDivisionService,
    retrieveAllDivisionService
}