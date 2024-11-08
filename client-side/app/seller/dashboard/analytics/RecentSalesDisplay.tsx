import { TransactionStruct } from '@/app/product/class/transactionClass'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { GetRecentSales } from '../fetchers'
import { useAppSelector } from '@/app/redux/Store'
import { Scrollbars } from 'react-custom-scrollbars';
import { RevenueStruct } from '../class'
import moment from 'moment'
const RecentSalesDisplay = () => {
    const [recentSales,setRecentSales]=useState<RevenueStruct[]|null>([])
    const {items}=useAppSelector((state)=>state.userDetails)
    const fetchRecentSales=async()=>{
        if(items){
            const salesRecord=await GetRecentSales(items.id);
            salesRecord!=null?setRecentSales(salesRecord):[]
        }
    }
    useEffect(()=>{
        fetchRecentSales()
    },[])
  return (
    <Card>
       <ul >
        <CardHeader className='  mt-2 ml-6 cursor-pointer '>
            <span className='font-bold'>Your Recent Sales</span>
            <CardDescription className=' text-sm font-extralight'>You made {recentSales?.length} sales in current week</CardDescription>
        </CardHeader>
        <div className='h-72 w-96  overflow-x-hidden'>
            <Scrollbars style={{height:'100%',width:'100%'}} >
       {recentSales&&recentSales.map((item,idx)=>(
        <li key={idx} className='flex items-center'>
         
            <CardContent className='flex gap-4 mt-2 items-center overflow-x-hidden ' >   
            <img src={items?.userImage} className='rounded-full w-8 h-8 ml-2 '/>    
                <div>
                <span>+${item.amount}</span>
                
               <CardDescription>
               <span> {moment(item.createdAt).fromNow()}</span>
               </CardDescription>
                </div>
 
            </CardContent>
           
        </li>
       ))}
       </Scrollbars>
        </div>
       </ul>
    </Card>
  )
}

export default RecentSalesDisplay
