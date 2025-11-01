import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserService = async (payload: Partial<IUser>) => {
const user = await User.create(payload)
 return user
}

const getAllUsersService=async()=>{
    const users = await User.find({})
    return users;
}


export const UserServices = {
    createUserService,
    getAllUsersService
}