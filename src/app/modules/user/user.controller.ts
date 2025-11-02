/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

/**
 * 🧩 Controller: Create User
 */
const createUserController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Always await async service functions
  const user = await UserServices.createUserService(req.body);

 sendResponse(res,{
  statusCode:httpStatus.CREATED,
  success:true,
  message:"user create successfully",
  data:user
 })
});

/**
 * 🧩 Controller: Get All Users
 */
const getAllUsersController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await UserServices.getAllUsersService();

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"all user get successfully",
    meta:result.meta,
    data:result.data
  })
});

export const userController = {
  createUserController,
  getAllUsersController,
};
