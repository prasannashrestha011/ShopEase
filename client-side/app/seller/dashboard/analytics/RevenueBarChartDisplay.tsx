import React, { useEffect, useState } from 'react'

import { DailyRevenueStruct } from '../class';

import { useAppSelector } from '@/app/redux/Store';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData{
    day:string
    totalAmt:number
}
const RevenueBarChartDisplay = () => {
   
    const [chartData,setChartData]=useState<ChartData[]>([])
    const {items}=useAppSelector((state)=>state.analytics)
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
            const totalAmt=dailyRevenue.reduce((sum,record)=>sum+record.amount,0)
            return {day,totalAmt}
        })
        console.log(chart);
        return chart
    }
    useEffect(()=>{
        
        fetchRevenueData()
    },[items])
   
    
    return (
        <div className="md:w-8/12 w-full h-64 md:h-full border border-gray-200 p-4">
            <header className='mx-auto w-fit font-bold'>Current Week sales</header>
        {chartData&&(
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalAmt" fill="#8884d8" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
  )
}

export default RevenueBarChartDisplay
