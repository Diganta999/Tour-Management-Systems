import AppError from "../../errorHelpers/AppError";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";
import statusCode from "http-status-codes"

const createDivisionService = async (payload: Partial<IDivision>) => {

    const isDivisionExist = await Division.findOne({ name: payload.name });
    if (isDivisionExist) {
        throw new AppError(statusCode.BAD_REQUEST, "A Division with this name already exist")
    }

    // const baseSlug = payload.name?.toLowerCase().split(" ").join("-");
    // let slug = `${baseSlug}-division`;
    // let count =0;
    // while(await Division.exists({slug})){
    //     slug = `${slug}-${count++}`
    // }
    // payload.slug=slug

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
const retrieveSingleDivisionServices = async (slug:string) => {
    const division = await Division.findOne({slug});
    
    return {
        division 
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
    // if(data.name){
    //     const baseSlug = data.name?.toLowerCase().split(" ").join("-");
    //         let slug = `${baseSlug}-tour`;
    //         let count = 0 ;
    //         while(await Division.exists({slug})){
    //           slug = `${slug}-${count++}`
    //         }
    //         data.slug = slug
    // }

    const divisionUpdate = await  Division.findByIdAndUpdate(id,data,{
        new:true,
        runValidators:true
    })
    return divisionUpdate


}


 const deleteDivisionService = async (id:string)=>{
                 const deleteDivision = await Division.findByIdAndDelete(id);
                 return deleteDivision
         }

export const DivisionService = {
    createDivisionService,
    retrieveAllDivisionService,
    retrieveSingleDivisionServices,
    updateDivisionService,
    deleteDivisionService
}