import dotenv from 'dotenv';
import path from 'node:path';
import { EEnvironment, TEnvironment } from '../type';


dotenv.config({ path: path.join((process.cwd(), '.env')) });

const envConfig = {
  environment:process.env.ENVIRONMENT as TEnvironment,
 url:{
    database:process.env.DATABASE_URL,
    baseUrlClientDev:process.env.BASE_URL_CLIENT_DEV,
    baseUrlClientProd:process.env.BASE_URL_CLIENT_PROD,
    baseUrlClient:process.env.ENVIRONMENT === EEnvironment.Development ? process.env.BASE_URL_CLIENT_DEV:process.env.BASE_URL_CLIENT_PROD 
 },
 facebookApp:{
  id:process.env.FACEBOOK_APP_ID,
  secret:process.env.FACEBOOK_APP_SECRET
},

 app:{
  userName:process.env.APP_USER_NAME,
  passKey:process.env.APP_PASS_KEY
},
jwt: {
  accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  accessTokenExpireTime: process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME,
  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  refreshTokenExpireTime: process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME,
  resetPasswordTokenSecret: process.env.JWT_RESET_PASSWORD_SECRET,
  resetPasswordTokenExpireTime:
    process.env.JWT_RESET_PASSWORD_TOKEN_EXPIRE_TIME,
  accountVerificationTokenSecret: process.env.JWT_ACCOUNT_VERIFICATION_TOKEN_SECRET,
  paymentSecret: process.env.JWT_PAYMENT_SECRET,
},
}

export default envConfig;