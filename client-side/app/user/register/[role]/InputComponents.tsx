"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import React, { ChangeEvent, FormEvent, useState } from 'react'

import schema from '@/utils/validator'
import { UserStruct } from '../../userClass/UserStruct'
import { RegisterUser } from './registerAction'
import { useRouter } from 'next/navigation'
import { Select, SelectItem,SelectContent,SelectTrigger,SelectValue } from '@/components/ui/select'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

interface Prop{
    role:string
}
interface FormData {
  email: string
  username: string
  password: string
  confirmPassword:string
  contactNumber: string
  address: string
  postalCode:string
  province:string
}
const provinces = [
  "Koshi",
  "Madhesh",
  "Bagmati",
  "Gandaki",
  "Lumbini",
  "Karnali",
  "Sudurpashchim"
];

const InputComponents:React.FC<Prop> = ({role}) => {
  

    const [formData,setFormData]=useState<FormData>({email:"",username:"",password:"",confirmPassword:"",contactNumber:"",address:"",postalCode:"",province:""})
    const [errors,setErrors]=useState<FormData>({email:"",username:"",password:"",confirmPassword:"",contactNumber:"",address:"",postalCode:"",province:""})
    const [unMatchErrors,setUnMatchErrors]=useState<string>("")
    const [isPassVisible,setIsPassVisible]=useState<boolean>(false)
    const router=useRouter()
    const handleValueChange=(e:ChangeEvent<HTMLInputElement>)=>{
      setFormData({
        ...formData,
        [e.target.name]:e.target.value
      })
    }
    const handleSelectChange=(value:string)=>{
      setFormData({
        ...formData,
        province:value
      })
    }
    const handleSubmitAction=async(e:FormEvent)=>{
      e.preventDefault()

      if(formData.password!==formData.confirmPassword){
        setUnMatchErrors("Password didn't matched")
        setFormData(prevState=>({
          ...prevState,
          confirmPassword:""
        }))
        return
      }

      const result=schema.safeParse({...formData,contactNumber:Number(formData.contactNumber),postalCode:Number(formData.postalCode)})
      const fieldError=result.error?.flatten().fieldErrors;
       console.log('formdata-> ',formData)
      if(result.success){
        setErrors({ email:"",username:"",password:"",confirmPassword:"",contactNumber:"",address:"",postalCode:"",province:""})

        const userDetails=new UserStruct("",formData.email,formData.username,formData.password,"",
          Number(formData.contactNumber),formData.address,Number(formData.postalCode),formData.province,null,null,[]);
        
          await RegisterUser(role,userDetails)
        router.push("/login")

      }else{
        setErrors({
          email:fieldError?.email?fieldError.email[0]:"",
          username:fieldError?.username?fieldError.username[0]:"",
          password:fieldError?.password?fieldError.password[0]:"",
          confirmPassword:fieldError?.password?fieldError.password[0]:"",
          contactNumber:fieldError?.contactNumber?fieldError.contactNumber[0]:"",
          address:fieldError?.address?fieldError.address[0]:"",
          postalCode:fieldError?.postalCode?fieldError.postalCode[0]:"",
          province:fieldError?.province?fieldError.province[0]:""
        })
      }

    }

    const handlePasswordVisibility=()=>{
      setIsPassVisible(!isPassVisible)
    }
  

  return (
   <div className=' flex flex-col justify-center items-center   font-sans'>
    <header className='font-semibold text-3xl flex gap-2 items-center justify-center mr-2 mb-1'>
      {role=="seller"&& <img src='/icons/seller.png' className='w-8'/>}
      <span className='text-slate-300'>   {role.toUpperCase()}</span>
   
      </header>
   <form>
   <div className="md:w-96 w-80 flex flex-col gap-4 justify-center items-center bg-white p-3 rounded-md mx-auto " >
    <label className="w-full">
    <p className='font-semibold'>Email</p>
    <Input name='email' placeholder="Enter your email address " type="email" value={formData.email} onChange={handleValueChange}  />
    {errors.email&&<p className='text-red-500'>{errors.email}</p>}
  </label>
  
  <label className="w-full">
    <p className='font-semibold'>Username</p>
    <Input name='username' placeholder="Enter your username" type="text" value={formData.username} onChange={handleValueChange} />
    {errors.username&&<p className='text-red-500'>{errors.username}</p>}
  </label>
  
  <label className="w-full relative">
    <p className='font-semibold'>Password</p>
    <Input name='password' placeholder="Enter your password" type={isPassVisible?'text':'password'} value={formData.password} onChange={handleValueChange} />
    {errors.password&&<p className='text-red-500'>{errors.password}</p>}
    {isPassVisible? 
    <FaEyeSlash className='absolute right-0 bottom-3 cursor-pointer' onClick={()=>handlePasswordVisibility()}/>
    :<FaEye className='absolute right-0 bottom-3 cursor-pointer' onClick={()=>handlePasswordVisibility()}/>}
  </label>
    
  <label className="w-full">
    <p className='font-semibold'>Confirm password</p>
    <Input name='confirmPassword' placeholder="Enter your password" type="password" value={formData.confirmPassword} onChange={handleValueChange} />
    {errors.password&&<p className='text-red-500'>{errors.password}</p>}
    {unMatchErrors&&<p className='text-red-500'>{unMatchErrors}</p>}
  </label>
  
  <label className="w-full">
    <p className='font-semibold'>Contact Number</p>
    <Input name='contactNumber' placeholder="Enter your contact number" type="number" value={formData.contactNumber} onChange={handleValueChange}/>
    {errors.contactNumber&&<p className='text-red-500'>{errors.contactNumber}</p>}
  </label>
  
  <label className="w-full">
    <p className='font-semibold'>Address</p>
    <Input name='address' placeholder="Enter your address" type="text" value={formData.address} onChange={handleValueChange} />
    {errors.address&&<p className='text-red-500'>{errors.address}</p>}
  </label>
  <label className="w-full">
    <p className='font-semibold'>Postal Code</p>
    <Input name='postalCode' placeholder="Enter your address" type="number" value={formData.postalCode} onChange={handleValueChange} />
    {errors.postalCode&&<p className='text-red-500'>{errors.postalCode}</p>}
  </label>
  <label className="w-full">
    <p className='font-semibold'>Province</p>
    <Select name="province" value={formData.province} onValueChange={handleSelectChange}>
    <SelectTrigger>
      <SelectValue placeholder="select province"/>
    </SelectTrigger>
    <SelectContent>
      {provinces.map((province,idx)=>(
        <SelectItem value={province} key={idx}>{province}</SelectItem>
      ))}
    </SelectContent>
</Select>
    {errors.address&&<p className='text-red-500'>{errors.address}</p>}
  </label>
  <Button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmitAction}>Register</Button>

 
</div>
   </form>


   </div>
  )
}

export default InputComponents
