import { model, Schema } from "mongoose";
import { ERegistrationRequestStatus, IRegistrationRequest } from "./registrationRequest.interface";
import { EUserRole } from "../User/user.interface";

const RegistrationRequestModelSchema = new Schema<IRegistrationRequest>({
    fullName:{
        type:String,
        minlength:3,
        maxlength:20,
        required:true
    },
    email:{
        type:String,
        minlength:5,
        maxlength:50,
        required:true
    },
    role:{
        type:String,
        enum:Object.values(EUserRole),
        default:EUserRole.Donor,
        required:true
    },
    password:{
        type:String,
        required:true
    },

    status:{
        type:String,
        enum:Object.values(ERegistrationRequestStatus),
        default:ERegistrationRequestStatus.PENDING,
        required:true
    },
    expireAt:{
        type:Date,
        required:true
    }
},
{
    timestamps:true
}
)


const RegistrationRequest = model<IRegistrationRequest>("Registration-request",RegistrationRequestModelSchema)


export default RegistrationRequest