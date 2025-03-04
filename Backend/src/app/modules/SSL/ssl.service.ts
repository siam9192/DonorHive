import axios from 'axios';
import { ICreateSSLPaymentSessionPayload } from './ssl.interface';
import AppError from '../../Errors/AppError';
import httpStatus from '../../shared/http-status';
import envConfig from '../../config/env.config';

const createPaymentSession = async (payload: ICreateSSLPaymentSessionPayload) => {
  const data = {
    store_id: envConfig.ssl.store_id,
    store_passwd: envConfig.ssl.store_password,
    total_amount: payload.amount,
    currency: 'USD',
    tran_id: payload.transactionId, // use unique tran_id for each api call
    success_url: envConfig.url.baseUrlServer + `/payments/validate/success/${payload.token}`,
    fail_url: envConfig.url.baseUrlServer + `/payments/validate/fail/${payload.token}`,
    cancel_url: envConfig.url.baseUrlServer + `/payments/validate/cancel/${payload.token}`,
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: 'N/A',
    product_name: 'N/A',
    product_category: 'N/A',
    product_profile: 'N/A',
    cus_name: 'N/A',
    cus_email: 'N/A',
    cus_add1: 'N/A',
    cus_add2: 'N/A',
    cus_city: 'N/A',
    cus_state: 'N/A',
    cus_postcode: 'N/A',
    cus_country: 'Bangladesh',
    cus_phone: 'N/A',
    cus_fax: 'N/A',
    ship_name: 'N/A',
    ship_add1: 'N/A',
    ship_add2: 'N/A',
    ship_city: 'N/A',
    ship_state: 'N/A',
    ship_postcode: 'N/A',
    ship_country: 'N/A',
  };

  const response = await axios({
    method: 'post',
    url: envConfig.ssl.payment_url,
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  return response.data;
};

const validatePayment = async (payload: any) => {
  try {
    const response = await axios({
      method: 'get',
      url: envConfig.ssl.validation_url,
    });
    return response.data;
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Payment validation failed!');
  }
};

const SSLServices = {
  createPaymentSession,
  validatePayment,
};

export default SSLServices;
