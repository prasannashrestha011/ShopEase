"use client"
import React, { useEffect } from 'react'
import { Input } from '../../components/ui/input'
import ProductList from './ProductsList/ProductList'

import { useRouter } from 'next/navigation'
import Chart from '../product/chart/Chart'
import HomeOptions from './HomeOptions'
import SearchInput from './SearchInput'
import { GetNotificationPermission } from '../firebase/getPermission'
import { useAppSelector } from '../redux/Store'

const HomeDisplay = () => {
    const {items:userDetails}=useAppSelector((state)=>state.userDetails)
    useEffect(()=>{
      if(userDetails){
        GetNotificationPermission(userDetails.username);
      }
    },[userDetails])
  
  return (
    <div className='flex flex-col justify-center items-center gap-3'>
       <nav className='absolute md:right-7 right-2 top-1 yatraone text-xl flex gap-4 items-center '>
        <section>
          <Chart/>
        </section>
        <section className='flex gap-2 cursor-pointer hover:bg-slate-300 p-1 rounded-md' >
          <HomeOptions/>
        </section>
      </nav>
       <header className=' text-3xl font-semibold yatraone'>ShopEase</header>
     
      <section className='md:w-4/12 w-5/6 mb-4'>
       <SearchInput/>
      </section>
      
        <main>
         
      <ProductList/>
      </main>
    </div>
  )
}

export default HomeDisplay
