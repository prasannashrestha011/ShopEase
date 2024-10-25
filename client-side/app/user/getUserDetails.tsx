import axios from "axios";

export async function getUserDetails(username:string):Promise<UserStruct | null >{
  try{
    const response=await axios.get(`http://localhost:8080/user/details?username=${username}`)
    if(response.status!=200) throw new Error(response.data);
    return response.data.details
  }catch(err){
    console.error(err)
    return null
  }
}