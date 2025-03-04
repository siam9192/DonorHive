import { startSession } from 'mongoose';
import envConfig from '../../config/env.config';
import AppError from '../../Errors/AppError';
import jwtHelpers from '../../helpers/jwtHelpers';
import httpStatus from '../../shared/http-status';
import { generateTransactionId } from '../../utils/function';
import { EDonationStatus } from '../Donation/donation.interface';
import Donation from '../Donation/donation.model';
import SSLServices from '../SSL/ssl.service';
import StripeServices from '../Stripe/stripe.service';
import {
  EPaymentMethod,
  EPaymentStatus,
  IInitPaymentPayload,
  TPaymentMethod,
} from './payment.interface';
import Payment from './payment.model';
import { Response } from 'express';
import Campaign from '../Campaign/campaign.model';
import DonationServices from '../Donation/donation.service';

const InitPaymentIntoDB = async (payload: IInitPaymentPayload) => {
  let transactionId;

  // Generate unique transaction id
  while (!transactionId) {
    const tranId = generateTransactionId(10);
    const isPaymentExist = await Payment.exists({
      transactionId: tranId,
    });
    if (!isPaymentExist) transactionId = tranId;
  }
  const data: any = {
    transactionId,
    method: payload.method,
    amount: payload.amount,
    donationId: payload.donationId,
  };

  if (payload.userId) data.userId = payload.userId;

  const payment = await Payment.create(data);

  const tokenPayload = {
    transactionId: payment.transactionId,
    method: payment.method,
  };
  const token = jwtHelpers.generateToken(
    tokenPayload,
    envConfig.payment.token_secret as string,
    '7d'
  );

  let paymentUrl;
  switch (payload.method) {
    case EPaymentMethod.Stripe:
      const stripeRes = await StripeServices.createCheckoutSession({
        title: payload.title,
        amount: payload.amount,
        transactionId,
        token,
      });
      paymentUrl = stripeRes.url;
      break;
    case EPaymentMethod.SSLCommerz:
      const sslRes = await SSLServices.createPaymentSession({
        amount: payload.amount,
        token,
        transactionId,
      });
      paymentUrl = sslRes.GatewayPageURL;
  }

  if (!paymentUrl) throw new AppError(httpStatus.BAD_REQUEST, 'Bad request');

  return {
    paymentId: payment.id,
    paymentUrl,
  };
};

const validatePayment = async (res: Response, status: string, token: string) => {
  try {
    const decode = (await jwtHelpers.verifyToken(
      token,
      envConfig.payment.token_secret as string
    )) as {
      transactionId: string;
      method: TPaymentMethod;
    };

    const statusObj: any = {
      success: EPaymentStatus.Success,
      cancel: EPaymentStatus.Canceled,
      fail: EPaymentStatus.Failed,
    };

    if (!statusObj[status]) throw new Error();
    const session = await startSession();
    session.startTransaction();
    try {
      const payment = await Payment.findOneAndUpdate(
        {
          transactionId: decode.transactionId,
        },
        {
          status: statusObj[status],
        },
        {
          session,
        }
      );

      const donationUpdateStatus = await Donation.updateOne(
        {
          paymentId: payment?._id,
        },
        {
          status:
            statusObj[status] === EPaymentStatus.Success
              ? EDonationStatus.Paid
              : EDonationStatus.Unpaid,
        },
        { session }
      );

      if (!donationUpdateStatus.modifiedCount) throw new Error();

      const donation = await Donation.findOne({
        paymentId: payment!._id,
      });
      const campaignUpdateStatus = await Campaign.updateOne(
        {
          _id: donation?.campaign.id,
        },
        {
          $inc: {
            raisedAmount: donation!.amount,
          },
        },
        { session }
      );

      if (!campaignUpdateStatus.modifiedCount) throw new Error();
      await DonationServices.manageDonationAfterSuccessfulPayment(donation!._id);
      await session.commitTransaction();
      await session.endSession();
      res.redirect(envConfig.payment.success_url as string);
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      res.redirect(envConfig.payment.cancel_url as string);
    }
  } catch (error) {
    throw new AppError(httpStatus.BAD_GATEWAY, 'Bad gateway');
  }
};

const PaymentServices = {
  InitPaymentIntoDB,
  validatePayment,
};

export default PaymentServices;
