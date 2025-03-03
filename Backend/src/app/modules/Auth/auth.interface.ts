import e from "express"
import { TUserRole } from "../User/user.interface"

export interface IRegistrationPayload {
    fullName:string,
    email:string,
    password:string,

}



export interface IVerifyRegistrationRequest {
    token:string
}


export interface ILoginPayload  {
    email:string,
    password:string
}

export interface IChangePasswordPayload {
    oldPassword:string,
    newPassword:string
}

export interface IAuthUser {
    id:string,
    email?:string,
    role:TUserRole
}