"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { GetSearchedProduct } from './actions';
import { ProductInfo } from '../class/productClass';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import SearchInput from '@/app/HomeCmp/SearchInput';
const SearchDisplay = () => {
    const searchParams = useSearchParams();
    const productName = searchParams.get('product');
    const [productList,setProductList]=useState<ProductInfo[]>([])
    const [error,setError]=useState<string>("")
    const fetchSearchedProducts=async()=>{
        if(productName){
            const response=await GetSearchedProduct(productName)
            if (Array.isArray(response)) {
              setProductList(response);
            } else {
              setError(response);
            }
            
        }
       
    }
    useEffect(()=>{
        fetchSearchedProducts()
    },[productName,error]) 
   
 
  return (
    <div className='flex flex-col  p-2 gap-2'>
        <SearchInput/>
           
        {productList.length===0 && error.length>0?(
            <div className='h-96 w-full   flex justify-center items-center text-gray-600'>
                Not found
            </div>
        ):(
            <ul className='grid md:grid-cols-4 md:gap-4 gap-2 yatraone'>
            {productList&& productList.map((item,idx)=>(
    
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
                     <Button  className='bg-green-600 '>Order</Button>
                     <Button className='bg-blue-600 hover:bg-blue-500 w-fit' >Add to chart</Button>
                    </CardFooter>
                  </Card>
                </li>
         
              ))}
              </ul>
        )}
         
    
    </div>
  )
}

export default SearchDisplay
