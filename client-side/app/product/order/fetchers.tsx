import axios from "axios";
import { ProductQueryStruct, ProductRatingStruct, QueryReplyStruct, RatingAnalyticsStruct } from "./types";

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
//productRatings

export async function GetProductRatings(productId:string):Promise<ProductRatingStruct[]>{
    try{
        const response=await axios.get(`http://localhost:8080/product/get/ratings?productId=${productId}`,{withCredentials:true})
        if(response.status===404) throw new Error(response.data.error)
        console.log(response.data)
            return response.data as ProductRatingStruct[]
    }catch(err){
        if(axios.isAxiosError(err)){
            console.log(err.message)
            return []
        }
        console.error("unknow error")
        return []
    }
}
export async function InsertProductRating(ratingEntity:ProductRatingStruct):Promise<string>{
    try{
        const response=await axios.post(`http://localhost:8080/product/insert/rating`,ratingEntity,{withCredentials:true})
        if(response.status===500) throw new Error(response.data)

        return response.data.success as string
    }catch(err){
        if(axios.isAxiosError(err)){
            console.log(err.message)
            return err.message as string
        }
        return "unknow error"
    }
}
export async function GetRatingAnalytics(sellerId:string):Promise<RatingAnalyticsStruct|null>{
    try{
        const response=await axios.get(`http://localhost:8080/product/rating/analytics?sellerId=${sellerId}`,{withCredentials:true})
        if(response.status==404) throw new Error("analytics not found")
            return response.data
    }catch(err){
        if(axios.isAxiosError(err)){
            console.log(err.message)
            return null
        }
        return null
    }
}