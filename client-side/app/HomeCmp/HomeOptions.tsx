import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import React from 'react'
import { useAppSelector } from "../redux/Store"
import { useRouter } from "next/navigation"

import { FaUser, FaTruck } from "react-icons/fa"
const HomeOptions = () => {
    const {items}=useAppSelector((state)=>state.userDetails)
    const router=useRouter()
    const redirectToDetails=()=>{
        router.push("/user/profile")
    }
    const redirectToOrderEntries=()=>{
        router.push("/product/order/entries")
    }
  return (

         <Popover >
        <PopoverTrigger><img src={items?.userImage} className="rounded-full w-8" /></PopoverTrigger>
        <PopoverContent className="cursor-pointer   gap-4">
            <div  className=" flex flex-col merriwheather ">
                <span className="cursor-pointer hover:bg-slate-200 p-1 flex gap-1 items-center" onClick={()=>redirectToDetails()}>
                     <FaUser/>
                    <span>Details</span>
                    </span>
                <span className="cursor-pointer hover:bg-slate-200 p-1 flex gap-1 items-center" onClick={()=>redirectToOrderEntries()}>
                    <FaTruck/>
                    Your orders
                </span>
            </div>
         
            </PopoverContent>
        
    </Popover>
 
  )
}

export default HomeOptions
  