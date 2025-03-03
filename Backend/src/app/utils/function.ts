import {Types } from "mongoose"

export const objectId = (id:string)=>  new Types.ObjectId(id)