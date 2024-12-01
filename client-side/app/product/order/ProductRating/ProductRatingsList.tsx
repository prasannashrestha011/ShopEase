import React, { useEffect, useState } from 'react'
import { ProductRatingStruct } from '../types'
import { useAppSelector } from '@/app/redux/Store'
import { GetProductRatings } from '../fetchers'
import {  CardContent, Rating } from '@mui/material'
import { Card, CardHeader } from '@/components/ui/card'
import moment from 'moment'

const ProductRatingsList = () => {
    const [ratingList,setRatingList]=useState<ProductRatingStruct[]>([])
    const {items:productProps}=useAppSelector((state)=>state.selectedProduct)
    const fetchProductRatings=async()=>{
        if(!productProps.productId) return
        const list=await GetProductRatings(productProps.productId)
        setRatingList(list)
    }
    useEffect(()=>{
        fetchProductRatings()
    },[productProps])
  return (
    <div className='w-full '>
      <span className='mx-auto font-bold text-xl w-fit'>Reviews</span>
    <ul>
    {ratingList.map((rating,idx)=>(
        <li key={idx} className='flex flex-col gap-3'>
          
                <Card className='w-full'>
                    <CardHeader className='pt-4 pb-0 '>
                    <div className='flex gap-2 items-center'>
                    <span> {rating.ratedBy}    </span>
                    <span className='text-xs'>{moment.utc(rating.createdAt).fromNow()}</span>
                    </div>
                    </CardHeader>
                    <CardContent className='flex flex-col p-0'>
                    <Rating name='half-rating' precision={0.5} defaultValue={rating.ratedValue} readOnly />
                    <span className='text-gray-400'>{rating.review}</span>
                    </CardContent>
                </Card>
           
        </li>
      ))}
    </ul>
    </div>
  )
}

export default ProductRatingsList
