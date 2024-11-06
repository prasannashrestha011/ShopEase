"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const RegisterOptions = () => {
    const router=useRouter();
    const handleRegisterOption=(role:string)=>{
        router.push(`register/${role}`)
    }
  return (
    <div>
      <Button onClick={()=>handleRegisterOption("user")}>User Login</Button>
      <Button onClick={()=>handleRegisterOption("seller")}>Seller Login</Button>
    </div>
  )
}

export default RegisterOptions
