"use client"
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import schema from '@/utils/validator'
import { UserStruct } from '../../userClass/UserStruct'
import { RegisterUser } from './registerAction'
import { useRouter } from 'next/navigation'
interface Prop{
    role:string
}
interface FormData {
  email: string
  username: string
  password: string
  contactNumber: string
  address: string
}
const InputComponents:React.FC<Prop> = ({role}) => {
  

    const [formData,setFormData]=useState<FormData>({email:"",username:"",password:"",contactNumber:"",address:""})
    const [errors,setErrors]=useState<FormData>({email:"",username:"",password:"",contactNumber:"",address:""})
    const router=useRouter()
    const handleValueChange=(e:ChangeEvent<HTMLInputElement>)=>{
      setFormData({
        ...formData,
        [e.target.name]:e.target.value
      })
    }

    const handleSubmitAction=async(e:FormEvent)=>{
      e.preventDefault()
      const result=schema.safeParse({...formData,contactNumber:Number(formData.contactNumber)})
      const fieldError=result.error?.flatten().fieldErrors;
      if(result.success){
        setErrors({ email:"",username:"",password:"",contactNumber:"",address:""})
        const userDetails=new UserStruct("",formData.email,formData.username,formData.password,Number(formData.contactNumber),formData.address,null);
        const response=await RegisterUser(role,userDetails)
        router.push("/login")
      }else{
        setErrors({
          email:fieldError?.email?fieldError.email[0]:"",
          username:fieldError?.username?fieldError.username[0]:"",
          password:fieldError?.password?fieldError.password[0]:"",
          contactNumber:fieldError?.contactNumber?fieldError.contactNumber[0]:"",
          address:fieldError?.address?fieldError.address[0]:""
        })
      }

    }

  

  return (
   <div className=' flex flex-col justify-center items-center'>
    <header className='font-semibold text-3xl'>{role.toUpperCase()}</header>
   <form>
   <div className="md:w-96 w-80 flex flex-col gap-4 justify-center items-center mx-auto mt-10">
    <label className="w-full">
    <p>Email</p>
    <Input name='email' placeholder="Enter your email address " type="email" value={formData.email} onChange={handleValueChange}  />
    {errors.email&&<p className='text-red-500'>{errors.email}</p>}
  </label>
  
  <label className="w-full">
    <p>Username</p>
    <Input name='username' placeholder="Enter your username" type="text" value={formData.username} onChange={handleValueChange} />
    {errors.username&&<p className='text-red-500'>{errors.username}</p>}
  </label>
  
  <label className="w-full">
    <p>Password</p>
    <Input name='password' placeholder="Enter your password" type="password" value={formData.password} onChange={handleValueChange} />
    {errors.password&&<p className='text-red-500'>{errors.password}</p>}
  </label>
  
  <label className="w-full">
    <p>Contact Number</p>
    <Input name='contactNumber' placeholder="Enter your contact number" type="number" value={formData.contactNumber} onChange={handleValueChange}/>
    {errors.contactNumber&&<p className='text-red-500'>{errors.contactNumber}</p>}
  </label>
  
  <label className="w-full">
    <p>Address</p>
    <Input name='address' placeholder="Enter your address" type="text" value={formData.address} onChange={handleValueChange} />
    {errors.address&&<p className='text-red-500'>{errors.address}</p>}
  </label>
  
  <Button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmitAction}>Register</Button>
    <br/>
 
</div>
   </form>


   </div>
  )
}

export default InputComponents
