/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import AppError from "../errorHelpers/AppError";
import { envVars } from "../config/env";

export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong";

  // ✅ Handle AppError (custom errors)
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // ✅ Handle Zod validation errors
  else if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation error";

    return res.status(statusCode).json({
      success: false,
      message,
      errors: err.issues, // ✅ এখানে 'issues' ব্যবহার করতে হবে
      stack: envVars.NODE_ENV === "development" ? err.stack : null,
    });
  }

  // ✅ Handle other standard errors
  else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  // ✅ Default error response
  res.status(statusCode).json({
    success: false,
    message,
    errors: err?.issues || null, // এখানে issues চেক করা হয়েছে
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
