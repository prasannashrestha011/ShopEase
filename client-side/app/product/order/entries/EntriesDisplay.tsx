"use client"
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { GetEntries } from './EntriesActions'
import { useAppSelector } from '@/app/redux/Store'
import { TransactionStruct } from '../../class/transactionClass'
import { Button } from '@/components/ui/button'
  
const EntriesDisplay = () => {
    const {items}=useAppSelector((state)=>state.userDetails);
    const [entries,setEntries]=useState<TransactionStruct[] | null>(null)
    const FetchEntires=async()=>{
        items? console.log(items.id):console.log(null)
        if(items){
       
            const response=await GetEntries(items.id);
            console.log(response);
            response!=null?   setEntries(response):setEntries([])
            return
        }
        console.log("error")
    }
    useEffect(()=>{
        FetchEntires()
    },[items])
  return (
    <div>
      <Table className=' w-0 md:w-full '>

  <TableHeader className='border ' >
    <TableRow className='text-lg '>

      <TableHead>Invoice</TableHead>
      <TableHead>Product</TableHead>
      <TableHead>Product Quantity</TableHead>
      <TableHead>Time</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Amount</TableHead>

    </TableRow>
  </TableHeader>
  <TableBody>
    {entries&&entries.map((entry,idx)=>(
        <TableRow key={idx}>
            <TableCell className='border'>{entry.transactionId} </TableCell>
            <TableCell className='border'>{entry.productName}</TableCell>
            <TableCell className='mx-auto border w-48 text-center'>{entry.productQuantity}</TableCell>
            <TableCell className='border'>{entry.createdAt?.toLocaleString() ?? null}</TableCell>
            <TableCell className='border'>{entry.status}</TableCell>
            <TableCell className='text-right border'>${entry.productAmount}</TableCell>
            <TableCell className='text-right border'><Button className='bg-red-600 hover:bg-red-700'>Cancel Order</Button></TableCell>
        </TableRow>
    ))}
  </TableBody>
</Table>

    </div>
  )
}

export default EntriesDisplay
