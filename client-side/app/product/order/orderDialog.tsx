import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useAppSelector } from '@/app/redux/Store'
import { OrderAction } from './orderAction'
import { TransactionStruct } from '../class/transactionClass'
  interface Props{
    productName:string,
    price:number,
    sellerId:string
  }
  
const OrderDialog = ({productName,price,sellerId}:Props) => {
    const [quantityValue,setQuantityValue]=useState<number>(0);
    const [totalAmt,setTotalAmt]=useState<number>(0);
    const {items}=useAppSelector((state)=>state.userDetails)
    const handleOrderConfirmation=async(sellerId:string)=>{
      if(items){
        const transactionDetails=new TransactionStruct(null,sellerId,items.id,items?.username,items?.contactNumber,
          quantityValue,totalAmt,null,null,"pending"
        )
        const response=await OrderAction(transactionDetails);
        console.log(response)
      }
    }
    useEffect(()=>{
      setTotalAmt(price*quantityValue)
    },[quantityValue,price])
  return (

      <Dialog>
  <DialogTrigger ><Button className='bg-orange-500 hover:bg-orange-600'>Order now</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Order confirmation</DialogTitle>
      <DialogDescription className='flex flex-col gap-2'>
        <p>{productName}</p>
     
        <p className='flex flex-col gap-2'>
            <header>Quantity</header>
        <Slider min={0} max={100} value={[quantityValue]} onValueChange={(e)=>{
          if(e.length>0){
           setQuantityValue(e[0])
          }

        }} />
        </p>
       <p>
       
       </p>
        <p>{quantityValue}</p>
        <br/>
        <p className='mb-8'>Total: ${totalAmt}</p>
        <p><Button className='bg-orange-500' onClick={()=>handleOrderConfirmation(sellerId)}>Confirm Order</Button></p>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

 
  )
}

export default OrderDialog
