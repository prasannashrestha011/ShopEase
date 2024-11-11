
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/redux/Store'
import { Table,TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CustomerDisplay from './CustomerDisplay'
import {Drawer,Box} from '@mui/material'
import { CircleSpinner } from 'react-spinners-kit';
import { OrderDetailsStruct } from '../class'
import { setOrderDetails } from '@/app/redux/OrderDetailSplice'

const OrderDisplay = () => {
  
    const {items : orderRequests,loading}=useAppSelector((state)=>state.orderRequests)
    const dispatch=useAppDispatch()
 

   
    const [isCheckDetails,setIsCheckDetails]=useState<boolean>(false)
    const headers=[
        'Invoice',
        'Product',
        'Quantity',
        'Amount',
        'Customer Id',
        '',
        ''
    ]
    if(loading){
        return(
            <CircleSpinner size={50} color="#00BFFF" />
        )
    }
    const handleOrderDetailsPanel=(customerId:string,transactionId:string,status:string,amount:number)=>{
        setIsCheckDetails(!isCheckDetails)
        dispatch(setOrderDetails({customerId,transactionId,status,amount}))
    }
  return (
    <div className='flex  w-full min-w-0 merriwheather'>

     <Table className=' md:table-fixed w-full'>
        <TableHeader className='cursor-pointer'>
            <TableRow className='bg-gradient-to-b from-[#FCF3F3] to-[#CCC9C9] hover:from-[#FCF3F3] hover:to-[#CCC9C9] text-black '>
             
                {headers.map((header,idx)=>(
                    <TableHead key={idx} className='text-black truncate font-bold'>{header}</TableHead>
                ))}
               
            </TableRow>
        </TableHeader>
        <TableBody>
        
                {orderRequests&&orderRequests.map((order,idx)=>(
                     <TableRow key={idx} className='bg-gradient-to-b border-none  bg-slate-100 hover:from-[#EBE8E8] hover:to-[#CCC9C9] text-black ' >
                    <TableCell className='truncate' >{order.transactionId}</TableCell>
                    <TableCell className='truncate'>{order.productName}</TableCell>
                    <TableCell className='truncate'>{order.productQuantity}</TableCell>
                    <TableCell className='truncate'>${order.productAmount}</TableCell>
                    <TableCell className='truncate'>{order.customerId}</TableCell>
                    <TableCell className='truncate'>
                        {order.isRead?"":<span className='bg-red-700 rounded-md px-4  py-1 text-xs text-slate-100 cursor-pointer'>New</span>}

                        </TableCell>
                    <TableCell className='truncate'>
                    <button onClick={()=>{

                    order&&order.transactionId&&order.customerId? handleOrderDetailsPanel(
                        order.customerId,
                        order.transactionId,
                        order.status,
                        order.productAmount
                    ):""
                    
                    }}>Check</button>
                        <CustomerDisplay isCheckDetails={isCheckDetails} setIsCheckDetails={setIsCheckDetails}/>
                        </TableCell>
                    </TableRow>
                ))}
           
        </TableBody>
     </Table>

    </div>
  )
}

export default OrderDisplay
