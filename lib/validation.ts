import { z } from "zod";

// Password validation schema for sign up (strict)
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one digit")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol");

// Password validation schema for sign in (only non-empty)
const signInPasswordSchema = z.string().min(1, "Password is required");

// Sign in validation schema
export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: signInPasswordSchema,
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

// Sign up validation schema
export const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: passwordSchema,
  role: z.string().refine((val) => val === "jobseeker", {
    message: "Please select job seeker role",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export type SignInFormData = {
  email: string;
  password: string;
  terms: boolean;
};

export type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  terms: boolean;
};
