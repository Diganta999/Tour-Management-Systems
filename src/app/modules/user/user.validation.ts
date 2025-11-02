import { z } from "zod";

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
