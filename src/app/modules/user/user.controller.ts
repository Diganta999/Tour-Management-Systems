/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";

/**
 * 🧩 Controller: Create User
 */
const createUserController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const user = await UserServices.createUserService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "user create successfully", 
    data: user
  })
});

// Controller : Update User

const updateUserController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  const token = req.user;
  const payload = req.body;
  const user = await UserServices.updateUserService(userId, payload, token as JwtPayload)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "user upgrade successfully",
    data: user
  })
})





/**
 * 🧩 Controller: Get All Users
 */
const getAllUsersController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await UserServices.getAllUsersService();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "all user get successfully",
    meta: result.meta,
    data: result.data
  })
});

export const UserController = {
  createUserController,
  getAllUsersController,
  updateUserController
};
