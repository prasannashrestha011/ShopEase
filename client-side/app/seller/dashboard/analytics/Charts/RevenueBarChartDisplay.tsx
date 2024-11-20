import React, { useEffect, useState } from 'react'

import { ChartData, DailyRevenueStruct } from '../../class';

import { useAppSelector } from '@/app/redux/Store';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { Skeleton } from '@/components/ui/skeleton';




const RevenueBarChartDisplay = () => {
   
    const [chartData,setChartData]=useState<ChartData[]>([])
    const {items , loading}=useAppSelector((state)=>state.analytics)
    const {items:user}=useAppSelector((state)=>state.userDetails)
    const fetchRevenueData=async()=>{
            
      if(items){
        const data=transformRevenueDataFunc(items)
        setChartData(data)
      }
        
       
    }
    const transformRevenueDataFunc=(data:DailyRevenueStruct):ChartData[]=>{
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
       
        const chart=daysOfWeek.map((day,index)=>{
            const dailyRevenue=data[index] || []
            console.log(dailyRevenue)
            const totalAmt=dailyRevenue.reduce((sum,record)=>sum+record.amount,0)
            return {day,"Total Revenue":totalAmt}
        })

        return chart
    }
    
    useEffect(()=>{
       
        fetchRevenueData()
    },[items,user])

    if(loading && items===null){
      return(
        <div  className="flex flex-col space-y-3 h-96 w-8/12">
      
      <Skeleton className="h-full w-full rounded-xl bg-gray-600" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-gray-600" />
    
      </div>
   
        </div>
      )
      
    }
    
    return (
        <div className="md:w-8/12 w-full h-96 md:h-96 border border-gray-200  shadow-lg">
            <header className='w-full bg-blue-600 text-slate-50 p-2 flex justify-center '>Current Week sales</header>
        {chartData&&(
            <ResponsiveContainer width={720} height="100%" className="p-2">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Total Revenue" fill="#3223FA" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
  )
}

export default RevenueBarChartDisplay
