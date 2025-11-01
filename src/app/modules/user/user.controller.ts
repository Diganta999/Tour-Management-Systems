/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";

/**
 * 🧩 Controller: Create User
 */
const createUserController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Always await async service functions
  const user = await UserServices.createUserService(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
});

/**
 * 🧩 Controller: Get All Users
 */
const getAllUsersController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const allUsers = await UserServices.getAllUsersService();

  res.status(httpStatus.OK).json({
    success: true,
    message: "All users fetched successfully",
    data: allUsers,
  });
});

export const userController = {
  createUserController,
  getAllUsersController,
};
