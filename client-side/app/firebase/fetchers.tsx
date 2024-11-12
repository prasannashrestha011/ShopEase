import axios from "axios";
import { NotificationBody, NotificationTokenStruct } from "./types";

export async function SaveFcmToken(tokenDetails:NotificationTokenStruct){
    try{
        const response=await axios.post(`http://localhost:8080/notification/save/token`,tokenDetails,{withCredentials:true})
        console.log("token saved...")
    }catch(err){
        console.error(err)
    }
}
export async function SendNotification(messageObject:NotificationBody){
    try{
        const response=await axios.post(`http://localhost:8080/notification/send`,messageObject,{withCredentials:true})
    }catch(err){
        console.error(err)
    }
}