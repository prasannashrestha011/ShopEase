"use client"
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UploadAction } from './uploadAction'
import {ProductStruct} from '../class/productClass'
import { useAppSelector } from '@/app/redux/Store'
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
const UploadDisplay = () => {
  const [productList,setProductList]=useState<ProductStruct[]>([])
  
  const {items}=useAppSelector((state)=>state.userDetails);
  const addProductList=()=>{
    const newProduct=new ProductStruct("",0,[],[],"")
    setProductList(prevList=>[...prevList,newProduct])
  }
  const handleValueChange=(e:ChangeEvent<HTMLInputElement>,idx:number,field:keyof ProductStruct,desIdx?:number)=>{
    const newList=[...productList]
    if(field == "productImages" && e.target.files && e.target.files.length>0){
      const filesArray=Array.from(e.target.files)
      newList[idx][field]=[...newList[idx][field],...filesArray]
      console.log(newList)
      setProductList(newList);
      return
    }else if(field=="productDes" && typeof desIdx=="number"){
      newList[idx][field][desIdx]=e.target.value
      setProductList(newList)
    }
    else{
      newList[idx]={...newList[idx],[field]:e.target.value}
    setProductList(newList);
    }
    
  }
  const clearList=()=>{
    setProductList([])
  }

  useEffect(()=>{
    console.log(items?.id)
  },[items?.id])

  return (
    <div className='flex flex-col justify-center items-center gap-4 font-semibold font-sans'>
      <header className="font-bold text-2xl">Upload products</header>
      <div>
        <div className='flex gap-2 justify-end items-end '>
        <IoMdAddCircleOutline size={32} color='gray' onClick={()=>addProductList()} />
        {productList.length>0&&<AiFillDelete size={32} onClick={()=>clearList()}/>}
        </div>
        <main>
          {productList.map((item,idx)=>(
            <div key={idx} className='mb-4 border p-4 shadow-md rounded-md'>
            <section >
              <label className='ml-2'>Product Name</label>
              <Input className='w-80' type='text' placeholder='Product name' value={item.productName} 
              onChange={(e)=>handleValueChange(e,idx,"productName")} />
            </section>
            <section >
              <label className='ml-2'>Product Price $</label>
              <Input className='w-80 h-fit'  type='number' placeholder='Product price $'
                onChange={(e)=>handleValueChange(e,idx,'productPrice')} required/>
            </section>
            <section>
              <label className='ml-2'>Product Description</label>
            {Array(4).fill(0).map((des,descIdx)=>(
              <Input className='w-80'  type='text' placeholder='Product Description $'
                onChange={(e)=>handleValueChange(e,idx,'productDes',descIdx)} required/>  
            ))}
            
            </section>
            <section>
            <label className='ml-2'>Category</label>
            <Input className='w-80' type='text' placeholder='Product Description $'
                onChange={(e)=>handleValueChange(e,idx,'productCategory')} required/>
            </section>
            <section className='flex flex-col'>
              <header>Images of products (atleast 4)</header>
          <label className='ml-2 bg-blue-700 w-16 text-center p-1 rounded-md  text-slate-50 hover:bg-blue-400' htmlFor={`file-${idx}`} >Add </label>
          <input className='w-80 hidden' id={`file-${idx}`} type='file' placeholder='Product Main image'
          onChange={(e)=>handleValueChange(e,idx,"productImages")}
          required
          />
          <ul className='grid grid-cols-2 gap-1'>
          {item.productImages&&item.productImages.map((imageFile,idx)=>(
            imageFile.name!=""?<img key={idx} src={URL.createObjectURL(imageFile)} className='w-36 ' />:""
          ))}
          </ul>
          
        </section>
            </div>
          ))}
    
        </main>

      </div>

      <Button className='w-60 bg-blue-600' disabled={productList.length>0?false:true} onClick={()=>items?.id?UploadAction(productList,items.id):console.log("warning no id !!!")} >Submit</Button>
      <br/>
     
    </div>
  )
}

export default UploadDisplay
