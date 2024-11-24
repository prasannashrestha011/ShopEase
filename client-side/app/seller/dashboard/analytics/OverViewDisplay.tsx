import { useAppSelector } from '@/app/redux/Store'
import React, { useEffect, useState } from 'react'
import { GetTotalRevenue, GetTotalViewsCount } from '../fetchers'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RatingAnalyticsStruct } from '@/app/product/order/types'
import { GetRatingAnalytics } from '@/app/product/order/fetchers'
import { Rating } from '@mui/material'

const OverViewDisplay = () => {
    const [totalRevenue,setRevenue]=useState<number>(0)
    const [ratingAnalytics,setRatingAnalytics]=useState<RatingAnalyticsStruct|null>(null)
    const [totalViews,setTotalViews]=useState<number>(0)
    const {items:user}=useAppSelector((state)=>state.userDetails)

 
    const fetchAllAnalytics=async()=>{
       if(user){
        const revenueAmt=await GetTotalRevenue(user?.id)
        const ratingAnalyticsData=await GetRatingAnalytics(user.id)
        const totalViewsCount=await GetTotalViewsCount(user.id)
        setRevenue(revenueAmt)
        setRatingAnalytics(ratingAnalyticsData)
        setTotalViews(totalViewsCount)
       }
    }
    useEffect(()=>{
        fetchAllAnalytics()
        console.log(ratingAnalytics?.averageReviewValue)
    },[user])
  return (
    <div className='flex flex-col text-xl h-44 pl-2'>
        <header className='font-bold mb-2 ml-2'>OverView</header>
       <div className='flex gap-2'>
       <Card className='w-fit bg-gradient-to-b from-[#5B14E8] to-[#5953F6] text-slate-100'>
            <CardHeader>TotalRevenue</CardHeader>
            <CardContent>
                <span>+${totalRevenue}</span>
            </CardContent>
        </Card>
        <Card className='w-fit bg-gradient-to-b from-[#5B14E8] to-[#5953F6] text-slate-100'>
            <CardHeader>Total Reviews</CardHeader>
            <CardContent>
                <span>{ratingAnalytics?.totalReviews}</span>
            </CardContent>
        </Card>
        <Card className='w-fit bg-gradient-to-b from-[#5B14E8] to-[#5953F6] text-slate-100'>
            <CardHeader>Average Product Rating</CardHeader>
            <CardContent className='flex justify-center items-center'>
                <span>
                 {ratingAnalytics&&   <Rating defaultValue={ratingAnalytics?.averageReviewValue}  value={ratingAnalytics?.averageReviewValue} readOnly/>}
                    </span>
            </CardContent>
        </Card>
        <Card className='w-fit p-0  bg-gradient-to-b from-[#5B14E8] to-[#5953F6] text-slate-100'>
            <CardHeader className='text-sm'>Total product views</CardHeader>
            <CardContent className='flex justify-center items-center'>
                <span>
                    {totalViews}
                    </span>
            </CardContent>
        </Card>
       </div>
    </div>
  )
}

export default OverViewDisplay
