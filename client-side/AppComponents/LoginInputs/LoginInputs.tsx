"use client"
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {  useRouter } from 'next/navigation'
import axios from "axios";

 interface ResponseProp{
    message:string
 }
 interface FormData{
  username:string
  password:string
 }
 



const LoginInputs = () => {
    const [formData,setFormData]=useState<FormData>({username:"",password:""})
    const [responseMessage,setResponseMessage]=useState<ResponseProp | null>(null)
    const [errorMessage,setErrorMessage]=useState<string>("")
    const router=useRouter()
    const handleFormValue=(e:ChangeEvent<HTMLInputElement>)=>{
      setFormData({
        ...formData,
        [e.target.name]:e.target.value
      })
    }
    const handleAuth=async(e:FormEvent)=>{
      e.preventDefault()
      try{
        const response=await axios.post(`http://localhost:8080/account/login`,{
            username:formData.username,
            password:formData.password,
        },{withCredentials:true})
        if(response.status!==200){
            throw new Error("Failed to login , invalid username or password");
        }
        setResponseMessage(response.data)
        window.localStorage.setItem("UUID",formData.username.toString())
   
        router.replace('/')

      }catch( err){
        const errorMessage=err as Error;
        setErrorMessage(errorMessage.message)
        console.log(err)
      }
    }
    
  return (
   
      <form className="flex flex-col gap-4 justify-center items-center  h-full" onSubmit={handleAuth}>
      <Input type="text" name="username" placeholder="Username" className="w-80 " value={formData.username} onChange={handleFormValue}/>
      <Input type="Password" name="password" placeholder="Password" className="w-80 mb-10 " value={formData.password} onChange={handleFormValue}/>
      <Button className="w-72 " type="submit" >Login</Button>
      {responseMessage&& <span className="text-green-500">{responseMessage.message}</span>}
      {errorMessage&& <span className="text-red-500">{errorMessage}</span>}
      </form>
  
  )
}

export default LoginInputs
