import { TAuthProvider, TUserRole } from "./user.type";

export interface IME {
  _id: string;
  fullName: string;
  profilePhotoUrl: string;
  role: TUserRole;
  email?: string;
  provider: TAuthProvider;
}

export interface ICurrentUser {
  _id: string;
  fullName: string;
  profilePhotoUrl: string;
  role: TUserRole;
  email?: string;
  provider: TAuthProvider;
}
