import axios from "axios";
import { ProductInfo } from "../class/productClass";

export async function GetProductById(id:string):Promise<ProductInfo | null>{
        if(id==null){
            console.log("id is null")
            return null
        };
    try{
        const response=await axios.get(`http://localhost:8080/product?id=${id}`,{withCredentials:true})
        if(response.status!==200) throw new Error("internal server error")
            return response.data;
    }catch(err){
        console.error(err)
        return null;
    }
}