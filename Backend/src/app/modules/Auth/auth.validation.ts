import { z } from 'zod';

const RegisterValidationSchema = z.object({
  fullName: z.string().min(3).max(20),
  email: z.string().email().min(5).max(50),
  password: z.string().min(6),
});
const LoginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const ChangePasswordValidationSchema = z.object({
  newPassword: z.string(),
  oldPassword: z.string(),
});

const AuthValidations = {
  RegisterValidationSchema,
  LoginValidationSchema,
  ChangePasswordValidationSchema,
};

export default AuthValidations;
