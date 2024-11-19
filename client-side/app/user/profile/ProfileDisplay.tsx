"use client"
import React from 'react'

import { Input } from '@/components/ui/input'
import {  useAppSelector } from '@/app/redux/Store'


const ProfileDisplay:React.FC = () => {
    const {items}=useAppSelector((state)=>state.userDetails)
    
  return (
    <div className='flex flex-col h-svh merriwheather'>
      <div style={{backgroundColor:"#2D2387"}} className='h-1/3 flex flex-col justify-center items-center'>
        <header className='text-3xl text-slate-100 '>Shop Ease</header>
          <img src={items?.userImage} className='w-40 rounded-full shadow-lg'/>
      </div>
      <div className='flex-1   '>
        <main className=' flex flex-col justify-center items-center border gap-2 w-96 md:w-full mb-4'>
        <header className=' font-semibold '> Credentials</header>
         <section className='flex flex-col  md:w-96 w-80'>
          <label>Email</label>
          <Input className='bg-slate-300 ' value={items?.email}/>
         </section>
         <section className='flex flex-col  md:w-96 w-80 ' >
          <label>Username</label>
          <Input className='bg-slate-300  ' value={items?.username}/>
         </section>
         <section className='flex flex-col  md:w-96 w-80 ' >
          <label>Contact Number</label>
          <Input className='bg-slate-300 ' value={items?.contactNumber}/>
         </section>
         <section className='flex flex-col  md:w-96 w-80 ' >
          <label>Contact Address</label>
          <Input className='bg-slate-300 ' value={items?.address}/>
         </section>
         <section className='flex flex-col  md:w-96 w-80 ' >
          <label>Role</label>
          <span className='bg-slate-300 '>
          <Input className='bg-slate-300 ' value={items?.roles.map((role)=>(role))}/>
           
            </span>
         </section>
        </main>
      </div>
      
    </div>
  )
}

export default ProfileDisplay
