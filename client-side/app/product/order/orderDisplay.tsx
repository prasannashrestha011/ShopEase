"use client"
import React, { useEffect, useState } from 'react'
import { ProductInfo } from '../class/productClass'
import { GetProductById } from './getProductById'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { ProductCarousel } from '@/app/HomeCmp/ProductsList/ProductCarousel'
import OrderDialog from './orderDialog'
import QueryInput from './ProductQueries/Inputs/QueryInput'
import RatingDisplay from './ProductRating/RatingDisplay'
import { useAppDispatch, useAppSelector } from '@/app/redux/Store'
import { SetRatingProp } from '@/app/redux/ProductRatings/SelectedProductSlice'
import { SelectedProductStruct } from './types'
import { UpdateProductViewsCount } from '@/app/HomeCmp/fetchers'


interface OrderDisplayProp{
    product_id:string
}
const OrderDisplay:React.FC<OrderDisplayProp> = ({product_id}) => {
    const [product_details,setProductDetails]=useState<ProductInfo|null>(null)
    const {items:userDetails}=useAppSelector((state)=>state.userDetails)
    

    const dispatch=useAppDispatch()
    const SetProductDetails=()=>{
            const selectedProductProps:SelectedProductStruct={
                productId:product_details?.productId,
                productName:product_details?.productName,
                sellerId:product_details?.sellerId,
                username:userDetails?.username
            }
            dispatch(SetRatingProp(selectedProductProps))
      
    }
    const fetchProduct=async()=>{
        try{
            const product=await GetProductById(product_id);
          
            if(product==null) throw new Error("unable to get the product")
                setProductDetails(product);
            await UpdateProductViewsCount(product_id)
        
        }catch(err){
            console.error(err)
        }
    }

    useEffect(()=>{
        SetProductDetails()

    },[product_details])
    
    useEffect(()=>{
        fetchProduct()
       
    },[product_id])
  return (
    <div>
        <Card className='flex flex-col justify-center items-center yatraone   border-none'>
            <CardHeader className='bg-blue-700 w-full'>
                <CardTitle className='mx-auto text-slate-100'>{product_details?.productName}</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col md:flex-row w-full  bg-slate-200 justify-center items-start h-full  '>

                    {product_details?.productImages&&
                    <div className='md:flex-1 md:pl-8 md:w-auto w-10/12 h-full  '>
                        <ProductCarousel  images={product_details?.productImages}/>
                    </div>
               
                    }

                  
                  
                 <div className='flex flex-col flex-1 '>
                    <div className=' bg-white mt-2 flex-1 flex flex-col justify-between h-full border p-2 w-full rounded-md'>
                 
                 <div className='flex flex-col justify-center items-start  gap-4  w-10/12 '>     
                    {/*for description */}
                     <section className=' border p-2 '>
                         
                     <header className='font-bold '>Description</header>
                    
                    <ol className='border-t'>                  
                       {product_details?.productDes.map((des,idx)=>(
                        <li key={idx}>{des}</li>
                     ))}
                    </ol>           
                     </section>  
                    
                    {/*for price */}
                    <section>
                        <p className='font-bold '>Price</p>
                        ${product_details?.productPrice}
                    </section>          
                 </div>
                 <div className='md:mb-9'>
                 {product_details&& <OrderDialog productName={product_details?.productName} price={product_details?.productPrice} sellerId={product_details.sellerId}/>}
                 </div>
                    </div>

                    <div className='flex items-center justify-center'>
                     <RatingDisplay  />     
                    </div>
                 </div>
                  
            </CardContent>
        
        </Card>
         <QueryInput sellerId={product_details?.sellerId??""} productId={product_details?.productId??""}  />
    
    </div>
  )
}

export default OrderDisplay
