import envConfig from '../../config/env.config';
import { IInitStripePaymentPayload } from './stripe.interface';

const stripe = require('stripe')(envConfig.stripe.secret);

async function createCheckoutSession(payload: IInitStripePaymentPayload) {
  const response = stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: payload.title,
          },
          unit_amount: Math.round(payload.amount * 100),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    // The URL of your payment completion page
    success_url: envConfig.url.baseUrlServer + `/payments/validate/success/${payload.token}`,
    cancel_url: envConfig.url.baseUrlServer + `/payments/validate/cancel/${payload.token}`,
    metadata: {
      transactionId: payload.transactionId,
    },
  });

  return response;
}

const StripeServices = {
  createCheckoutSession,
};

export default StripeServices;
