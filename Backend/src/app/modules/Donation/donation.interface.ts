import { ObjectId } from 'mongoose';
import { IUserAddress } from '../User/user.interface';
import { TPaymentMethod } from '../Payment/payment.interface';

export interface IGuestDonorPersonalInfo {
  fullName: string;
  email: string;
  phoneNumber?: string;
  address: {
    street?: string;
    city: string;
    state?: string;
    country: string;
  };
}

export interface IDonation {
  _id: ObjectId;
  userId?: ObjectId;
  campaign: {
    id: ObjectId;
    title: string;
    coverPhotoUrl: string;
    category: string;
  };
  amount: number;
  comment?: string;
  guestDonorInfo?: IGuestDonorPersonalInfo;
  isAnonymously: boolean;
  status: TDonationStatus;
  paymentId?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInitDonationPayload {
  campaignId: string;
  amount: number;
  isAnonymously: boolean;
  guestDonorInfo: IGuestDonorPersonalInfo;
  comment?: string;
  paymentMethod: TPaymentMethod;
}

export interface IFilterDonation {
  searchTerm?: string;
  status?: TDonationStatus;
  donorType?: 'guest' | 'anonymous' | 'registered';
}

type TDonationStatus = `${EDonationStatus}`;

export enum EDonationStatus {
  Pending = 'Pending',
  Paid = 'Paid',
  Unpaid = 'Unpaid',
  Refunded = 'Refunded',
}
