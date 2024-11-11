import axios from "axios";
import { ProductInfo, ProductStruct } from "../class/productClass";

export async function GetSearchedProduct(productName:string):Promise<ProductInfo []|string>{
    try{
        const response=await axios.get(`http://localhost:8080/product/name?productName=${productName}`,{withCredentials:true})
   
        return response.data
    }catch(err){
        if(axios.isAxiosError(err)){
            console.log("runnign....")
            console.log(err.response?.data)
            return "Product not found"
        }else{
            const serverErr=err as Error
            return "Internal server error"
        }
  
    }
}