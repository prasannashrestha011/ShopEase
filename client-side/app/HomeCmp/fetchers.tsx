import axios from "axios"
import { ProductInfo } from "../product/class/productClass"


export async function FetchAdditionalProductList(page:number):Promise<ProductInfo[]>{
    try{
        const response=await axios.get(`http://localhost:8080/product/list?page=${page}`,{withCredentials:true})
        if(response.status!==200) throw new Error("failed to fetch the data")
        
            return response.data 
    }catch(err){
        console.error(err)
        return []
    }
}