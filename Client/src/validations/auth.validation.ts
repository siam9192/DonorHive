import { z } from "zod";

const RegisterValidationSchema = z
  .object({
    fullName: z
      .string()
      .min(3, { message: "Full name must be at least 3 characters long" })
      .max(20, { message: "Full name cannot exceed 20 characters" }),
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .min(5, { message: "Email must be at least 5 characters long" })
      .max(50, { message: "Email cannot exceed 50 characters" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const AuthValidations = {
  RegisterValidationSchema,
};

export default AuthValidations;
