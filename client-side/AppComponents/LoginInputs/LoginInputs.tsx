"use client"
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {  useRouter } from 'next/navigation'
import axios from "axios";
import { Card, CardContent, CardFooter,CardHeader, CardTitle } from "@/components/ui/card";


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
      if(!formData.username || !formData.password) return
      try{
        const response=await axios.post(`https://shopease-nxe0.onrender.com/account/login`,{
            username:formData.username,
            password:formData.password,
        },{withCredentials:true})
        if(response.status!==200){
            throw new Error("Failed to login , invalid username or password");
        }
        setResponseMessage(response.data.id)
        console.log(response.data)
        console.log("Cookies Set by Server:", response.headers['set-cookie']);
        window.localStorage.setItem("UUID",response.data.id??"")
   
        router.replace('/')

 
      }catch( err){
        const errorMessage=err as Error;
        setErrorMessage(errorMessage.message)
        console.log(err)
      }
    }
    
  return (
   
      <form className="h-full font-sans" onSubmit={handleAuth}>
      
      <Card className="shadow-md  border-none flex flex-col gap-4 h-full rounded-none  bg-gradient-to-b from-[#3f3dbe] to-[#2a23f0] text-slate-100   ">
       <CardHeader>
        
       <CardTitle>Login</CardTitle>
       </CardHeader>
      
			<CardContent className="flex flex-col gap-2 ">

      <Input type="text" name="username"  
       placeholder="Username" className="w-80 bg-neutral-500 text-black" 
      value={formData.username} onChange={handleFormValue}/>
      <Input type="Password" name="password" placeholder="Password" className="w-80 mb-10 text-black " value={formData.password} onChange={handleFormValue}/>
      </CardContent>
     <CardFooter className="flex flex-col gap-2">
     <p className="w-full">   <a href="/user/register">Register account</a></p>
      <Button className="w-72 bg-orange-500 hover:bg-orange-600 text-slate-300"   type="submit" >Login</Button>
      {responseMessage&& <span className="text-green-500">{responseMessage.message}</span>}
      {errorMessage&& <span className="text-red-500">{errorMessage}</span>}
     </CardFooter>
      </Card>
     
	        </form>  	
  )
}

export default LoginInputs
