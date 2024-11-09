
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/app/redux/Store'
import { Table,TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CustomerDisplay from './CustomerDisplay'

interface customerActionProp{
    customerId:string,
    transactionId:string,
    status:string,
    amount:number
}
const OrderDisplay = () => {
  
    const {items : orderRequests}=useAppSelector((state)=>state.orderRequests)
    const [error,setError]=useState<string>("")
    const [isCheckDetails,setIsCheckDetails]=useState<boolean>(false)
    const [customerDetails,setCustomderDetails]=useState<customerActionProp>()
   
   
    const headers=[
        'Invoice',
        'Product',
        'Quantity',
        'Amount',
        'Customer Id',
        '',
        ''
    ]
  
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
                     <TableRow key={idx} className='bg-gradient-to-b border-none  from-[#FCF3F3] to-[#fff6f6] hover:from-[#EBE8E8] hover:to-[#CCC9C9] text-black ' >
                    <TableCell className='truncate' >{order.transactionId}</TableCell>
                    <TableCell className='truncate'>{order.productName}</TableCell>
                    <TableCell className='truncate'>{order.productQuantity}</TableCell>
                    <TableCell className='truncate'>${order.productAmount}</TableCell>
                    <TableCell className='truncate'>{order.customerId}</TableCell>
                    <TableCell className='truncate'>
                        {order.isRead?"":<span className='bg-blue-700 px-4  py-1 text-xs text-slate-100 cursor-pointer'>New</span>}

                        </TableCell>
                    <TableCell className='truncate'>
                        <button className='bg-gradient-to-b rounded-md p-1   from-[#FCF3F3] to-[#CCC9C9] hover:from-[#EBE8E8] hover:to-[#CCC9C9] text-black ' onClick={()=>{setIsCheckDetails(!isCheckDetails);setCustomderDetails({customerId:order.customerId??"", transactionId:order.transactionId??"",status:order.status,amount:order.productAmount})}}>Check Details</button>
                        </TableCell>
                    </TableRow>
                ))}
           
        </TableBody>
     </Table>

    {isCheckDetails&& customerDetails&&
    <div className='border-2 w-8/12'>
        <CustomerDisplay customerId={customerDetails.customerId} transactionId={customerDetails.transactionId} status={customerDetails.status} amount={customerDetails.amount}/>
    </div>}
    </div>
  )
}

export default OrderDisplay
