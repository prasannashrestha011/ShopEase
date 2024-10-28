"use client"

import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/app/redux/Store';
const ProductList = () => {
    const router=useRouter()
    const {items,loading,error}=useAppSelector((state)=>state.productList)
    const handleOrder=async(product_id:string)=>{
      console.log(product_id);
      router.push(`/product/order/${product_id}`)
    }

  return (
 
       <ul className='grid md:grid-cols-4 md:gap-4 gap-2 yatraone'>
          {items&& items.map((item,idx)=>(
          <>
          <li key={idx}>
            <Card>
              <CardHeader>
                <CardTitle>{item.productName}</CardTitle>
                <CardDescription>$ {item.productPrice}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  <img src={`${item.productImage}`} className='w-60 h-40' alt='product image'/>
                </p>
              </CardContent>
              <CardFooter>
               <Button onClick={()=>handleOrder(item.productId)} >Order</Button>
              </CardFooter>
            </Card>
          </li>
          </>
        ))}
          </ul>
   
  )
}

export default ProductList
