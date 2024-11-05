import axios from "axios";
import { UserStruct } from "../userClass/UserStruct";

export async function GetUserDetails(username:string):Promise<UserStruct | null >{
  try{
    const response=await axios.get(`http://localhost:8080/user/credentials?username=${username}`,{withCredentials:true})
    if(response.status!=200) throw new Error(response.data);
    console.log(response.data)
    return response.data
  }catch(err){
    const errMessage=err as Error
    console.error(errMessage.message)
    return null
  }
}