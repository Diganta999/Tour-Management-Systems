/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
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
  const errorSource: any[] = [];

  // 🧩 1. Handle Zod validation error
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation error (Zod)";

    (err.issues as ZodIssue[]).forEach((issue) => {
      errorSource.push({
        path: issue.path.join("."),
        message: issue.message,
      });
    });
  }

  // 🧩 2. Handle Mongoose duplicate key error
  else if (err.code === 11000) {
    const duplicate = err.message.match(/"([^"]*)"/);
    statusCode = 400;
    message = `Duplicate field value: ${duplicate ? duplicate[1] : "Unknown"}`;
  }

  // 🧩 3. Handle invalid MongoDB ObjectId
  else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid MongoDB ObjectID. Please provide a valid ID.";
  }

  // 🧩 4. Handle Mongoose validation error (required/type mismatch)
  else if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation error (Mongoose)";
    const simplifiedErrors = Object.values(err.errors);
    simplifiedErrors.forEach((e: any) => {
      errorSource.push({
        path: e.path,
        message: e.message,
      });
    });
  }

  // 🧩 5. Handle custom AppError (manually thrown)
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // 🧩 6. Handle any other general Error
  else if (err instanceof Error) {
    statusCode = 500;
    message = err.message || message;
  }

  // 🧩 7. Final response
  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    error: err,
    stack: envVars.NODE_ENV === "DEVELOPMENT" ? err.stack : undefined,
  });
};
