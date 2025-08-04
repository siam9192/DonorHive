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
    paymentId: payment._id,
    donationId: payload.donationId,
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
  let campaign;
  let redirectUrl;
  try {
    const decode = (await jwtHelpers.verifyToken(
      token,
      envConfig.payment.token_secret as string
    )) as {
      transactionId: string;
      paymentId: string;
      donationId: string;
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
              ? EDonationStatus.Success
              : EDonationStatus.Failed,
        },
        { session }
      );

      if (!donationUpdateStatus.modifiedCount) throw new Error();
      const donation = await Donation.findOne({
        paymentId: payment!._id,
      });
      if (status === 'success') {
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
        campaign = await Campaign.findById(donation?.campaign.id).select('slug');
        redirectUrl = `${envConfig.payment.success_url as string}?campaign=${campaign?.slug}`;
      } else if (status === 'fail') {
        campaign = await Campaign.findById(donation?.campaign.id).select('slug');
        await Payment.updateOne(
          {
            _id: payment?._id,
          },
          {
            status: EPaymentStatus.Failed,
          },
          {
            session,
          }
        );
        redirectUrl = `${envConfig.payment.cancel_url as string}?campaign=${campaign?.slug}`;
      } else {
        campaign = await Campaign.findById(donation?.campaign.id).select('slug');
        await Payment.updateOne(
          {
            _id: payment?._id,
          },
          {
            status: EPaymentStatus.Canceled,
          },
          {
            session,
          }
        );
        redirectUrl = `${envConfig.url.baseUrlClient as string}/campaigns/${campaign?.slug}`;
      }

      await session.commitTransaction();
      await session.endSession();
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      redirectUrl = `${envConfig.url.baseUrlClient as string}`;
    }

    res.redirect(`${redirectUrl}`);
  } catch (error) {
    console.log(error);
    throw new AppError(httpStatus.BAD_GATEWAY, 'Bad gateway');
  }
};

const PaymentServices = {
  InitPaymentIntoDB,
  validatePayment,
};

export default PaymentServices;
