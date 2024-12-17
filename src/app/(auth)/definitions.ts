import { z } from "zod";

export const SignupFormSchema = z
  .object({
    userName: z
      .string()
      .min(2, { message: "username must be at least 2 characters long." })
      .trim(),
    fullName: z
      .string()
      .min(2, { message: "fullname must be at least 2 characters long." })
      .trim(),
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    phone: z
      .string()
      .length(10, {
        message: "Phone number must be exactly 10 characters long.",
      })
      .regex(/^\d+$/, { message: "Phone number must contain only numbers." }),
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      })
      .trim(),
    confirmPassword: z.string().trim(),
    role: z.string()
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "The passwords did not match",
    path: ["confirmPassword"],
  });

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password field must not be empty." }),
});

export type FormState =
  | {
      errors?: {
        userName?: string[];
        fullName?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
        phone?: string[];
        role?: string[];
      };
      message?: string;
    }
  | undefined;

export type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
};
