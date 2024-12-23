import axios from "axios"
import { ProductInfo } from "../product/class/productClass"


export async function FetchAdditionalProductList(page:number):Promise<ProductInfo[]>{
    try{
        const response=await axios.get(`https://shopease-nxe0.onrender.com/product/list?page=${page}`,{withCredentials:true})
        if(response.status!==200) throw new Error("failed to fetch the data")
        
            return response.data 
    }catch(err){
        console.error(err)
        return []
    }
}

export async function UpdateProductViewsCount(productId:string):Promise<string>{
    try{
        const response=await axios.put(`https://shopease-nxe0.onrender.com/product/update/views?productId=${productId}`,
            {},
            {withCredentials:true})
        if(response.status==500) throw new Error(response.data)
        
            return response.data 
    }catch(err){
        console.error(err)
        if(axios.isAxiosError(err)){
            console.error("Axios error:",err.message)
            return err.message
        }
        return "unknow server error"
    }
}
