import { ObjectId } from 'mongoose';

export interface IUser {
  _id: ObjectId;
  fullName: string;
  profilePhotoUrl: string;
  address?: IUserAddress;
  phoneNumber?: string;
  role: TUserRole;
  email?: string;
  googleId?: string;
  facebookId?: string;
  provider: TAuthProvider;
  password: string;
  status: TUserStatus;
  passwordChangedAt?: Date;
  createdAt: string;
  updatedAt: string;
}

export interface IUserAddress {
  street: string;
  city: string;
  state?: string;
  country: string;
}

export type TUserRole = `${EUserRole}`;

export type TUserStatus = `${EUserStatus}`;
export type TAuthProvider = `${EAuthProvider}`;

export enum EUserRole {
  Donor = 'Donor',
  Admin = 'Admin',
}

export enum EUserStatus {
  Active = 'Active',
  Blocked = 'Blocked',
  Deleted = 'Deleted',
}

export enum EAuthProvider {
  EmailPassword = 'Email-Password',
  Facebook = 'Facebook',
  Google = 'Google',
}

export interface IFilterUser {
  searchTerm?: string;
  id?: string;
  status?: TUserStatus;
}
