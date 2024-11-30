"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React, {  useRef } from 'react'
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/redux/Store';
import { addChart } from '@/app/redux/ChartDataSplice';
import { Skeleton } from '@/components/ui/skeleton';

import { SaveProductChart } from '@/app/product/upload/uploadAction';
import { ChartStruct } from '@/app/product/chart/ChartStruct';
const ProductList = () => {
    const router=useRouter()
    const loadingRef=useRef(null)
    const {items:userDetails}=useAppSelector((state)=>state.userDetails)
   

    const {items,loading}=useAppSelector((state)=>state.productList)
  
    
    const dispatcher=useAppDispatch();
    const addItemToChart=async(productId:string,productName:string)=>{
      dispatcher(addChart({productId,productName,userId:userDetails?.id}))
      const chartDetails:ChartStruct={
        productId,
        productName,
        userId:userDetails?.id
      }
      await SaveProductChart(chartDetails)
    }
    const handleOrder=async(product_id:string)=>{
      console.log(product_id);
      router.push(`/product/order/${product_id}`)
    }

   
 

    if(loading){
      return(
        <div className='grid grid-cols-4 md:gap-4 '>
      {Array(8).fill("empty").map((_,idx)=>(
        
        <div className='flex flex-col gap-2' key={idx}>
          <Skeleton key={idx} className='bg-gray-500 w-72 h-48'/>
       
          <Skeleton className='h-8 w-60 bg-gray-500'/>  
        
        </div>
      ))}
        </div>
      )
    }
  return (
 
       <ul className='grid md:grid-cols-4 md:gap-4 gap-2 yatraone '>
          {items&& items.map((item,idx)=>(
    
          <li key={idx}>
            <Card  >
              <CardHeader>
                <CardTitle>{item.productName}</CardTitle>
                <CardDescription>$ {item.productPrice}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  <img src={`${item.productImages[0]}`} className='w-56 h-40 object-cover  rounded-sm' alt='product image'/>
                </p>
              </CardContent>
              <CardFooter className='flex justify-between'>
               <Button onClick={()=>handleOrder(item.productId)} className='bg-green-600 '>Order</Button>
               <Button className='bg-blue-600 hover:bg-blue-500 w-fit' onClick={()=>addItemToChart(item.productId,item.productName)}>Add to chart</Button>
              </CardFooter>
            </Card>
          </li>
   
        ))}
      <span ref={loadingRef} className='opacity-0' >Loading..</span>
          </ul>
   
  )
}

export default ProductList