import React, { useEffect, useState } from 'react'
import { GetCustomerDetails, UpdateOrderStatus } from './fetchers'
import { CustomerStruct } from '../class'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
interface Props{
    customerId:string,
    transactionId:string,
}
const CustomerDisplay:React.FC<Props> = ({customerId,transactionId}) => {
    const [customerDetails,setCustomerDetails]=useState<CustomerStruct|null>(null)
    const fetchCustomerDetails=async()=>{
        const response=await GetCustomerDetails(customerId);
        setCustomerDetails(response)
    }
    useEffect(()=>{
        fetchCustomerDetails()
    },[])
  return (
    <div className='ml-2'>
      {customerDetails &&(
        <>
        <header>{customerDetails.username}</header>
        <main>
            <section>    {customerDetails.email}</section>
            <section>    {customerDetails.contactNumber}</section>
            <section>    {customerDetails.address}</section>
            <Button className='bg-gradient-to-t from-[#4C600B] to-[#FF6363] hover:from[#FF7777] hover:to-[#546617]' size={'sm'} onClick={()=>UpdateOrderStatus(transactionId??"","approved")} ><FaCheck/></Button>
                     <Button className='bg-gradient-to-b from-[#FCA5A5] to-[#F40303] rounded-sm ' size={'sm'} onClick={()=>UpdateOrderStatus(transactionId??"","rejected")}><FaTimes/></Button>
        </main>
        </>
      )}
    </div>
  )
}

export default CustomerDisplay
