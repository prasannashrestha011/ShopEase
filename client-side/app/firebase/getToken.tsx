import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";
export async function GetToken(){
    try{
        const token=await getToken(messaging,{
            vapidKey:"BOQJUEsP1smuTnx_8zUQnXjjTl9gGyzG_iIPC0gETFNv5i5tradLLfX1cmBBj48c3Bb8pdY_HueHzE3NbF_ysIo"
        })
        if(token){
            console.log("your token ",token)
            return token
        }else{
            console.log("token not found")
        }
    }catch(err){
        console.error(err)
    }
}