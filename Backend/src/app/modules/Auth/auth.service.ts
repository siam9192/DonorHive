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
import Notification from '../Notification/notification.model';

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

    const verificationLink = `${envConfig.url.baseUrlClient}/registration-verify/${token}`;
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
    await Notification.create({
      userId: createdUser[0]._id,
      title: 'Welcome to DonorHive',
      message: 'Your account successfully registered',
    });
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong');
  }
  return null;
};

const googleCallback = async ({ accessToken: googleAccessToken }: { accessToken: string }) => {
  const { data } = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${googleAccessToken}`,
    },
  });
  let tokenPayload = {
    id: '',
    role: '',
    provider: EAuthProvider.Google,
  };

  const user = await User.findOne({
    googleId: data.id,
    provider: EAuthProvider.Google,
  });

  if (user) {
    if (user.status === EUserStatus.Deleted)
      throw new AppError(httpStatus.NOT_FOUND, 'Use not found');
    if (user.status === EUserStatus.Blocked)
      throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Account is Blocked');
    const updateData = {
      fullName: data.name,
      profilePhotoUrl: data.picture,
    };

    await User.updateOne(
      {
        _id: user._id,
      },
      updateData
    );
    tokenPayload.id = user._id.toString();
    tokenPayload.role = user.role;
  } else {
    const isEmailUserExist = await User.exists({
      email: data.email,
    });

    if (isEmailUserExist)
      throw new AppError(httpStatus.NOT_ACCEPTABLE, 'This email already in use');

    const userData = await User.create({
      fullName: data.name,
      profilePhotoUrl: data.picture,
      email: data.email,
      provider: EAuthProvider.Facebook,
    });

    const createdUser = await User.create(userData);
    tokenPayload.id = createdUser._id.toString();
    tokenPayload.role = createdUser.role;
  }

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
  await Notification.create({
    userId: authUser.id,
    title: 'Password changed successfully',
    message: '',
  });
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

const getMeFromDB = async (authUser: IAuthUser) => {
  const selectStr = '_id fullName profilePhotoUrl email role provider address phoneNumber createdAt updatedAt status';
  const user = await User.findOne({
    _id: objectId(authUser.id),
    status: {
      $not: {
        $eq: EUserStatus.Deleted,
      },
    },
  }).select(selectStr);
  if (!user) throw new AppError(httpStatus.BAD_GATEWAY, 'Bad Gateway!');
  return user;
};

const AuthServices = {
  register,
  verifyRegistration,
  googleCallback,
  login,
  changePassword,
  getAccessToken,
  getMeFromDB,
};

export default AuthServices;
