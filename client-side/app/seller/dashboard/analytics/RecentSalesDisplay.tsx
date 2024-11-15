import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { GetRecentSales } from '../fetchers'
import { useAppSelector } from '@/app/redux/Store'
import { RevenueStruct } from '../class'
import moment from 'moment'
import { Skeleton } from '@/components/ui/skeleton'
const RecentSalesDisplay = () => {
    const [recentSales,setRecentSales]=useState<RevenueStruct[]|null>([])
    const {items:user,loading}=useAppSelector((state)=>state.userDetails)
    const fetchRecentSales=async()=>{
   
            const salesRecord=user?await GetRecentSales(user.id):null
            salesRecord!=null?setRecentSales(salesRecord):[]
        
    }
    useEffect(()=>{
        fetchRecentSales()
    },[user])
    if(loading){
        return(
            <div>
                 <Skeleton className="h-20 w-full rounded-xl bg-gray-600" />
                    <div className="space-y-2 mt-8">
                        <Skeleton className="h-8 w-[250px] bg-gray-600" />
                    
                    </div>
            </div>
        )
    }
  return (
    <Card className='w-72' >
       <ul >
        <CardHeader className='  mt-2 ml-6 cursor-pointer '>
            <span className='font-bold'>Your Recent Sales</span>
            <CardDescription className=' text-sm font-extralight'>You made {recentSales?.length} sales this week</CardDescription>
        </CardHeader>
        <div className='h-72 w-96  overflow-x-hidden'>
        
       {recentSales&&recentSales.length>0&&recentSales.map((item,idx)=>(
        <li key={idx} className='flex items-center'>
         
            <CardContent className='flex gap-4 mt-2 items-center overflow-x-hidden ' >   
            <img src={user?.userImage} className='rounded-full w-8 h-8 ml-2 '/>    
                <div>
                <span>+${item.amount}</span>
                
               <CardDescription>
               <span> {moment(item.createdAt).fromNow()}</span>
               </CardDescription>
                </div>
 
            </CardContent>
           
        </li>
       ))}

        </div>
       </ul>
    </Card>
  )
}

export default RecentSalesDisplay
