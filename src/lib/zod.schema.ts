import { z } from "zod";

// Common validation rules for username
const usernameSchema = z
  .string()
  .min(1, "Username is required")
  .min(3, "Username must contain at least 3 characters")
  .max(32, "Username must not exceed 32 characters")
  .regex(/^\S+$/, "Username cannot contain spaces");

// Common validation rules for email
const emailSchema = z.string().email("Please enter a valid email address");

// Common validation rules for password
const passwordSchema = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must contain at least 8 characters")
  .max(64, "Password must not exceed 64 characters")
  .regex(/[^\s]/, "Password cannot contain only spaces");

// Schema for signing up
export const signupSchema = z.object({
  username: usernameSchema,
  password: passwordSchema
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

// Schema for signing in
export const SignInSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

// Schema for resetting password data validation
export const ResetPasswordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    newPassword: z.string().min(8),
    logoutFromOtherDevices: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.newPassword !== data.password, {
    message: "New password must differ from the current password",
    path: ["newPassword"],
  });
