import { z } from 'zod';
import { EAuthProvider, EUserRole, EUserStatus } from './user.interface';

const UserAddressValidationSchema = z.object({
  street: z.string().min(2).max(16),
  city: z.string().min(2).max(25),
  state: z.string().min(2).max(25).optional(),
  country: z.string().min(2).max(32),
});

const UserValidationSchema = z.object({
  fullName: z.string().min(3).max(20),
  profilePhotoUrl: z.string().url().optional(),
  address: UserAddressValidationSchema.nullable(),
  phoneNumber: z.string().min(5).max(20).optional(),
  role: z.nativeEnum(EUserRole),
  email: z.string().email().min(5).max(50),
  googleId: z.string().min(5).nullable().optional(),
  facebookId: z.string().min(5).nullable().optional(),
  provider: z.nativeEnum(EAuthProvider),
  password: z.string().min(6),
  status: z.nativeEnum(EUserStatus),
  passwordChangedAt: z.date().nullable().optional(),
});

const ChangeUserStatusValidationSchema = z.object({
  status: z.enum([EUserStatus.Active, EUserStatus.Blocked]),
});

const UserValidations = {
  UserValidationSchema,
  ChangeUserStatusValidationSchema,
  UserAddressValidationSchema,
};

export default UserValidations;
