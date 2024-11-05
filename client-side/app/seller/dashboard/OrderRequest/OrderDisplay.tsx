
import React, { useEffect, useState } from 'react'
import { GetOrderRequests } from '../fetchers'
import { useAppSelector } from '@/app/redux/Store'
import { TransactionStruct } from '@/app/product/class/transactionClass'

import { Table,TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { FaCheck, FaCross, FaTicketAlt, FaTimes } from 'react-icons/fa'
import { UpdateOrderStatus } from './fetchers'
import CustomerDisplay from './CustomerDisplay'

interface customerActionProp{
    customerId:string,
    transactionId:string
}
const OrderDisplay = () => {
    const {items}=useAppSelector((state)=>state.userDetails)
    const [orderRequests,setOrderRequests]=useState<TransactionStruct[]>([])
    const [error,setError]=useState<string>("")
    const [isCheckDetails,setIsCheckDetails]=useState<boolean>(false)
    const [customerDetails,setCustomderDetails]=useState<customerActionProp>()
    const fetchOrderRequests=async()=>{
        if(items){
            const response=await GetOrderRequests(items?.id);
            response? setOrderRequests(response):setError("failed to fetch details")
        }
    }
   
    const headers=[
        'Invoice',
        'Product',
        'Quantity',
        'Amount',
        'Customer Id',
        ''
    ]
    useEffect(()=>{
        fetchOrderRequests()
    },[])
  return (
    <div className='flex  w-full min-w-0 merriwheather'>

     <Table className=' md:table-fixed w-full'>
        <TableHeader className='cursor-pointer'>
            <TableRow className='bg-gradient-to-b from-[#FCF3F3] to-[#CCC9C9] hover:from-[#FCF3F3] hover:to-[#CCC9C9] text-black '>
             
                {headers.map((header)=>(
                    <TableHead className='text-black truncate font-bold'>{header}</TableHead>
                ))}
               
            </TableRow>
        </TableHeader>
        <TableBody>
        
                {orderRequests&&orderRequests.map((order)=>(
                     <TableRow className='bg-gradient-to-b from-[#FCF3F3] to-[#EBE8E8] hover:from-[#EBE8E8] hover:to-[#CCC9C9] text-black ' >
                    <TableCell className='truncate' >{order.transactionId}</TableCell>
                    <TableCell className='truncate'>{order.productName}</TableCell>
                    <TableCell className='truncate'>{order.productQuantity}</TableCell>
                    <TableCell className='truncate'>${order.productAmount}</TableCell>
                    <TableCell className='truncate'>{order.customerId}</TableCell>
                    <TableCell className='truncate'><span className='underline cursor-pointer' onClick={()=>{setIsCheckDetails(!isCheckDetails);setCustomderDetails({customerId:order.customerId??"", transactionId:order.transactionId??""})}}>Check Details</span></TableCell>
                    </TableRow>
                ))}
           
        </TableBody>
     </Table>

    {isCheckDetails&& customerDetails&&
    <div className='border-2 w-8/12'>
        <CustomerDisplay customerId={customerDetails.customerId} transactionId={customerDetails.transactionId}/>
    </div>}
    </div>
  )
}

export default OrderDisplay
