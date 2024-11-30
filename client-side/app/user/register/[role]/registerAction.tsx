import axios from "axios";
import { UserStruct } from "../../userClass/UserStruct";

export async function RegisterUser(role:string,userDetails:UserStruct):Promise<string>{
    let userRole=""
    if(role=="seller") userRole=role;
   try{
        const response=await axios.post(`https://shopease-nxe0.onrender.com/account/register?role=${userRole}`,userDetails)
        if(response.status!==200) throw new Error(response.data)
            console.log("message->",response.data)
      
        return "200";

   }catch(err){
    const error = err as Error;
  
    console.error(error.message)
    return "400"

    }
}