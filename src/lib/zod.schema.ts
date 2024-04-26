import { z } from "zod"

// Common validation rules for username
const usernameSchema = z
    .string()
    .min(4, "Username must contain at least 6 characters")
    .max(32, "Username cannot exceed 32 characters")
    .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
    )

// Common validation rules for email
const emailSchema = z
    .string()
    .max(255)
    .email("Please enter a valid email address")
    .refine((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), {
        message: "Invalid email format",
    })

// Common validation rules for password
const passwordSchema = z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .max(64, "Password cannot exceed 64 characters")
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W])$/,
        "Password must contain at least one uppercase letter, one digit, and one special character"
    )

// Schema for signing up
export const signupSchema = z.object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
})

// Schema for signing in
export const signinSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
})

// Schema for resetting password data validation
export const resetPasswordSchema = z
    .object({
        password: z.string().min(8).max(64),
        newPassword: passwordSchema,
        confirmPassword: z.string().min(8).max(64),
        logoutFromOtherDevices: z.boolean(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match. Please re-enter your password",
        path: ["confirmPassword"],
    })
    .refine((data) => data.newPassword !== data.password, {
        message: "New password must differ from the current password",
        path: ["newPassword"],
    })
