import React from 'react'
import RecentSalesDisplay from './RecentSalesDisplay'
import RevenueBarChartDisplay from './RevenueBarChartDisplay'

const Analytics = () => {
  return (
    <div className='flex flex-col md:flex-row  '>
      <RevenueBarChartDisplay/>
      <RecentSalesDisplay/>    
    </div>
  )
}

export default Analytics
