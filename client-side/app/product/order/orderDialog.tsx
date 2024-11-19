import React, { ChangeEvent, useEffect, useState } from 'react'
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
import {  useAppSelector } from '@/app/redux/Store'
import { OrderAction } from './orderAction'
import { TransactionStruct } from '../class/transactionClass'
import confetti from 'canvas-confetti';
import { GetFcmToken, SendNotification } from '@/app/firebase/fetchers'
import { NotificationBody } from '@/app/firebase/types'
import WebSocketService from '@/app/WebSocketService/WebSocketService'
import { Generate16CharId } from '@/app/AppUtils/IdGenerator'


  interface Props{
    productName:string,
    price:number,
    sellerId:string,

  }
 
const OrderDialog = ({productName,price,sellerId}:Props) => {
    const [quantityValue,setQuantityValue]=useState<number>(1);
    const [totalAmt,setTotalAmt]=useState<number>(0);
    const [deliveryType,setDeliveryType]=useState<string>("cashOnDelivery")
    const [isOrderSucess,setIsOrderSuccess]=useState<boolean>(false)
    const {items}=useAppSelector((state)=>state.userDetails)
          
    const [sellerFcmToken,setSellerFcmToken]=useState<string>("")

    const handleOrderConfirmation=async(sellerId:string)=>{

      if(items){
        const transactionId=Generate16CharId()
        const transactionDetails=new TransactionStruct(transactionId,sellerId,items.id,items?.username,items?.contactNumber,items.email,
          productName,quantityValue,totalAmt,null,null,false,"pending",deliveryType
        )
        const response=await OrderAction(transactionDetails);
        setIsOrderSuccess(true)
        WebSocketService.addProductRequest(transactionDetails)
        confetti({
          particleCount: 150, 
          spread: 170,        
          origin: { y: 0.6 }, 
          startVelocity: 60,  
        });
        console.log(response)
        const sellerNotification=new NotificationBody(sellerFcmToken,"New Order Request",`New order request of ${productName}, check out your dashboard`)
        console.log(sellerNotification)
        await SendNotification(sellerNotification);
      }
    }
    const fetchSellerFcmToken=async()=>{
      if(sellerId){
        const token=await GetFcmToken(sellerId);
        setSellerFcmToken(token)
      }
    }
  
    useEffect(()=>{
      setTotalAmt(price*quantityValue)
      fetchSellerFcmToken()
    
    },[quantityValue,price])

  return (

      <Dialog>
       
  <DialogTrigger >
    {isOrderSucess?(
      <div>
        <Button className='bg-gray-500'>Pending...</Button>
      </div>
    ):(
     <div>
       <Button className='bg-orange-500 hover:bg-orange-600'>Order now</Button>
      </div>
    )}
  </DialogTrigger>
  <DialogContent>
    {isOrderSucess?(
      <div className='flex justify-center items-center gap-2 yatraone text-green-600'>
         <img src="/icons/sucess.png" alt='sucess' className='w-10'/>
         <span>Product on the way! 🎉 Track it in your orders!</span>
      </div>
    ):(
      <DialogHeader>
      <DialogTitle>Order confirmation</DialogTitle>
      <DialogDescription className='flex flex-col gap-2'>
  <div>{productName}</div>
  
  <div className='flex flex-col gap-2'>
    <div>Quantity</div>
    <Slider min={1} max={100} value={[quantityValue]} onValueChange={(e) => {
      if (e.length > 0) {
        setQuantityValue(e[0])
      }
    }} />
  </div>

  <div>{quantityValue}</div>
  <div>
    <select value={deliveryType} onChange={(e: ChangeEvent<HTMLSelectElement>) => { setDeliveryType(e.target.value) }}>
      <option value={"cashOnDelivery"}>Cash on Delivery</option>
      <option value={"Esewa"}>Esewa</option>
      <option value={"Khalti"}>Khalti</option>
    </select>
  </div>
  <br />
  <div className='mb-8'>Total: ${totalAmt}</div>
  <div>
    <Button className='bg-orange-500' onClick={() => handleOrderConfirmation(sellerId)}>Confirm Order</Button>
  </div>
</DialogDescription>

    </DialogHeader>
    )}
  </DialogContent>
</Dialog>

 
  )
}

export default OrderDialog
