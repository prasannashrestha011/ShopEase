import axios from "axios";
import { headers } from "next/headers";

export async function UpdateOrderStatus(transactionId:string,status:string):Promise<String|null>{
    try{
        console.log("transaction id ->",transactionId)
        console.log("status ->",status)
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