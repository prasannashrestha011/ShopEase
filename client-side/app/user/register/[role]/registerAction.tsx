import axios from "axios";
import { UserStruct } from "../../userClass/UserStruct";

export async function RegisterUser(role:string,userDetails:UserStruct):Promise<string>{
    var userRole=""
    if(role=="seller") userRole=role;
   try{
        const response=await axios.post(`http://localhost:8080/account/register?role=${userRole}`,userDetails)
        if(response.status!==200) throw new Error(response.data)
            console.log("message->",response.data)
      
        return "200";

   }catch(err){
    const error = err as Error;
  
    console.error(error.message)
    return "400"

    }
}