import axios from "axios";
import { headers } from "next/headers";
import { CustomerStruct } from "../class";

export async function UpdateOrderStatus(transactionId:string,status:string):Promise<String|null>{
    try{
       
      if(transactionId&&status){
        const response=await axios.put(`http://localhost:8080/transaction/seller/update/entry/status?transactionId=${transactionId}&status=${status}`,{},{
            withCredentials:true,
          
        })
        console.log(response.data)
        return response.data;
      }
      throw new Error("invalid form data")
    }catch(err){
        console.log(err)
        return null;
    }
}
export async function UpdateEntryReadStatus(transactionId:string):Promise<String|null>{
  try{
     
    if(transactionId){
      console.log(transactionId)
      const response=await axios.put(`http://localhost:8080/transaction/update/readstatus?transactionId=${transactionId}`,{},{
          withCredentials:true,
        
      })
      console.log(response.data)
      return response.data;
    }
    throw new Error("invalid form data")
  }catch(err){
      console.log(err)
      return null;
  }
}
export async function GetCustomerDetails(customerId:string):Promise<CustomerStruct|null>{
  try{
    const response=await axios.get(`http://localhost:8080/user/details?id=${customerId}`,{withCredentials:true})
    return response.data;
  }catch(err){
    console.error(err)
    return null;
  }

}
