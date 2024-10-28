import axios from "axios";
import {ProductStruct} from "../class/productClass";

export async function UploadAction(productObject:ProductStruct[],sellerId:string ):Promise<{message:string,statusCode:number}>{
    try{
     
        const formData=new FormData();
        const ProductEntity=productObject.map(({productName,productPrice,productDes,retailer})=>({productName,productPrice,productDes,retailer}))
        ProductEntity.forEach(item=>console.log(item))

        formData.append("productEntities", new Blob([JSON.stringify(ProductEntity)], { type: "application/json" }));
        
        productObject.map((product)=>{

        formData.append("productImages",product.productImage)
       }
       
       )
     const response=await axios.post(`http://localhost:8080/product/create?seller_id=${sellerId}`,formData,{
        withCredentials:true,
        headers:{
            'Accept': 'application/json',
          
        }
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
