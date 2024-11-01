import axios from "axios";
import { TransactionStruct } from "../../class/transactionClass";

export async function GetEntries(id:string):Promise<TransactionStruct[] | null>{
    try{
        const response=await axios.get(`http://localhost:8080/transaction/customer/entries?customer_id=${id}`,{withCredentials:true})
        console.log(response.data)
        return response.data;
    }catch(err){
        console.error(err)
        return null;
    }
}