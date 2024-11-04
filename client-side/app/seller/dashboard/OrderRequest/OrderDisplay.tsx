import React, { useEffect, useState } from 'react'
import { GetOrderRequests } from '../fetchers'
import { useAppSelector } from '@/app/redux/Store'
import { TransactionStruct } from '@/app/product/class/transactionClass'

import { Table,TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { FaCheck, FaCross, FaTicketAlt, FaTimes } from 'react-icons/fa'


const OrderDisplay = () => {
    const {items}=useAppSelector((state)=>state.userDetails)
    const [orderRequests,setOrderRequests]=useState<TransactionStruct[]>([])
    const [error,setError]=useState<string>("")
    const fetchOrderRequests=async()=>{
        if(items){
            const response=await GetOrderRequests(items?.id);
            response? setOrderRequests(response):setError("failed to fetch details")
        }
    }
    useEffect(()=>{
        fetchOrderRequests()
    },[])
  return (
    <div className='merriwheather'>
     <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Customer name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact Number</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
                {orderRequests.map((order,idx)=>(
                   <>
                    <TableCell>{order.transactionId}</TableCell>
                    <TableCell>{order.productName}</TableCell>
                    <TableCell>{order.productQuantity}</TableCell>
                    <TableCell>${order.productAmount}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.customerEmail}</TableCell>
                    <TableCell>{order.customerContact}</TableCell>
                    <div className='flex gap-4'>
                    <Button className='bg-green-600'><FaCheck/></Button>
                    <Button className='bg-red-600'><FaTimes/></Button>
                    </div>
                   </>
                ))}
            </TableRow>
        </TableBody>
     </Table>
    </div>
  )
}

export default OrderDisplay
