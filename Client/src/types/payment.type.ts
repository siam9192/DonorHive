export interface IPayment {
  _id: string;
  transactionId: string;
  userId?: string;
  donationId: string;
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
  userId?: string;
  donationId: string;
}

export type TPaymentMethod = `${EPaymentMethod}`;
export type TPaymentStatus = `${EPaymentStatus}`;

export enum EPaymentMethod {
  Paypal = "Paypal",
  Stripe = "Stripe",
  SSLCommerz = "SSLCommerz",
}

export enum EPaymentStatus {
  Pending = "Pending",
  Success = "Success",
  Canceled = "Canceled",
  Failed = "Failed",
  Refunded = "Refunded",
}
