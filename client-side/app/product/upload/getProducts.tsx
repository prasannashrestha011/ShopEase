import axios from "axios";
import { ProductInfo} from "../class/productClass";
const backedURL=process.env.NEXT_PUBLIC_BACKEND_ROOT_API
export async function GetAllProducts():Promise<ProductInfo[]>{
    try{
        const response=await axios.get(`${backedURL}/product/list`,{withCredentials:true})
        if(response.status!==200){
            throw new Error("failed to fetch the data")
        }
        return response.data;
    }catch(err){
        console.error(err)
        return [];
    }

}