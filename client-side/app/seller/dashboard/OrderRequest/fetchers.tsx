import axios from "axios";

import { CustomerStruct, DailyRevenueStruct, RevenueStruct } from "../class";

export async function UpdateOrderStatus(transactionId:string,status:string):Promise<string|null>{
    try{
       
      if(transactionId&&status){
        const response=await axios.put(`http://localhost:8080/transaction/seller/update/entry/status?transactionId=${transactionId}&status=${status}`,{},{
            withCredentials:true,
          
        })
 
        return response.data;
      }
      throw new Error("invalid form data")
    }catch(err){
        console.log(err)
        return null;
    }
}
export async function UpdateEntryReadStatus(transactionId:string):Promise<string|null>{
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
    const response=await axios.get(`http://localhost:8080/user/customer/details?customerId=${customerId}`,{withCredentials:true})
   
    return response.data;
  }catch(err){
    console.error(err)
    return null;
  }

}
export async function AddRevenueRecord(revenueDetails:RevenueStruct):Promise<string|null>{
  try{
   
      const response=await axios.post(`http://localhost:8080/revenue/create`,revenueDetails,{withCredentials:true})
      console.log(response.data)
      return response.data;
  }catch(err){
    console.error(err)
    return null;
  }
}
export async function GetRevenueRecords(sellerId:string):Promise<RevenueStruct[]|null>{
  try{
      const response=await axios.get(`http://localhost:8080/revenue/records?sellerId=${sellerId}`,{withCredentials:true})
      return response.data as RevenueStruct[]
  }catch(err){
    console.error(err)
    return null;
  }
}
export async function GetCurrentWeekRevenueRecords(sellerId:string):Promise<DailyRevenueStruct|null>{
    try{
      const response=await axios.get(`http://localhost:8080/revenue/current/week/days?sellerId=${sellerId}`,{withCredentials:true})

      return response.data as DailyRevenueStruct
    }catch(err){
      console.error(err)
      return null
    }
}