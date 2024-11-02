"use client"
import React, { ChangeEvent, useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {  useRouter } from 'next/navigation'
import axios from "axios";

 interface ResponseProp{
    message:string
 }
const LoginInputs = () => {
    const [username,setUsername]=useState<string>("")
    const [password,setPassword]=useState<string>("")
    const [responseMessage,setResponseMessage]=useState<ResponseProp | null>(null)
    const [errorMessage,setErrorMessage]=useState<string>("")
    const router=useRouter()
    const handleUsername=(e:ChangeEvent<HTMLInputElement>)=>{
        setUsername(e.target.value)
     }
     const handlePassword=(e:ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value)
     }
    const handleAuth=async()=>{
      try{
        const response=await axios.post(`http://localhost:8080/account/login`,{
            username:username,
            password:password,
        },{withCredentials:true})
        if(response.status!==200){
            throw new Error("Failed to login , invalid username or password");
        }
        setResponseMessage(response.data)
        window.localStorage.setItem("UUID",username.toString())
   
        router.replace('/')
    
      }catch( err){
        const errorMessage=err as Error;
        setErrorMessage(errorMessage.message)
        console.log(err)
      }
    }
    
  return (
    <div className="flex flex-col gap-4 justify-center items-center  h-full">
      <Input type="Username" placeholder="Username" className="w-80 " value={username} onChange={handleUsername}/>
      <Input type="Password" placeholder="Password" className="w-80 mb-10 " value={password} onChange={handlePassword}/>
      <Button className="w-72 " onClick={()=>handleAuth()}>Login</Button>
      {responseMessage&& <span className="text-green-500">{responseMessage.message}</span>}
      {errorMessage&& <span className="text-red-500">{errorMessage}</span>}
    </div>
  )
}

export default LoginInputs
