import React, { useEffect, useState } from 'react'
import { GetCustomerDetails, UpdateEntryReadStatus, UpdateOrderStatus } from './fetchers'
import { CustomerStruct } from '../class'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/app/redux/Store'
import { FetchOrderRequest } from '@/app/redux/OrderRequestSplice'
interface Props{
    customerId:string,
    transactionId:string,
    status:string,
 
}
const CustomerDisplay:React.FC<Props> = ({customerId,transactionId,status}) => {
    const [customerDetails,setCustomerDetails]=useState<CustomerStruct|null>(null)
    
    const [orderStatus,setOrderStatus]=useState<string>(status??"pending")
    const fetchCustomerDetails=async()=>{
        const response=await GetCustomerDetails(customerId);
        setCustomerDetails(response)
    }
    const handleOrderStatus=async(transactionId:string,status:string)=>{
      await UpdateOrderStatus(transactionId,status);
      setOrderStatus(status)
    }
    useEffect(()=>{
        UpdateEntryReadStatus(transactionId)
        fetchCustomerDetails()
    },[status])
  return (
    <div className='ml-2 h-full'>
      {customerDetails &&(
        <div className=' h-full flex flex-col justify-between'>
        <header className='mt-2 ml-2'>{customerDetails.username}</header>
        <main className='flex flex-col gap-2 justify-between '>
            <main>
              <header className='mb-2'>Details:</header>
            <section> Email-   {customerDetails.email}</section>
            <section> Phone number-   {customerDetails.contactNumber}</section>
            <section> Full Address-   {customerDetails.address}</section>
            </main>
          
        </main>
        <footer>
        <section className='ml-4 mb-4 '> 
          {orderStatus=="pending" &&(
            <>
            <Button className='bg-gradient-to-t from-[#4C600B] to-[#FF6363] hover:from[#FF7777] hover:to-[#546617]' size={'sm'} onClick={()=>handleOrderStatus(transactionId??"","approved")} ><FaCheck/></Button>
            <Button className='bg-gradient-to-b from-[#FCA5A5] to-[#F40303] rounded-sm ' size={'sm'} onClick={()=>handleOrderStatus(transactionId??"","rejected")}><FaTimes/></Button>
          </>
          )}
            {orderStatus=="approved"&&(
              <button className='bg-green-500 p-2 cursor-pointer text-slate-200 active:scale-90 border-r-2 border-b-2 border-green-800 '>Approved</button>
            )}
            {
              orderStatus=="rejected"&&(
                <button className='bg-red-500 p-2 cursor-pointer text-slate-200 active:scale-90 border-r-2 border-b-2 border-red-800 '>Rejected</button>
              )
            }
           </section>
        </footer>
        </div>
      )}
    </div>
  )
}

export default CustomerDisplay
