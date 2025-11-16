import AppError from "../../errorHelpers/AppError";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";
import statusCode from "http-status-codes"

const createDivisionService = async (payload: Partial<IDivision>) => {

    const isDivisionExist = await Division.findOne({ name: payload.name });
    if (isDivisionExist) {
        throw new AppError(statusCode.BAD_REQUEST, "A Division with this name already exist")
    }

    const division = await Division.create(payload)
    return division;

}

const retrieveAllDivisionService = async () => {
    const allDivision = await Division.find()
    const total = await Division.countDocuments()
    return {
        allDivision,
        total
    }
}


const updateDivisionService = async (id: string, data: Partial<IDivision>) => {
    
    
    if (data.name) {
        const duplicateDivision = await Division.findOne({
            name: data.name,
            _id: { $ne: id },
        });
        if (duplicateDivision) {
            throw new AppError(statusCode.BAD_REQUEST, "A division with this name already exists.");
        }
    }

    const isDivisionExist = await Division.findById(id);
    if(!isDivisionExist){
        throw new AppError(statusCode.BAD_REQUEST, "Division not found.")
    }

    const divisionUpdate = await  Division.findByIdAndUpdate(id,data,{
        new:true,
        runValidators:true
    })
    return divisionUpdate


}

export const DivisionService = {
    createDivisionService,
    retrieveAllDivisionService,
    updateDivisionService
}