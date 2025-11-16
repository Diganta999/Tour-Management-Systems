import AppError from "../../errorHelpers/AppError"
import { ITour, ITourTypes } from "./tour.interface"
import { Tour, TourType } from "./tour.model"
import statusCode from "http-status-codes"
const createTourTypeService = async(payload:Partial<ITourTypes>)=>{

    const isTourTypeExist = await TourType.findOne({name:payload.name})
    if(isTourTypeExist){
        throw new AppError(statusCode.BAD_GATEWAY,"Tour type all ready exist")
    }

    const tourType = await TourType.create(payload)
    return tourType

}



const retrieveAllTourTypeService = async()=>{
  const tourTypes = await TourType.find({})
  const total = await TourType.countDocuments()
  return{
     tourTypes,
     total
  }
}



const updateTourTypeService = async (id: string, data: Partial<ITourTypes>) => {
  const existingTourType = await TourType.findById(id)
  if (!existingTourType) {
    throw new AppError(statusCode.NOT_FOUND, "Tour type not found")
  }

  if (data.name) {
    const duplicate = await TourType.findOne({
      name: data.name,
      _id: { $ne: id }
    })
    if (duplicate) {
      throw new AppError(statusCode.BAD_REQUEST, "A tour type with this name already exists")
    }
  }

  const updatedTourType = await TourType.findByIdAndUpdate(id, data, { new: true , runValidators:true})
  return updatedTourType
}





const createTourService=async(payload:Partial<ITour>)=>{
  const existingTour = await Tour.findOne({ title: payload.title });
    if (existingTour) {
        throw new AppError(statusCode.BAD_GATEWAY,"A tour with this title already exists.");
    }
    const tour = await Tour.create(payload) 
    return tour
}












export const TourService={
    createTourTypeService,
    retrieveAllTourTypeService,
    updateTourTypeService,
    createTourService
}