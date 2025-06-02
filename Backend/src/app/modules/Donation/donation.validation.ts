import { z } from 'zod';
import { EPaymentMethod } from '../Payment/payment.interface';

const DonorPersonalInfoValidationSchema = z.object({
  fullName: z.string().min(2).max(30),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  address: z.object({
    street: z.string().min(2).max(30),
    city: z.string().min(2).max(30),
    state: z.string().optional(),
    country: z.string().min(2).max(30),
  }),
});

const InitDonationValidationSchema = z
  .object({
    campaignId: z.string(),
    amount: z.number().positive(),
    comment: z.string().optional(),
    donorPersonalInfo: DonorPersonalInfoValidationSchema.optional(),
    isAnonymously: z.boolean(),
    paymentMethod: z.nativeEnum(EPaymentMethod),
  })
  .superRefine((val, ctx) => {
    if (val.isAnonymously && val.donorPersonalInfo) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Donor personal info must not be provided for anonymous donations',
        path: ['donorPersonalInfo'],
      });
    }

    if (!val.isAnonymously && !val.donorPersonalInfo) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Donor personal info is required for non-anonymous donations',
        path: ['donorPersonalInfo'],
      });
    }
  });

const DonationValidations = {
  InitDonationValidationSchema,
};

export default DonationValidations;
