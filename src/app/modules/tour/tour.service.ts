import { exclusiveField } from "./tour.constant"
import AppError from "../../errorHelpers/AppError"
import { searchingField } from "./tour.constant"
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
   
  const tourTypes = await TourType.find()
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
    // const baseSlug = payload.title?.toLowerCase().split(" ").join("-");
    // let slug = `${baseSlug}-tour`;
    // let count = 0 ;
    // while(await Tour.exists({slug})){
    //   slug = `${slug}-${count++}`
    // }
    // payload.slug = slug
    const tour = await Tour.create(payload) 
    return tour
}




const retrieveAllTourService = async(query: Record<string, string>)=>{
  const filter = query;
  
  const search = filter.searchTerm || "";
  const sort = filter.sort || "-createdAt";
  const fields = query.fields?.split(",").join(" ") || "";
  const page = Number(query.skip) || 1 ;
  const limit = Number(query.limit) || 10;

  const skip = (page-1)*10 ; 
  

  

  for(const field of exclusiveField){
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete filter[field]
  }
  
  
  
  const searching ={
    $or: searchingField.map(field=>({[field]:{$regex:search,$options:"i"}}))
  }
  
  const tour = await Tour.find(searching).find(filter).sort(sort).select(fields).skip(skip).limit(limit);   
  const total = await Tour.countDocuments()
  return{
    tour,
    total
  } 
}
const retrieveOneTourService = async(slug:string)=>{
  const tour = await Tour.findOne({slug});
  
  return tour ; 
} 

const updateTourService=async(id:string,payload:Partial<ITour>)=>{
      const isTourExist = await Tour.findById(id);
      if(!isTourExist){
        throw new AppError(statusCode.BAD_GATEWAY,"tour not exist")

      } 

      if(payload.title){
      const baseslug = payload.title?.toLocaleLowerCase().split(" ").join("-");
      let slug = `baseslug`; 
      let count = 0;
      while(await Tour.exists({slug})){
        slug =  `${baseslug}-${count++}`
      }
      payload.slug=slug;
      }
      const updateTour = await Tour.findByIdAndUpdate(id,payload,{
        new:true,
        runValidators:true
      })
      return updateTour;


}

 const deleteTourService=async(id:string)=>{
       const deleteTour = await Tour.findByIdAndUpdate(id);
       return deleteTour;

 }





export const TourService={
    createTourTypeService,
    retrieveAllTourTypeService,
    updateTourTypeService, 
    createTourService,
    retrieveAllTourService,
    retrieveOneTourService,
    updateTourService,
    deleteTourService
}





