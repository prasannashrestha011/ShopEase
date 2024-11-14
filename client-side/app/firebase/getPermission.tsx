
import { NotificationTokenStruct } from "./types";
import { SaveFcmToken } from "./fetchers";
import { GetToken } from "./getToken";

export async function GetNotificationPermission(userId:string,username:string){
    try{
        const permission= await Notification.requestPermission();
        if(permission==="granted"){
            const token=await GetToken()
            
            if(token){
                const tokenDetails=new NotificationTokenStruct(userId,token,username);
                await SaveFcmToken(tokenDetails)
            }
            
        }
    }catch(err){
        console.error(err)
    }
}
