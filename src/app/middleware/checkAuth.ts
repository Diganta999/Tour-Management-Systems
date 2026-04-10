import { NextFunction, Request, Response } from "express"
import AppError from "../errorHelpers/AppError";
import statusCode from "http-status-codes"
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { User } from "../modules/user/user.model";
import { IsActive } from "../modules/user/user.interface";

export const checkAuth = (...AuthRole: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new AppError(statusCode.BAD_REQUEST, "you have not access Token")
        }
        const tokenVerify = jwt.verify(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload
        if (!tokenVerify) {
            throw new AppError(statusCode.BAD_REQUEST, "Token verify failed")
        }
        const isUserExist = await User.findOne({ email: tokenVerify.email })

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
        if (!AuthRole.includes(tokenVerify.role)) {
            throw new AppError(statusCode.BAD_REQUEST, "you have not permit to this route !!!!!!!!!!!")
        }
        req.user = tokenVerify;
        next()
    } catch (error) {
        next(error)
    }
} 