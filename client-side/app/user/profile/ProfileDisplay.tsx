"use client"
import React, { useEffect, useState } from 'react'
import { UserStruct } from '../userClass/UserStruct'
import { GetUserDetails } from './getUserDetails'
import { Input } from '@/Components/ui/input'

const ProfileDisplay:React.FC = () => {
    const [userDetails,setUserDetails]=useState<UserStruct|null>(null)
    const fetchUserDetails=async()=>{
        const username=window.localStorage.getItem("UUID");
        if(username!=null){
            try{
                const response=await GetUserDetails(username)
                if(response==null) throw new Error("failed to fetch the data")
                    setUserDetails(response)
            }catch(err){
                console.error(err)
            }
        }
    }
    useEffect(()=>{fetchUserDetails()},[])
  return (
    <div className='flex flex-col h-svh'>
      <div style={{backgroundColor:"#2D2387"}} className='h-1/3 flex flex-col justify-center items-center'>
        <header className='text-3xl text-slate-100 gemunu'>Shop Ease</header>
          <img src={userDetails?.userImage} className='w-40 rounded-full shadow-lg'/>
      </div>
      <div className='flex-1  gemunuMd text-2xl'>
        <main className=' flex flex-col justify-center items-center border gap-2 w-96 md:w-full mb-4'>
        <header className=' font-semibold '> Credentials</header>
         <section className='flex flex-col  md:w-96 w-80'>
          <label>Email</label>
          <Input className='bg-slate-300' value={userDetails?.email}/>
         </section>
         <section className='flex flex-col  md:w-96 w-80 ' >
          <label>Username</label>
          <Input className='bg-slate-300' value={userDetails?.username}/>
         </section>
         <section className='flex flex-col  md:w-96 w-80 ' >
          <label>Contact Number</label>
          <Input className='bg-slate-300' value={userDetails?.contactNumber}/>
         </section>
         <section className='flex flex-col  md:w-96 w-80 ' >
          <label>Contact Address</label>
          <Input className='bg-slate-300' value={userDetails?.address}/>
         </section>
         <section className='flex flex-col  md:w-96 w-80 ' >
          <label>Role</label>
          <span className='bg-slate-300 '>
          <Input className='bg-slate-300' value={userDetails?.roles.map((role)=>(role))}/>
           
            </span>
         </section>
        </main>
      </div>
      
    </div>
  )
}

export default ProfileDisplay
