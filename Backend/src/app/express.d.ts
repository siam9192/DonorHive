// src/@types/express.d.ts

import express from 'express';
import { TRole } from '../modules/user/user.interface';
import { JwtPayload } from 'jsonwebtoken';
import { IAuthUser } from './modules/Auth/auth.interface';

declare global {
  namespace Express {
    export interface Request {
      user: IAuthUser;
      // Add other properties here as needed
    }
  }
}
