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
      <div className="flex flex-col gap-4">
      <Card className="shadow-md bg-blue-600 flex flex-col gap-4 text-slate-100 ">
       <CardHeader>
        
       <CardTitle>Login</CardTitle>
       </CardHeader>
      
			<CardContent className="flex flex-col gap-2">
      <Input type="text" name="username"  placeholder="Username" className="w-80 " value={formData.username} onChange={handleFormValue}/>
      <Input type="Password" name="password" placeholder="Password" className="w-80 mb-10 " value={formData.password} onChange={handleFormValue}/>
      </CardContent>
     <CardFooter className="flex flex-col gap-2">
     <p className="w-full">   <a href="/user/register">Register account</a></p>
      <Button className="w-72 " type="submit" >Login</Button>
      {responseMessage&& <span className="text-green-500">{responseMessage.message}</span>}
      {errorMessage&& <span className="text-red-500">{errorMessage}</span>}
     </CardFooter>
      </Card>
      </div>
	        </form>  	
  )
}

export default LoginInputs
