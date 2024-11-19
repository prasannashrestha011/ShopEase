import axios from "axios";
import { TransactionStruct } from "../class/transactionClass";

export async function OrderAction( transactionDetails:TransactionStruct):Promise<string | null>{
    try{
        const response=await axios.post(`http://localhost:8080/transaction/create`,transactionDetails,{withCredentials:true})
        
        return response.data;
    }catch(err){
        console.error(err)
        return null;
    }
}