import axios from "axios";
import {ProductStruct} from "../class/productClass";

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
       
       
     const response=await axios.post(`http://localhost:8080/product/create?seller_id=${sellerId}`,formData,{
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