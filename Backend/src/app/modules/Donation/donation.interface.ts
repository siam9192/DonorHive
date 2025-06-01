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

export interface IDonorPersonalInfo {
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
  donorPersonalInfo?:IDonorPersonalInfo
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
  donorPersonalInfo?:IDonorPersonalInfo
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
  Success =  'Success',
  Failed = 'failed',
  Refunded = 'Refunded',
}
