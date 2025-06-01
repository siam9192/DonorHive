import { IPayment, TPaymentMethod } from "./payment.type";
import { IUser } from "./user.type";


export interface IDonation {
  _id: string;
  userId?: string;
  user?: Pick<IUser, "_id" | "fullName" | "profilePhotoUrl" | "address">;
  campaign: {
    id: string;
    title: string;
    coverImageUrl: string;
    category: string;
  };
  amount: number;
  comment: string;
  donorPersonalInfo:IDonorPersonalInfo
  isAnonymously: boolean;
  status: TDonationStatus;
  paymentId?: string;
  payment: IPayment;
  createdAt: Date;
  updatedAt: Date;
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



export type TMyDonation = Pick<
  IDonation,
  | "_id"
  | "amount"
  | "campaign"
  | "comment"
  | "donorPersonalInfo"
  | "isAnonymously"
  | "status"
  | "createdAt"
>;

export interface IInitDonationPayload {
  campaignId: string;
  amount: number;
  isAnonymously: boolean;
  guestDonorInfo:IDonorPersonalInfo
  comment: string;
  paymentMethod: TPaymentMethod;
}

export interface IFilterDonation {
  searchTerm?: string;
  status?: TDonationStatus;
  donorType?: "guest" | "anonymous" | "registered";
}

type TDonationStatus = `${EDonationStatus}`;



export enum EDonationStatus {
  Pending = 'Pending',
  Success = 'Success',
  Failed = 'failed',
  Refunded = 'Refunded',
}

export enum EDonorType {
  Guest = "guest",
  Anonymous = "anonymous",
  Registered = "registered",
}
