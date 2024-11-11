import React, { useEffect, useState } from 'react'
import { AddRevenueRecord, GetCustomerDetails, UpdateEntryReadStatus, UpdateOrderStatus } from './fetchers'
import { CustomerStruct, RevenueStruct } from '../class'

import { useAppDispatch, useAppSelector } from '@/app/redux/Store'
import { FetchOrderRequest } from '@/app/redux/OrderRequestSplice'

import { Drawer,Box } from '@mui/material'

interface Props{
  isCheckDetails:boolean,
  setIsCheckDetails:(isCheckDetails:boolean)=>void
}
const CustomerDisplay:React.FC<Props> = ({isCheckDetails,setIsCheckDetails}) => {
  const dispatcher=useAppDispatch()

  const {items:orderDetails}=useAppSelector((state)=>state.orderDetails)
  const {items:userDetails}=useAppSelector((state)=>state.userDetails)

  const [customerDetails,setCustomerDetails]=useState<CustomerStruct|null>(null)
  const fetchCustomerDetails=async()=>{
    if(orderDetails?.customerId){
      const customerData=await GetCustomerDetails(orderDetails.customerId);
      customerData!=null?setCustomerDetails(customerData):""

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
      dispatcher(FetchOrderRequest(orderDetails?.transactionId))
      
    }
   
  }
 useEffect(()=>{
  fetchCustomerDetails()
 },[])
  return (
    <div className='ml-2 h-full'>
                        <Drawer
                        anchor='bottom'
                        open={isCheckDetails}
                        onClose={()=>setIsCheckDetails(false)}
                        ModalProps={{
                            BackdropProps: {
                              sx: {
                                backgroundColor: 'transparent', // Set your desired backdrop color and opacity
                              },
                            },
                          }}
                        >
             <Box p={2} height={"480px"} width={400} textAlign={"center"}>
                <div className='flex flex-col gap-2'>
                <span>{orderDetails?.transactionId}</span>
                <span>{customerDetails?.province}</span>
                {orderDetails?.status=="pending"&&<button onClick={()=>handleOrderStatus("approved")}>Approve</button>}
                {orderDetails?.status=="approved"&&<button>Order has been approved</button>}
                {orderDetails?.status=="rejected"&&<button>Order has been rejected</button>}
                </div>
              </Box>               
      </Drawer>
    </div>
  )
}

export default CustomerDisplay
