import { ObjectId } from 'mongoose';
import { TUserRole } from '../User/user.interface';

export interface IRegistrationRequest {
  _id: ObjectId;
  fullName: string;
  email: string;
  role: TUserRole;
  password: string;
  status: ERegistrationRequestStatus;
  expireAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type TRegistrationRequestStatus = `${ERegistrationRequestStatus}`;

export enum ERegistrationRequestStatus {
  PENDING = 'Pending',
  VERIFIED = 'Verified',
  EXPIRED = 'Expired',
  CANCELED = 'Canceled',
}
