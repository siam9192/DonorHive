export interface IInitStripePaymentPayload {
  title: string;
  amount: number;
  transactionId: string;
  token: string;
}
