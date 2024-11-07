import { TransactionStruct } from "@/app/product/class/transactionClass";
import axios from "axios";

export async function GetOrderRequests(sellerId:string):Promise<TransactionStruct[]|null>{

    try {
        const response = await axios.get(`http://localhost:8080/transaction/seller/entries?seller_id=${sellerId}`,{withCredentials:true});
        return response.data as TransactionStruct[];
    } catch (err) {
        console.error(err);
        return null;
    }
 
}
export async function GetRecentSales(sellerId:string):Promise<TransactionStruct[]|null>{
    try{
        const response=await axios.get(`http://localhost:8080/transaction/approved/entries?sellerId=${sellerId}`,{withCredentials:true})
        return response.data as TransactionStruct[];
    }catch(err){
        console.error(err);
        return null
    }
}