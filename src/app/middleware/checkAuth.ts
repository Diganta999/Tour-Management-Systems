import { NextFunction, Request, Response } from "express"
import AppError from "../errorHelpers/AppError";
import statusCode from "http-status-codes"
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";

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

        if(!AuthRole.includes(tokenVerify.role)){
            throw new AppError(statusCode.BAD_REQUEST,"you have not permit to this route !!!!!!!!!!!")
        }

        next()
    } catch (error) {
        next(error)
    }
} 