import { model, Schema } from 'mongoose';
import { EDonationStatus, IDonation, IGuestDonorPersonalInfo } from './donation.interface';

const AddressSchema = new Schema({
  street: {
    type: String,
    min: 2,
    max: 30,
    required: true,
  },
  city: {
    type: String,
    min: 2,
    max: 30,
    required: true,
  },
  state: {
    type: String,
    min: 2,
    max: 30,
    default: null,
  },
  country: {
    type: String,
    min: 2,
    max: 30,
    required: true,
  },
});

const DonorPersonalInformationSchema = new Schema<IGuestDonorPersonalInfo>({
  fullName: {
    type: String,
    minlength: 2,
    maxlength: 20,
    required: true,
  },
  email: {
    type: String,
    minlength: 2,
    maxlength: 100,
    required: true,
  },
  phoneNumber: {
    type: String,
    minlength: 2,
    maxlength: 100,
    default: null,
  },
  address: AddressSchema,
});

const DonationModelSchema = new Schema<IDonation>(
  {
    userId: {
      type: Schema.ObjectId,
      ref: 'User',
      default: null,
    },
    campaign: new Schema({
      id: {
        type: Schema.ObjectId,
        ref: 'Campaign',
        default: true,
      },
      title: {
        type: String,
        required: true,
      },
      coverImageUrl: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
    }),
    amount: {
      type: Number,
      min: 100,
      required: true,
    },
    comment: {
      type: String,
      minlength: 1,
      maxlength: 500,
    },
    isAnonymously: {
      type: Boolean,
      required: true,
    },
    donorPersonalInfo: {
      type: DonorPersonalInformationSchema,
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(EDonationStatus),
      default: EDonationStatus.Pending,
    },
    paymentId: {
      type: Schema.ObjectId,
      ref: 'Payment',
      defaultL: null,
    },
  },
  {
    timestamps: true,
  }
);

DonationModelSchema.index({
  'campaign.title': 'text',
});

const Donation = model<IDonation>('Donation', DonationModelSchema);

export default Donation;
