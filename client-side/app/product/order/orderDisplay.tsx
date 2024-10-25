"use client"
import React, { useEffect, useState } from 'react'
import { ProductInfo } from '../class/productClass'
import { GetProductById } from './getProductById'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card'
import { Button } from '@/Components/ui/button'
interface OrderDisplayProp{
    product_id:string
}
const OrderDisplay:React.FC<OrderDisplayProp> = ({product_id}) => {
    const [product_details,setProductDetails]=useState<ProductInfo|null>(null)
  
    const fetchProduct=async()=>{
        try{
            const product=await GetProductById(product_id);
          
            if(product==null) throw new Error("unable to get the product")
                setProductDetails(product);
        }catch(err){
            console.error(err)
        }
    }

    useEffect(()=>{
        fetchProduct()
    },[product_id])
  return (
    <div>
        <Card className='flex flex-col justify-center items-center'>
            <CardHeader>
                <CardTitle>{product_details?.productName}</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col justify-center items-center '>

                    <img src={product_details?.productImage} className='md:w-5/12 mx-auto'/>
                  
                  
                    <div className='  w-5/12 flex  justify-end'>${product_details?.productPrice}</div>
                    <div className='flex flex-col justify-center items-start  gap-4  w-5/12 '>
                    

                        <header className='font-bold mx-auto'>Description</header>
                        <p className=' mx-auto text-wrap'>{product_details?.productDes}</p>
                        
                           <div>
                           <p>Retailer:</p>
                           <span>{product_details?.retailer}</span>
                           </div>

                    </div>
                   
            </CardContent>
            <CardFooter >
                <Button>Order now</Button>
            </CardFooter>
        </Card>
       
    
    </div>
  )
}

export default OrderDisplay
