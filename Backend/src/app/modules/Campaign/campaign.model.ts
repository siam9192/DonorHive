import { model, Schema } from 'mongoose';
import { ECampaignStatus, ICampaign } from './campaign.interface';

const CampaignModelSchema = new Schema<ICampaign>(
  {
    title: {
      type: String,
      minlength: 5,
      maxlength: 150,
      required: true,
    },
    coverImageUrl: {
      type: String,
      required: true,
    },
    description: { type: String, minlength: 150, maxlength: 10000, required: true },
    category: { type: String, minlength: 3, maxlength: 32, required: true },
    slug: { type: String, minlength: 3, maxlength: 1000, unique: true, required: true },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    targetAmount: { type: Number, required: true },
    raisedAmount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: Object.values(ECampaignStatus),
      default: ECampaignStatus.Active,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
CampaignModelSchema.index({
  title: 'text',
  description: 'text',
});
const Campaign = model<ICampaign>('Campaign', CampaignModelSchema);

export default Campaign;
