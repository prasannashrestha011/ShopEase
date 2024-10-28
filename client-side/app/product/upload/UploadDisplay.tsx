"use client"
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { UploadAction } from './uploadAction'
import {ProductStruct} from '../class/productClass'
import { useAppSelector } from '@/app/redux/Store'


const UploadDisplay = () => {
  const [productList,setProductList]=useState<ProductStruct[]>([])
  const {items,loading,error}=useAppSelector((state)=>state.userDetails);
  const addProductList=()=>{
    const newProduct=new ProductStruct("",0,"","",new File([],""))
    setProductList(prevList=>[...prevList,newProduct])
  }
  const handleValueChange=(e:ChangeEvent<HTMLInputElement>,idx:number,field:keyof ProductStruct)=>{
    const newList=[...productList]
    if(field == "productImage" && e.target.files && e.target.files.length>0){
   
      console.log( typeof(e.target.files[0]))
      newList[idx][field]=e.target.files[0];
     
    }else{
      newList[idx]={...newList[idx],[field]:e.target.value}
      setProductList(newList);
    }
   
  }



  return (
    <div className='flex flex-col justify-center items-center gap-4 font-semibold font-sans'>
      <header className="font-bold text-3xl">Product details</header>
      <Button onClick={()=>addProductList()}>Add Item</Button>
      <main>
        {productList.map((item,idx)=>(
          <div key={idx}>
          <section >
            <label className='ml-2'>Product Name</label>
            <Input className='w-80' type='text' placeholder='Product name' value={item.productName} 
            onChange={(e)=>handleValueChange(e,idx,"productName")} />
          </section>
          <section >
            <label className='ml-2'>Product Price $</label>
            <Input className='w-80 h-fit' type='number' placeholder='Product price $'
              onChange={(e)=>handleValueChange(e,idx,'productPrice')}/>
          </section>
          <section>
            <label className='ml-2'>Product Description</label>
            <Input className='w-80' type='text' placeholder='Product Description $'
              onChange={(e)=>handleValueChange(e,idx,'productDes')}/>
          </section>
          <section>
        <label className='ml-2'>Product Main image </label>
        <Input className='w-80' type='file' placeholder='Product Main image'
        onChange={(e)=>handleValueChange(e,idx,"productImage")}
        />
      </section>
          </div>
        ))}
      </main>
      <Button className='w-60 bg-blue-600' onClick={()=>items?UploadAction(productList,items.id):console.log("warning no id !!!")} >Submit</Button>
      <br/>
     
    </div>
  )
}

export default UploadDisplay
