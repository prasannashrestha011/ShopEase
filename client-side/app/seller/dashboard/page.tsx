import React from 'react'
import DashBoardDisplay from './DashBoardDisplay'

const page = () => {
  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <header className='font-semibold merriwheather text-2xl mx-auto'>Dashboard</header>
      <DashBoardDisplay/>
    </div>
  )
}

export default page
