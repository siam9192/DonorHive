import { model, Schema } from "mongoose";
import { EAuthProvider, EUserRole, EUserStatus, IUser, IUserAddress } from "./user.interface";

const AddressSchema =  new Schema<IUserAddress>({
    street:{
        type:String,
        minlength:2,
        maxlength:16,
        required:true
    },
   city:{
        type:String,
        minlength:2,
        maxlength:25,
        required:true
    },
    state:{
        type:String,
        minlength:2,
        maxlength:25,
        default:null
    },
    country:{
        type:String, 
        minlength:2,
        maxlength:32,
        required:true
    }
})


const UserModelSchema = new Schema<IUser>({
    fullName:{
        type:String,
        minlength:3,
        maxlength:20,
        required:true
    },
    profilePhotoUrl:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/3001/3001758.png",
        required:true
    },
    address:{
        type:AddressSchema,
        default:null
    },
    phoneNumber:{
        type:String,
        minlength:5,
        maxlength:20
    },
    role:{
        type:String,
        enum:Object.values(EUserRole),
        default:EUserRole.Donor,
        required:true
    },
    email:{
        type:String,
        minlength:5,
        maxlength:50,
        required:true
    },
        googleId:{
            type:String,
            minlength:5,
            default:null
        },
        facebookId:{
            type:String,
            minlength:5,
            default:null
        },
        provider:{
            type:String,
            enum:Object.values(EAuthProvider),
            required:true
        },
        password:{
            type:String,
            index:false,
            required:true
        },
        status:{
            type:String,
            enum:Object.values(EUserStatus),
            default:EUserStatus.Active,
            required:true
        },
        passwordChangedAt:{
            type:Date,
            default:null
        }

},
{
    timestamps:true
})

 
const User = model<IUser>("User",UserModelSchema)


export default User;
