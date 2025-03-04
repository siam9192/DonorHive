import paypal from 'paypal-rest-sdk';
import { Request, Response } from 'express';
import envConfig from '../../config/env.config';

paypal.configure({
  mode: 'sandbox',
  client_id: envConfig.paypal.id as string,
  client_secret: envConfig.paypal.secret as string,
});

const createPaymentSession = async (res: Response, amount: number, paymentId: string) => {
  const paymentJson: any = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      //   return_url: `${en}/orders/payment/paypal/success?orderPaymentId=${paymentId}`,
      //   cancel_url: `${config.backend_base_api}/orders/payment/cancel?paymentId=${paymentId}`,
    },
    transactions: [
      {
        amount: {
          total: amount,
          currency: 'USD',
        },
      },
    ],
  };

  paypal.payment.create(paymentJson, (error, payment) => {
    if (error) {
      throw new Error();
    } else {
      if (payment?.links) {
        payment.links.forEach((link) => {
          if (link.rel === 'approval_url') {
            res.send(link.href);
          }
        });
      }
    }
  });
};
