import { TransactionStruct } from "@/app/product/class/transactionClass";
import axios from "axios";
import { CurrAndPrevRevenueStruct, RevenueStruct } from "./class";

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
        return null;
    }
}
export async function GetTotalRevenue(sellerId:string):Promise<number>{
    try{
        const response=await axios.get(`http://localhost:8080/revenue/total/amount?sellerId=${sellerId}`,{withCredentials:true})
        console.log(response.data)
        return response.data.totalAmount;
    }catch(err){
        return 0;
    }
}