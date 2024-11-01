"use client"
import React, { useEffect } from 'react'
import { Input } from '../../components/ui/input'
import ProductList from './ProductsList/ProductList'
import { useAppSelector } from '../redux/Store'
import { useRouter } from 'next/navigation'
import Chart from '../product/chart/Chart'

const HomeDisplay = () => {
  const {items}=useAppSelector((state)=>state.userDetails)
  
  const router=useRouter()
  const navAction=()=>{
    router.push("/user/profile")
  }
  return (
    <div className='flex flex-col justify-center items-center gap-3'>
       <nav className='absolute md:right-7 right-2 top-1 yatraone text-xl flex gap-4 items-center '>
        <section>
          <Chart/>
        </section>
        <section className='flex gap-2 cursor-pointer hover:bg-slate-300 p-1 rounded-md' onClick={()=>navAction()}>
        <img src={items?.userImage} className='w-8 rounded-full'/>
        <span className='hidden md:flex '> Profile</span>
        </section>
      </nav>
       <header className=' text-3xl font-semibold yatraone'>ShopEase</header>
     
      <section className='md:w-4/12 w-5/6 mb-4'>
        <Input placeholder='Search your product' className=' yatraone '/>
      </section>
        <main>
         
      <ProductList/>
      </main>
    </div>
  )
}

export default HomeDisplay
