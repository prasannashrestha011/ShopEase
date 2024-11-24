import { TransactionStruct } from "@/app/product/class/transactionClass";
import axios from "axios";
import { CurrAndPrevRevenueStruct, RevenueStruct,CustomerStruct,DailyRevenueStruct, UpdateProductDetailsStruct } from "./class";
import { ProductInfo } from "@/app/product/class/productClass";
import { ProductRatingStruct } from "@/app/product/order/types";

export async function GetOrderRequests(sellerId:string):Promise<TransactionStruct[]|null>{

    try {
        const response = await axios.get(`http://localhost:8080/transaction/seller/entries?seller_id=${sellerId}`,{withCredentials:true});
        return response.data as TransactionStruct[];
    } catch (err) {
        console.error(err);
        return null;
    }
 
}
export async function GetRecentSales(sellerId:string):Promise<RevenueStruct[]|null>{
    try{
        const response=await axios.get(`http://localhost:8080/revenue/current/week/records?sellerId=${sellerId}`,{withCredentials:true})
        return response.data as RevenueStruct[];
    }catch(err){
        console.error(err);
        return null
    }
}
export async function GetPrevAndCurrentWeekRecords(sellerId:string):Promise<CurrAndPrevRevenueStruct|null>{
    try{
        const response=await axios.get(`http://localhost:8080/revenue/prev/current/week/records?sellerId=${sellerId}`,{withCredentials:true})
        
        return response.data as CurrAndPrevRevenueStruct
    }catch(err){
        console.error(err)
        return null;
    }
}
export async function GetTotalRevenue(sellerId:string):Promise<number>{
    try{
        const response=await axios.get(`http://localhost:8080/revenue/total/amount?sellerId=${sellerId}`,{withCredentials:true})
        console.log(response.data)
        return response.data.totalAmount;
    }catch(err){
        console.error(err)
        return 0;
    }
}

//order Request
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
      console.log("daily revenue struct->",response)
      return response.data as DailyRevenueStruct
    }catch(err){
      console.error(err)
      return null
    }
}

export async function GetProductListOfSeller(sellerId:string,page:number):Promise<ProductInfo[]>{
    try{
        const response=await axios.get(`http://localhost:8080/product/seller?sellerId=${sellerId}&page=${page}`,{withCredentials:true})
        console.log(response.data)
        return response.data
    }catch(err){
       return []
    }
}
export async function UpdateProductDetails(newProductDetails:UpdateProductDetailsStruct):Promise<ProductInfo|null>{
  try{
    const response=await axios.put(`http://localhost:8080/product/update`,newProductDetails,{withCredentials:true})
    if(response.status===400) throw new Error(response.data.error)
      console.log(response.data)
    return response.data.success
  }catch(err){
    if(axios.isAxiosError(err)){
      return null
    }
    return null
  }
}
export async function GetProductRatingsOfSeller(sellerId:string):Promise<ProductRatingStruct[]|null>{
  try{
    const response=await axios.get(`http://localhost:8080/product/get/seller/ratings?sellerId=${sellerId}`,{withCredentials:true})
    if(response.status===400) throw new Error(response.data.error)
      console.log(response.data)
    return response.data as ProductRatingStruct[]
  }catch(err){
    if(axios.isAxiosError(err)){
      return null
    }
    return null
  }
}
export async function GetTotalViewsCount(sellerId:string){
  try{
    const response=await axios.get(`http://localhost:8080/product/total/views?sellerId=${sellerId}`,{withCredentials:true})

    return response.data.totalViews;
  }catch(err){
    return null
  }
}