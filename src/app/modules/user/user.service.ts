import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"

const createUserService = async (payload: Partial<IUser>) => {

    const { email, password, ...rest } = payload;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "user is all ready exist")
    }
    const inCryptPassword = await bcryptjs.hash(password as string, 10);
    
    const auths: IAuthProvider = { provider: "credential", providerId: email as string }
    const user = await User.create({
        email,
        auths,
        password: inCryptPassword,
        ...rest
    })
    return user ;
}

const getAllUsersService = async () => {
    const users = await User.find({})
    const total = await User.countDocuments()
    return {
        data: users,
        meta: {
            total: total
        }
    }
}


export const UserServices = {
    createUserService,
    getAllUsersService
}
