import dotenv from 'dotenv';
import path from 'node:path';
import { EEnvironment, TEnvironment } from '../types';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

const envConfig = {
  environment: process.env.ENVIRONMENT as TEnvironment,
  url: {
    database: process.env.DATABASE_URL,
    baseUrlClientDev: process.env.BASE_URL_CLIENT_DEV,
    baseUrlClientProd: process.env.BASE_URL_CLIENT_PROD,
    baseUrlClient:
      process.env.ENVIRONMENT === EEnvironment.Development
        ? process.env.BASE_URL_CLIENT_DEV
        : process.env.BASE_URL_CLIENT_PROD,
    baseUrlServerDev: process.env.BASE_URL_CLIENT_DEV,
    baseUrlServerProd: process.env.BASE_URL_CLIENT_PROD,
    baseUrlServer:
      process.env.ENVIRONMENT === EEnvironment.Development
        ? process.env.BASE_URL_SERVER_DEV
        : process.env.BASE_URL_SERVER_PROD,
  },
  facebookApp: {
    id: process.env.FACEBOOK_APP_ID,
    secret: process.env.FACEBOOK_APP_SECRET,
  },

  app: {
    userName: process.env.APP_USER_NAME,
    passKey: process.env.APP_PASS_KEY,
  },
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    accessTokenExpireTime: process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    refreshTokenExpireTime: process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME,
    resetPasswordTokenSecret: process.env.JWT_RESET_PASSWORD_SECRET,
    resetPasswordTokenExpireTime: process.env.JWT_RESET_PASSWORD_TOKEN_EXPIRE_TIME,
    accountVerificationTokenSecret: process.env.JWT_ACCOUNT_VERIFICATION_TOKEN_SECRET,
    paymentSecret: process.env.JWT_PAYMENT_SECRET,
  },
  ssl: {
    store_id: process.env.SSL_STORE_ID,
    store_password: process.env.SSL_STORE_PASSWORD,
    payment_url: process.env.SSL_PAYMENT_URL,
    validation_url: process.env.SSL_VALIDATION_API,
    success_url: process.env.SSL_SUCCESS_URL,
    fail_url: process.env.SSL_FAIL_URL,
    cancel_url: process.env.SSL_CANCEL_URL,
  },
  stripe: {
    secret: process.env.STRIPE_SECRET,
  },
  paypal: {
    id: process.env.PAYPAL_ID,
    secret: process.env.PAYPAL_SECRET,
  },
  payment: {
    success_url: process.env.PAYMENT_SUCCESS_URL,
    cancel_url: process.env.PAYMENT_CANCEL_URL,
    success_redirect_url: process.env.PAYMENT_SUCCESS_REDIRECT_URL,
    token_secret: process.env.PAYMENT_TOKEN_SECRET,
  },
};

export default envConfig;
