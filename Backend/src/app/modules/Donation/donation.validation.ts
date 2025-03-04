import { z } from 'zod';
import { EPaymentMethod } from '../Payment/payment.interface';

const GuestDonorInfoValidationSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string(),
    state: z.string().optional(),
    country: z.string(),
  }),
});

const InitDonationValidationSchema = z.object({
  campaignId: z.string(),
  amount: z.number().positive(),
  comment: z.string().optional(),
  guestDonorInfo: GuestDonorInfoValidationSchema.optional(),
  isAnonymously: z.boolean(),
  paymentMethod: z.nativeEnum(EPaymentMethod),
});

const DonationValidations = {
  InitDonationValidationSchema,
};

export default DonationValidations;
