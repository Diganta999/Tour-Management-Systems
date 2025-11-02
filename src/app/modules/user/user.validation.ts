import { z } from "zod";
import { IsActive, Role } from "./user.interface";

const bdPhoneRegex = /^(?:\+88|88)?01[3-9]\d{8}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export const createUserZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be at most 50 characters" }),

  email: z
    .string()
    .min(5, { message: "Email must be at least 5 characters long" })
    .email({ message: "Email must be a valid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(50, { message: "Password must be under 50 characters" })
    .regex(passwordRegex, {
      message:
        "Password must contain at least one uppercase letter, one number, and one special character",
    }),

  phone: z
    .string()
    .min(11, { message: "Phone number must be at least 11 digits" })
    .regex(bdPhoneRegex, {
      message: "Must be a valid Bangladeshi phone number",
    })
    .optional(),

  address: z.string().optional(),
});



export const UpdateUserZodSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  
  password: z
    .string()
    .min(8)
    .max(50)
    .regex(passwordRegex, {
      message: "Must contain at least 1 uppercase, 1 number, and 1 special character",
    })
    .optional(),

  phone: z.string().regex(bdPhoneRegex, {
    message: "Must be a valid Bangladeshi phone number",
  }).optional(),

  picture: z.string().optional(),
  address: z.string().optional(),
  isDeleted: z.boolean().optional(),
  isActive: z.enum(Object.values(IsActive) as [string]).optional(),
  isVerified: z.boolean().optional(),
  role: z.enum(Object.values(Role) as [string]).optional(),

  auths: z
    .array(
      z.object({
        provider: z.string(),
        providerId: z.string(),
      })
    )
    .optional(),

  bookings: z.array(z.string()).optional(),
  guides: z.array(z.string()).optional(),
});