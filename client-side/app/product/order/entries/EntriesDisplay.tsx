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
import moment from 'moment'
  
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
    <TableRow className='bg-gradient-to-b from-[#FCF3F3] to-[#CCC9C9] hover:from-[#FCF3F3] hover:to-[#CCC9C9] text-black '>

      <TableHead>Invoice</TableHead>
      <TableHead>Product</TableHead>
      <TableHead>Product Quantity</TableHead>
      <TableHead>Time</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Amount</TableHead>
      <TableHead className="text-right"></TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {entries&&entries.map((entry,idx)=>(
        <TableRow key={idx}>
            <TableCell className=''>{entry.transactionId} </TableCell>
            <TableCell className=''>{entry.productName}</TableCell>
            <TableCell className='mx-auto  w-48 text-center'>{entry.productQuantity}</TableCell>
            <TableCell className=''>{moment.utc(entry.createdAt).fromNow()}</TableCell>
            <TableCell className={`${entry.status=="approved" ?'bg-green-600':'bg-red-500'} text-slate-50`}>{entry.status}</TableCell>
            <TableCell className='text-right '>${entry.productAmount}</TableCell>
            <TableCell className='text-right '>{entry.status=="approved"?"":<Button className='bg-red-600 hover:bg-red-700'>Cancel Order</Button>}</TableCell>
        </TableRow>
    ))}
  </TableBody>
</Table>

    </div>
  )
}

export default EntriesDisplay
