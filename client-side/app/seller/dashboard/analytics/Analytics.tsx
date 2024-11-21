import React from 'react'
import RecentSalesDisplay from './RecentSalesDisplay'
import RevenueBarChartDisplay from './Charts/RevenueBarChartDisplay'
import OverViewDisplay from './OverViewDisplay'
import PreAndCurrentComparison from './Charts/PreAndCurrentComparison'

const Analytics = () => {
  return (
    <div className='flex flex-col  gap-4 ml-2 '>
      <OverViewDisplay/>
        

      <div className='flex gap-2 flex-col md:flex-row'>
    
        <RevenueBarChartDisplay/>
        <RecentSalesDisplay/>    
   
       
      </div> 
      <PreAndCurrentComparison/> 
    </div>
  )
}

export default Analytics
