"use client"
import React, { useEffect, useState } from 'react'

import ProductList from './ProductsList/ProductList'

import Chart from '../product/chart/Chart'
import HomeOptions from './HomeOptions'
import SearchInput from './SearchInput'
import { GetNotificationPermission } from '../firebase/getPermission'
import { useAppDispatch, useAppSelector } from '../redux/Store'
import { Button } from '@/components/ui/button'
import { IncreaseProductListPage } from '../redux/PageSlice'
import { addAdditionalListData, FetchProductList } from '../redux/ProductDataSplice'
import { FetchAdditionalProductList } from './fetchers'


const HomeDisplay = () => {
    const {items:userDetails}=useAppSelector((state)=>state.userDetails)
    
    const {items:productListPageValue}=useAppSelector((state)=>state.productListPage)
   
    const dispatcher=useAppDispatch()
    useEffect(()=>{
      if(userDetails){
        GetNotificationPermission(userDetails.id,userDetails.username);
      } 
      
    },[userDetails])
  const handleDataLoading=async()=>{
   
     dispatcher(IncreaseProductListPage())
    const dataList= await FetchAdditionalProductList(productListPageValue.page)
    if(dataList.length==0){
      console.log("end to the list...")
      return
    }
    dispatcher(addAdditionalListData(dataList))
  }

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
      <Button onClick={()=>handleDataLoading()}>Load more data..</Button>
      </main>
    </div>
  )
}

export default HomeDisplay
