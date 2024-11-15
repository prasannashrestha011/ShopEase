import axios, { Axios } from "axios";
import { ProductQueryStruct, QueryReplyStruct } from "../types";

export async function InsertProductQuery(userQuery:ProductQueryStruct):Promise<string>{
    try{
        const response=await axios.post(`http://localhost:8080/product/insert/query`,userQuery,{withCredentials:true})
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        return "failed to register the query"
    }
}
export async function GetProductQueries(productId:string):Promise<ProductQueryStruct[]>{
    try{
        const response=await axios.get(`http://localhost:8080/product/get/queries?productId=${productId}`,{withCredentials:true})
        console.log(response.data)
        return response.data as ProductQueryStruct[]
    }catch(err){
        if(axios.isAxiosError(err)){
            console.error(err.message)
            
        }else{
            console.error(err)
        }
        return []
    }
}
export async function InsertQueryReply(replyQuery:QueryReplyStruct):Promise<string>{
    try{
        const response=await axios.post(`http://localhost:8080/product/insert/query/reply`,replyQuery,{withCredentials:true})
        console.log(response.data)
        return response.data as string
    }catch(err){
        if(axios.isAxiosError(err)){
            return err.message
        }
        return "Unknow error"
    }
}