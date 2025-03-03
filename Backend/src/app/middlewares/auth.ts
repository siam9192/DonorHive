import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';

import AppError from '../Errors/AppError';

import jwt, { JwtPayload } from 'jsonwebtoken';
import { EUserStatus, TUserRole } from '../modules/User/user.interface';
import httpStatus from '../shared/http-status';
import envConfig from '../config/env.config';
import User from '../modules/User/user.model';
import { IAuthUser } from '../modules/Auth/auth.interface';
import jwtHelpers from '../helpers/jwtHelpers';

function auth(...requiredRoles: TUserRole[]) {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking if the given token is valid
    let decoded;

    try {
      decoded = jwt.verify(token, envConfig.jwt.accessTokenSecret as string) as IAuthUser &
        JwtPayload;
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
    }

    const { role, id, iat } = decoded;

    // checking if the user is exist
    const user = await User.findById(id);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
    if (user.status === EUserStatus.Deleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted ! !');
    }

    // checking if the user is blocked

    if (user.status === EUserStatus.Blocked) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    // if (
    //   user.passwordChangedAt &&
    //   User.isJWTIssuedBeforePasswordChanged(
    //     user.passwordChangedAt,
    //     iat as number,
    //   )
    // ) {
    //   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    // }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized  !');
    }

    req.user = decoded;

    next();
  });
}

export default auth;
