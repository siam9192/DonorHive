import { z } from 'zod';
import { EPaymentMethod } from '../Payment/payment.interface';

const GuestDonorInfoValidationSchema = z.object({
  fullName: z.string().min(2).max(30),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  address: z.object({
    street: z.string().min(2).max(30).optional(),
    city: z.string().min(2).max(30),
    state: z.string().optional(),
    country: z.string().min(2).max(30),
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
