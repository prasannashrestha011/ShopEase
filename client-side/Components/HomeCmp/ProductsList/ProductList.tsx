"use client"
import { ProductInfo } from '@/app/product/class/productClass';
import { GetAllProducts } from '@/app/product/upload/getProducts';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
const ProductList = () => {
    const router=useRouter()

    const [list,setList]=useState<ProductInfo[]>([]);
    const fetchProductList=async()=>{
     try{
      const list=await GetAllProducts();
      if(list!=null){
        setList(list);
      }
     }catch(err){
       setList([])
     }

    }
    const handleOrder=async(product_id:string)=>{
      console.log(product_id);
      router.push(`/product/order/${product_id}`)
    }
    useEffect(()=>{
        fetchProductList();
      },[])
  return (
 
       <ul className='grid md:grid-cols-4 md:gap-4 gap-2'>
          {list&& list.map((item,idx)=>(
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
