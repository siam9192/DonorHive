import { IUser, TAuthProvider, TUserRole } from "./user.type";

export interface IME {
  _id: string;
  fullName: string;
  profilePhotoUrl: string;
  role: TUserRole;
  email?: string;
  provider: TAuthProvider;
}

export type ICurrentUser = Pick<
  IUser,
  | "_id"
  | "fullName"
  | "email"
  | "profilePhotoUrl"
  | "phoneNumber"
  | "provider"
  | "address"
  | "role"
  | "createdAt"
  | "status"
  | "updatedAt"
>;
