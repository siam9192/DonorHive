import axios from "axios";
import { EAuthProvider, EUserRole, EUserStatus, IUser} from "./user.interface"
import { IFbDataResponse } from "../../type";
import User from "./user.model";
import { object } from "zod";

const facebookCallback = async (accessToken:string)=>{

    const fbResponse = await axios.get(
        `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
      );
  
      const userData = fbResponse.data as IFbDataResponse;
      const user = await User.findOne({
        facebookId:userData.id
      })

      const data = {
        fullName:userData.name,
        profilePhotoUrl:userData.picture.data.url,
        email:userData.email,
        provider:EAuthProvider.Facebook
       }
      

      if(!user){
        
      } 
      else {
       let updatableData  = {

       };
    //    Object.entries(data).map(([key,value])=>{
    // //     if(user.doc !== )
    // //    })
      }
}
