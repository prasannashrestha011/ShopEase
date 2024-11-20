import React, { useEffect, useState } from 'react'
import { AddRevenueRecord, GetCustomerDetails, UpdateEntryReadStatus, UpdateOrderStatus } from '../fetchers'
import { CustomerStruct, RevenueStruct } from '../class'

import { useAppDispatch, useAppSelector } from '@/app/redux/Store'


import {

  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,

} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button'
import { UpdateOrderStatusState } from '@/app/redux/OrderRequests/OrderStatusSlice'




const CustomerDisplay:React.FC = () => {

  

  const {items:orderDetails}=useAppSelector((state)=>state.orderDetails)
  const {items:userDetails}=useAppSelector((state)=>state.userDetails)
  const {items:orderRequestStatus}=useAppSelector((state)=>state.orderRequest)

  const dispatch=useAppDispatch()

  const [customerDetails,setCustomerDetails]=useState<CustomerStruct|null>(null)
  const fetchCustomerDetails=async()=>{
    if(orderDetails?.customerId){
      const customerData=await GetCustomerDetails(orderDetails.customerId);
      if(customerData){
        setCustomerDetails(customerData)
      }

    }
  }
  const handleOrderStatus=async(status:string)=>{
    if(orderDetails?.transactionId){

      await UpdateOrderStatus(orderDetails?.transactionId,status)

      if(status=="approved" && userDetails && orderDetails){
        const RevenueDetails=new RevenueStruct("",userDetails.id,orderDetails?.transactionId,orderDetails?.amount,null);
        await AddRevenueRecord(RevenueDetails)
   
      }
      await UpdateEntryReadStatus(orderDetails.transactionId)
      dispatch(UpdateOrderStatusState(status))
      
    }
   
  }

  
 useEffect(()=>{
  fetchCustomerDetails();
  if (orderDetails?.status) {
    console.log(orderDetails.status);
    dispatch(UpdateOrderStatusState(orderDetails.status));
    
  }
 },[orderDetails])

  return (
    <div className='ml-2 h-full merriwheather'>
  
 
  <DrawerContent className='h-5/6'>
  
    <DrawerTitle className='text-2xl font-semibold mx-auto w-fit '>  <span >  New order</span></DrawerTitle>
    <DrawerDescription className='pl-5 flex justify-between'>
      <div className='flex-1 border p-2'>
      <span className='text-2xl underline'>Customer Details</span>
      {customerDetails&&(
        <div className='flex flex-col text-xl'>
          <span>{customerDetails.username}</span>
          <span>{customerDetails.email}</span>
          <span>{customerDetails.contactNumber}</span>
          <br/>
          <span className='text-xl underline'>Address Details</span>
          <span><span className='font-bold'>Province</span> - {customerDetails.province}</span>
          <span><span className='font-bold'>Location</span> - {customerDetails.address}</span>
          <span><span className='font-bold'>Postal Code</span> - {customerDetails.postalCode}</span>
        </div>
      )}
      </div>
      <div className='w-96 border flex flex-col p-2'>
        <span className='text-xl font-bold'>Product Details</span>
        <div className='flex flex-col  text-xl justify-between h-full'>
        <span><span>Status-</span>{orderRequestStatus &&<span>{orderRequestStatus}</span>}</span>
        <span><span>Total Amount-</span>{orderDetails?.amount}</span>
        </div>
      </div>
    </DrawerDescription>
    <DrawerFooter className='flex flex-col items-center justify-center '>
     {orderRequestStatus==="approved" &&<span>Order has been approved</span>}
     {orderRequestStatus==="rejected" && <span>Order has been rejected</span>}
     {orderRequestStatus==="pending"&&<div>
      <Button onClick={()=>handleOrderStatus("approved")} className='w-60 bg-green-600'>Approve</Button>
      <Button onClick={()=>handleOrderStatus("rejected")} className='w-60 bg-red-600'>Reject</Button>
      </div>}
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>


    </div>
  )
}

export default CustomerDisplay


