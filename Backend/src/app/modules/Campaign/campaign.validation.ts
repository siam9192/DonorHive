import { z } from 'zod';

const CreateCampaignValidationSchema = z.object({
  title: z.string().min(5).max(150),
  coverImageUrl: z.string().url(),
  description: z.string().min(150).max(10000),
  category: z.string().min(3).max(32),
  startAt: z.preprocess((arg) => (typeof arg === 'string' ? new Date(arg) : arg), z.date()),
  endAt: z.preprocess((arg) => (typeof arg === 'string' ? new Date(arg) : arg), z.date()),
  targetAmount: z.number().positive(),
});

const UpdateCampaignValidationSchema = z.object({
  title: z.string().min(5).max(150).optional(),
  coverImageUrl: z.string().url().optional(),
  description: z.string().min(150).max(10000).optional(),
  category: z.string().min(3).max(32).optional(),
  startAt: z.preprocess((arg) => (typeof arg === 'string' ? new Date(arg) : arg), z.date()),
  endAt: z.preprocess((arg) => (typeof arg === 'string' ? new Date(arg) : arg), z.date()),
  targetAmount: z.number().positive(),
});

const CampaignValidations = {
  CreateCampaignValidationSchema,
  UpdateCampaignValidationSchema,
};

export default CampaignValidations;
