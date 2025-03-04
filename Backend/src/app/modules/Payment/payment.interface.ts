import { ObjectId } from 'mongoose';

export interface IPayment {
  _id: ObjectId;
  transactionId: string;
  userId?: ObjectId;
  donationId: ObjectId;
  amount: number;
  method: TPaymentMethod;
  status: TPaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInitPaymentPayload {
  title: string;
  amount: number;
  method: TPaymentMethod;
  userId?: ObjectId | string | undefined;
  donationId: string | ObjectId;
}

export type TPaymentMethod = `${EPaymentMethod}`;
export type TPaymentStatus = `${EPaymentStatus}`;

export enum EPaymentMethod {
  Paypal = 'Paypal',
  Stripe = 'Stripe',
  SSLCommerz = 'SSLCommerz',
}

export enum EPaymentStatus {
  Pending = 'Pending',
  Success = 'Success',
  Canceled = 'Canceled',
  Failed = 'Failed',
  Refunded = 'Refunded',
}
