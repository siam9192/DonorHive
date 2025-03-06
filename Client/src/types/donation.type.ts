import { TPaymentMethod } from "./payment.type";
import { IUser } from "./user.type";

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
  _id: string;
  userId?: string;
  user?: Pick<IUser, "_id" | "fullName" | "profilePhotoUrl" | "address">;
  campaign: {
    id: string;
    title: string;
    coverPhotoUrl: string;
    category: string;
  };
  amount: number;
  comment?: string;
  guestDonorInfo?: IGuestDonorPersonalInfo;
  isAnonymously: boolean;
  status: TDonationStatus;
  paymentId?: string;
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
  donorType?: "guest" | "anonymous" | "registered";
}

type TDonationStatus = `${EDonationStatus}`;

export enum EDonationStatus {
  Pending = "Pending",
  Paid = "Paid",
  Unpaid = "Unpaid",
  Refunded = "Refunded",
}
