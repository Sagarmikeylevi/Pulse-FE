import { z } from "zod";

// ---------- Form schemas ----------

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export type EmailFormValues = z.infer<typeof emailSchema>;

export const passwordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type PasswordFormValues = z.infer<typeof passwordSchema>;

export const otpSchema = z.object({
  code: z
    .string()
    .length(6, "Code must be 6 digits")
    .regex(/^\d{6}$/, "Code must contain only digits"),
});

export type OtpFormValues = z.infer<typeof otpSchema>;

export type AuthView = "email" | "password" | "verify";

// ---------- API types ----------

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface ApiErrorResponse {
  error: string;
}
