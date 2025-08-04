export interface IFbDataResponse {
  id: string;
  name: string;
  email: string;
  picture: {
    data: {
      height: number;
      width: number;
      url: string;
    };
  };
}

export type TEnvironment = EEnvironment;

export enum EEnvironment {
  Development = 'DEV',
  Production = 'PROD',
}

export interface IPaginationOptions {
  page?: string | number;
  limit?: number;
  sortOrder?: string | undefined;
  sortBy?: string;
}
