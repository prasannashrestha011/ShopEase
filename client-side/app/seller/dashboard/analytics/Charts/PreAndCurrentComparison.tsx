import { useAppSelector } from '@/app/redux/Store'
import React, { useEffect, useState } from 'react'
import { GetPrevAndCurrentWeekRecords } from '../../fetchers'
import {  DailyRevenueStruct, PrevAndCurrentStruct } from '../../class'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'


import { CircleSpinner } from 'react-spinners-kit';
const PreAndCurrentComparison = () => {
    const {items:user,loading}=useAppSelector((state)=>state.userDetails)
    const [chartData,setChartData]=useState<PrevAndCurrentStruct[]>([])
    const FetchRecords=async()=>{
        const datas=user?.id?await GetPrevAndCurrentWeekRecords(user?.id):null
         if(datas){
           const prevWeek=transformData(datas[0].records)
     

           const currentWeek=transformData(datas[1].records)
         
         
           console.log("first week -> ",prevWeek)
           console.log("second week ->",prevWeek)
           
           const prevAncurrentWeek:PrevAndCurrentStruct[]=prevWeek.map((record,idx)=>({
            day:record.day,
            prev:record['Total Revenue'],
            current:currentWeek[idx]['Total Revenue']
           }))
         setChartData(prevAncurrentWeek)
         }

    }
     
    const transformData=(data:DailyRevenueStruct)=>{
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const chartData=daysOfWeek.map((day,idx)=>{
            const totalRevenue=data[idx].reduce((sum,record)=>sum+record.amount,0)
            return {day,"Total Revenue":totalRevenue}
        })
        return chartData
    }
    useEffect(()=>{
        FetchRecords()
    },[user])
    if(loading){
      return(
        <div className='w-7/12 flex justify-center items-center'>
          <CircleSpinner/>
        </div>
      )
     }
  return (
    <div className='border'>
      <header className='font-bold  ml-10 mb-2 mt-2'> Sales: Previous Week vs Current Week</header>
      <LineChart width={660} height={300} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray={"3 3"}/>
      <XAxis dataKey={"day"}/>
      <YAxis/>
      <Tooltip/>
      <Legend/>
      <Line type={"monotone"} dataKey={"prev"} stroke="#FA2339"/>
      <Line type={"monotone"} dataKey={"current"} stroke="#3223FA"/>
      </LineChart>
    </div>
  )
}

export default PreAndCurrentComparison
