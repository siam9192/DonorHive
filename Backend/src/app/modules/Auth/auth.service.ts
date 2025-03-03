import path from 'path';
import envConfig from '../../config/env.config';
import AppError from '../../Errors/AppError';
import httpStatus from '../../shared/http-status';
import { bcryptCompare, bcryptHash } from '../../utils/bycrypt';
import jwtHelpers from '../../helpers/jwtHelpers';
import NodeMailerServices from '../NodeMailer/node-mailer.service';
import { EAuthProvider, EUserRole, EUserStatus } from '../User/user.interface';
import User from '../User/user.model';
import {
  IAuthUser,
  IChangePasswordPayload,
  ILoginPayload,
  IRegistrationPayload,
} from './auth.interface';
import ejs from 'ejs';
import RegistrationRequest from '../RegistrationRequest/registrationRequest.model';
import mongoose, { startSession } from 'mongoose';
import { objectId } from '../../utils/function';
import { ERegistrationRequestStatus } from '../RegistrationRequest/registrationRequest.interface';
import { JwtPayload } from 'jsonwebtoken';
import axios from 'axios';
import { IFbDataResponse } from '../../types';

const register = async (payload: IRegistrationPayload) => {
  const user = await User.findOne({
    email: payload.email,
  });
  if (user) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'User is already exist');
  }
  const password = await bcryptHash(payload.password);
  const expireAt = new Date();
  expireAt.setMinutes(new Date().getMinutes() + 10);

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const createdRequest = await RegistrationRequest.create(
      [
        {
          fullName: payload.fullName,
          email: payload.email,
          role: EUserRole.Donor,
          password,
          expireAt,
        },
      ],
      { session }
    );
    const tokenPayload = {
      requestId: createdRequest[0]._id,
      email: payload.email,
    };
    const token = jwtHelpers.generateToken(
      tokenPayload,
      envConfig.jwt.accountVerificationTokenSecret as string,
      '10m'
    );

    const verificationLink = `${envConfig.url.baseUrlClient}/registration/verify/${token}`;
    console.log(token);
    const emailSendStatus = await ejs.renderFile(
      path.join(process.cwd(), '/src/app/email-templates/registration-verification.html'),
      { name: payload.fullName, link: verificationLink },
      async function (err, template) {
        if (err) {
          throw new AppError(400, 'Something went wrong');
        } else {
          const status = await NodeMailerServices.sendEmail({
            emailAddress: payload.email,
            subject: 'Verify your DonorHive account',
            template,
          });
        }
      }
    );

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong');
  }
  return null;
};

const verifyRegistration = async (token: string) => {
  let decode;
  try {
    decode = (await jwtHelpers.verifyToken(
      token,
      envConfig.jwt.accountVerificationTokenSecret as string
    )) as {
      requestId: string;
      email: string;
    };
  } catch (error) {}
  if (!decode)
    throw new AppError(httpStatus.BAD_REQUEST, 'Maybe this link is expired or already used');

  const request = await RegistrationRequest.findOne({
    _id: objectId(decode.requestId),
    expireAt: {
      $gt: new Date(),
    },
  });

  if (!request)
    throw new AppError(httpStatus.BAD_REQUEST, 'Maybe this link is expired or already used');

  const session = await startSession();

  session.startTransaction();

  try {
    const createdUser = await User.create(
      [
        {
          fullName: request.fullName,
          email: request.email,
          password: request.password,
          provider: EAuthProvider.EmailPassword,
        },
      ],
      { session }
    );
    const updatedRequest = await RegistrationRequest.updateOne(
      {
        _id: objectId(decode.requestId),
      },
      {
        status: ERegistrationRequestStatus.VERIFIED,
      },
      { session }
    );

    if (!updatedRequest.modifiedCount || !createdUser?.length) throw new Error();
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong');
  }
  return null;
};

const facebookCallback = async (accessToken: string) => {
  const fbResponse = await axios.get(
    `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
  );

  const userData = fbResponse.data as IFbDataResponse;
  const user = await User.findOne({
    facebookId: userData.id,
  });

  const data = {
    fullName: userData.name,
    profilePhotoUrl: userData.picture.data.url,
    email: userData.email,
    provider: EAuthProvider.Facebook,
  };

  if (!user) {
  } else {
    let updatableData = {};
    //    Object.entries(data).map(([key,value])=>{
    // //     if(user.doc !== )
    // //    })
  }
};

const changePassword = async (authUser: IAuthUser, payload: IChangePasswordPayload) => {
  const user = await User.findById(authUser.id, {
    password: true,
  });
  if (!user) throw new AppError(httpStatus.BAD_REQUEST, 'Bad request');

  const matchPassword = await bcryptCompare(payload.oldPassword, user.password);
  if (!matchPassword) throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Wrong password');
  const newHashedPassword = await bcryptHash(user.password);

  const updateStatus = await User.updateOne(
    {
      _id: objectId(authUser.id),
    },
    {
      password: newHashedPassword,
    }
  );

  if (!updateStatus.modifiedCount) throw new AppError(httpStatus.BAD_REQUEST, 'Bad request');
  return null;
};

const login = async (payload: ILoginPayload) => {
  const user = await User.findOne({
    email: payload.email,
  });

  // Checking user existence
  if (!user) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Wrong email or password');
  }

  const password = user.password;

  // Throw error base on account status
  switch (user.status) {
    case EUserStatus.Blocked:
      throw new AppError(
        httpStatus.NOT_ACCEPTABLE,
        'This account is blocked.Please contact with our support team'
      );
    case EUserStatus.Deleted:
      throw new AppError(httpStatus.NOT_ACCEPTABLE, '');
    default:
      break;
  }

  // Comparing password
  const isMatched = await bcryptCompare(payload.password, password!);

  // Checking is password correct
  if (!isMatched) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Wrong email or password');
  }

  const tokenPayload: IAuthUser = {
    id: user.id,
    role: user.role,
    email: user.email,
    provider: user.provider,
  };

  // Generating access token
  const accessToken = jwtHelpers.generateToken(
    tokenPayload,
    envConfig.jwt.accessTokenSecret as string,
    '7d'
  );
  // Generating refresh token
  const refreshToken = jwtHelpers.generateToken(
    tokenPayload,
    envConfig.jwt.refreshTokenSecret as string,
    envConfig.jwt.refreshTokenExpireTime as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const getAccessToken = async (refreshToken: string) => {
  try {
    if (!refreshToken) {
      throw new Error();
    }

    const decode = jwtHelpers.verifyToken(
      refreshToken,
      envConfig.jwt.refreshTokenSecret as string
    ) as JwtPayload & IAuthUser;

    if (!decode) throw new Error();
    return {
      refreshToken,
    };
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, 'BAD😒 request!');
  }
};

const AuthServices = {
  register,
  verifyRegistration,
  login,
  changePassword,
  getAccessToken,
};

export default AuthServices;
