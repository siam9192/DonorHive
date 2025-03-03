import { z } from 'zod';
import UserValidations from '../User/user.validation';

const UpdateProfileValidationSchema = z.object({
  fullName: z.string().min(3).max(20).optional(),
  profilePhotoUrl: z.string().url().optional(),
  address: UserValidations.UserAddressValidationSchema.optional(),
  phoneNumber: z.string().min(5).max(20).optional(),
});

const ProfileValidations = {
  UpdateProfileValidationSchema,
};

export default ProfileValidations;
