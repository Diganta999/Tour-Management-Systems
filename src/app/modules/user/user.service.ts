import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserService = async (payload: Partial<IUser>) => {
const user = await User.create(payload)
 return user
}

const getAllUsersService=async()=>{
    const users = await User.find({})
    const total= await User.countDocuments()
    return {
        data:users,
        meta:{
            total:total
        }
    }
}


export const UserServices = {
    createUserService,
    getAllUsersService
}