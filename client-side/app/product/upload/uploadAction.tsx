import axios from "axios";
import {ProductStruct} from "../class/productClass";
import { ChartStruct } from "../chart/ChartStruct";
const backedURL=process.env.NEXT_PUBLIC_BACKEND_ROOT_API
export async function UploadAction(productObject:ProductStruct[],sellerId:string ):Promise<{message:string,statusCode:number}>{
    try{
        console.log(productObject)
        const formData=new FormData();
        const ProductEntity=productObject.map(({productName,productPrice,productDes,productCategory})=>({productName,productPrice,productDes,productCategory}))
       

        formData.append("productEntities", new Blob([JSON.stringify(ProductEntity)], { type: "application/json" }));
        console.log(productObject[0].productImages[0])
        productObject.map((product,idx)=>{
            product.productImages.map((image)=>(
                formData.append(`productImages[${idx}]`,image)
            ))
        })
       
       
     const response=await axios.post(`${backedURL}/product/create?seller_id=${sellerId}`,formData,{
        withCredentials:true,
      
     },)
     if(response.status!==200)
     {
        throw new Error("Network failure")
     }
     return {message:response.data.message,statusCode:200};
    }catch(err){
        console.log(err);
        return {message:err as string,statusCode:500};
    }


}

export async function GetUserCharts(userId:string):Promise<ChartStruct[]>{
    try{
        const response=await axios.get(`${backedURL}/product/charts?userId=${userId}`,{withCredentials:true})
        if(response.status==400) throw new Error(response.data.error)
        console.log(response.data)
        return response.data.chartList;
    }catch(err){
        if(axios.isAxiosError(err)){
            console.error(err.message)
            return []
        }
        console.error("unknown error")
        return []
    }
}
export async function SaveProductChart(chartDetails:ChartStruct){
    try{
        const response=await axios.post(`${backedURL}/product/save/chart`,chartDetails,{withCredentials:true})
        if(response.status==400) throw new Error(response.data.error)
        console.log(response.data.success)
        return
    }catch(err){
        if(axios.isAxiosError(err)){
            console.error("Error: ",err.message)
            return
        }
        console.error("unknow error")
    }
}