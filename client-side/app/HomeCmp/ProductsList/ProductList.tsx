"use client"

import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/redux/Store';
import { addChart } from '@/app/redux/ChartDataSplice';
const ProductList = () => {
    const router=useRouter()
    const {items}=useAppSelector((state)=>state.productList)
    const dispatcher=useAppDispatch();
    const addItemToChart=(productId:string,productName:string)=>{
      dispatcher(addChart({productId,productName}))
    }
    const handleOrder=async(product_id:string)=>{
      console.log(product_id);
      router.push(`/product/order/${product_id}`)
    }

  return (
 
       <ul className='grid md:grid-cols-4 md:gap-4 gap-2 yatraone'>
          {items&& items.map((item,idx)=>(
          <>
          <li key={idx}>
            <Card >
              <CardHeader>
                <CardTitle>{item.productName}</CardTitle>
                <CardDescription>$ {item.productPrice}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  <img src={`${item.productImages[0]}`} className='w-60   rounded-sm' alt='product image'/>
                </p>
              </CardContent>
              <CardFooter className='flex justify-between'>
               <Button onClick={()=>handleOrder(item.productId)} className='bg-green-600 '>Order</Button>
               <Button className='bg-blue-600 hover:bg-blue-500 w-fit' onClick={()=>addItemToChart(item.productId,item.productName)}>Add to chart</Button>
              </CardFooter>
            </Card>
          </li>
          </>
        ))}
          </ul>
   
  )
}

export default ProductList
