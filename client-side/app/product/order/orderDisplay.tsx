"use client"
import React, { useEffect, useState } from 'react'
import { ProductInfo } from '../class/productClass'
import { GetProductById } from './getProductById'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { ProductCarousel } from '@/app/HomeCmp/ProductsList/ProductCarousel'
import OrderDialog from './orderDialog'
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
        <Card className='flex flex-col justify-center items-center yatraone   border-none'>
            <CardHeader>
                <CardTitle>{product_details?.productName}</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col md:flex-row w-full justify-center items-center h-screen '>

                    {product_details?.productImages&&
                    <div className='md:flex-1 md:pl-8 md:w-auto w-10/12'>
                        <ProductCarousel  images={product_details?.productImages}/>
                    </div>
                    }

                  
                  
                  <div className=' flex-1 flex flex-col justify-between h-full border p-2 w-full rounded-md'>
                 
                    <div className='flex flex-col justify-center items-start  gap-4  w-5/12 '>
                    
                        <section>
                            
                        <header className='font-bold '>Description</header>
                        <p className=' text-wrap'>{product_details?.productDes}</p>
                        </section>
                        
                      
                            <section>
                            <p className='font-bold '>Retailer:</p>
                            <span>{product_details?.sellerId}</span>
                            </section>
                           
                         
                           <section>
                           <p className='font-bold '>Price</p>
                           ${product_details?.productPrice}
                           </section>

                       
                    </div>
                    <div className='md:mb-9'>
                    {product_details&& <OrderDialog productName={product_details?.productName} price={product_details?.productPrice} sellerId={product_details.sellerId}/>}
                    </div>
                  </div>
                   
            </CardContent>
            <CardFooter >
          
            </CardFooter>
        </Card>
      
    
    </div>
  )
}

export default OrderDisplay
