import { IUser } from "./user.type";

export type TProfile = Pick<
  IUser,
  | "_id"
  | "fullName"
  | "profilePhotoUrl"
  | "email"
  | "phoneNumber"
  | "address"
  | "role"
  | "provider"
  | "status"
  | "createdAt"
  | "updatedAt"
>;
