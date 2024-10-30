"use client"
import { Button } from '@/Components/ui/button';
import axios from 'axios';
import React, { ChangeEvent, useState } from 'react'

const page = () => {
    const [files,setFiles]=useState<File[][]>([[]]);
   const handleFileChange = (e: ChangeEvent<HTMLInputElement>,index:number) => {
       if(e.target.files){
       const targetedFiles=Array.from(e.target.files)
       const currentFilesList=[...files]
       currentFilesList[index]=[...currentFilesList[index],...targetedFiles]
       setFiles(currentFilesList)
        
       }
    }
const addFileElement=()=>{
  
    setFiles(prev=>[...prev,[]])
}
const handleSubmit=async()=>{
    const productEntity={
        "productId": "1234567890abcdef",
        "productName": "Sample Product",
        "productPrice": 1999,
        "productDes": "This is a description of the sample product.",
        "sellerId": "seller123",
        "createdAt": "2024-10-30",
        "updatedAt": "2024-10-30"
    }
    
    const formData=new FormData()
        formData.append("productEntity.productId", productEntity.productId);
        formData.append("productEntity.productName", productEntity.productName);
        formData.append("productEntity.productPrice", productEntity.productPrice.toString());
        formData.append("productEntity.productDes", productEntity.productDes);
        formData.append("productEntity.sellerId", productEntity.sellerId);
        formData.append("productEntity.createdAt", productEntity.createdAt);
        formData.append("productEntity.updatedAt", productEntity.updatedAt);
    files.forEach((file,idx)=>{
       file.forEach((image)=>{
        formData.append(`files[${idx}]`,image)
       }) 
       
    })
   try{
    const response=await axios.post(`http://localhost:8080/files/test`,formData,{withCredentials:true})
    if(response.status!==200) throw new Error("failed")
        console.log(response.data)
}catch(err){
    console.error(err)
   }
}
  return (
    <div>
        <ul className='flex flex-col gap-4'>
        {files&&files.map((file,idx)=>(
           <>
              <input type='file' onChange={(e)=>handleFileChange(e,idx)}/>
              {file.map((image)=>(
                <li>{image.name}</li>
              ))}
           </>
        ))}
        </ul>
        <Button onClick={()=>addFileElement()}>Add</Button>
        <Button onClick={()=>handleSubmit()}>Submit</Button>
    </div>
  )
}

export default page
