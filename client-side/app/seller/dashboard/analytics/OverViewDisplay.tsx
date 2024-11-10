import { useAppSelector } from '@/app/redux/Store'
import React, { useEffect, useState } from 'react'
import { GetTotalRevenue } from '../fetchers'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const OverViewDisplay = () => {
    const [totalRevenue,setRevenue]=useState<number>(0)
    const {items:user}=useAppSelector((state)=>state.userDetails)
    const fetchTotalRevenue=async()=>{
        const revenueAmt=user?.id?await GetTotalRevenue(user?.id):0
        setRevenue(revenueAmt)
    }
    useEffect(()=>{
        fetchTotalRevenue()
    },[user])
  return (
    <div className='flex flex-col text-xl h-44 pl-2'>
        <header className='font-bold mb-2 ml-2'>OverView</header>
        <Card className='w-fit'>
            <CardHeader>TotalRevenue</CardHeader>
            <CardContent>
                <span>+${totalRevenue}</span>
            </CardContent>
        </Card>
    </div>
  )
}

export default OverViewDisplay
