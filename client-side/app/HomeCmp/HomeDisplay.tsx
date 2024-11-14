"use client"
import React, { useEffect } from 'react'

import ProductList from './ProductsList/ProductList'

import Chart from '../product/chart/Chart'
import HomeOptions from './HomeOptions'
import SearchInput from './SearchInput'
import { GetNotificationPermission } from '../firebase/getPermission'
import { useAppSelector } from '../redux/Store'


const HomeDisplay = () => {
    const {items:userDetails}=useAppSelector((state)=>state.userDetails)
    useEffect(()=>{
      if(userDetails){
        GetNotificationPermission(userDetails.id,userDetails.username);
      }
      
    },[userDetails])
  
  return (
    <div className='  flex flex-col justify-center items-center gap-3  ' >
      
      <div className='w-full  flex flex-col items-center justify-center  bg-blue-700 h-32'>
      <nav className='absolute md:right-7 right-2 top-1 yatraone text-xl flex gap-4 items-center '>
        <section>
          <Chart/>
        </section>
        <section className='flex gap-2 cursor-pointer hover:bg-slate-300 p-1 rounded-md' >
          <HomeOptions/>
        </section>
      </nav>
       <header className=' text-3xl  yatraone text-slate-50'>
        ShopEase
        
       </header>
  
      <section className='md:w-4/12 w-5/6 mb-4'>
       <SearchInput/>
      </section>
      </div>
      
        <main  >
         
      <ProductList/>
      </main>
    </div>
  )
}

export default HomeDisplay
