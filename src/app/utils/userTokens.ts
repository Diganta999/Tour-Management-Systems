import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { IsActive, IUser } from "../modules/user/user.interface";
import { generateToken, verifyToken } from "./jwt";
import AppError from "../errorHelpers/AppError";
import statusCode from "http-status-codes"
import { User } from "../modules/user/user.model";

export const createUserToken = async (user: Partial<IUser>) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role
    }
    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)
    const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)

    return {
        accessToken,
        refreshToken
    }
}

export const createNewAccessTokenWithRefreshToken = async (refreshToken: string) => {
    const verifyRefreshToken = verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET) as JwtPayload;

    if (!verifyRefreshToken) {
        throw new AppError(statusCode.BAD_GATEWAY, "refresh token is not   verified")
    }

    const isUserExist = await User.findOne({ email: verifyRefreshToken.email })

    if (!isUserExist) {
        throw new AppError(statusCode.BAD_GATEWAY, "user not exist")
    }
    if (isUserExist.isActive === IsActive.BLOCKED) {
        throw new AppError(statusCode.BAD_REQUEST, "You are Blocked")
    }
    if (isUserExist.isActive === IsActive.INACTIVE) {
        throw new AppError(statusCode.BAD_GATEWAY, "you are Inactive")
    }
    if (isUserExist.isDeleted) {
        throw new AppError(statusCode.BAD_REQUEST, "User is Deleted")
    }
    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    }

    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)

    return accessToken
}