import axios from "axios";
import { NotificationBody, NotificationTokenStruct } from "./types";

export async function SaveFcmToken(tokenDetails:NotificationTokenStruct){
    try{
        const response=await axios.post(`http://localhost:8080/notification/save/token`,tokenDetails,{withCredentials:true})
        console.log("token saved...")
        console.log(response.data)
    }catch(err){
        console.error(err)
    }
}
export async function GetFcmToken(userId:string):Promise<string>{
    try{
        const response=await axios.get(`http://localhost:8080/notification/get/token?userId=${userId}`,{withCredentials:true})
        if(response.status===404) throw new Error("token not found")
            console.log(response.data)
        return response.data.token;
    }catch(err){
        console.error(err)
        if(axios.isAxiosError(err)){
            
            return err.response?.data
        }
        return err as string;
    }
}
export async function SendNotification(messageObject:NotificationBody){
    try{
        const response=await axios.post(`http://localhost:8080/notification/send`,messageObject,{withCredentials:true})
        console.log(response.data)
    }catch(err){
        console.error(err)
    }
}
