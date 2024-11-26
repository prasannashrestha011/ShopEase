
import React, {  useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/redux/Store'
import { Table,TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CustomerDisplay from './CustomerDisplay'

import { CircleSpinner } from 'react-spinners-kit';

import { setOrderDetails } from '@/app/redux/OrderDetailSplice'
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';


const OrderDisplay = () => {
  
    const { items: orderRequests, loading } = useAppSelector(
        (state) => state.orderRequests
      );
      const { items: newProductRequests } = useAppSelector(
        (state) => state.liveProductRequest
      );
      const [selectedIdx,setSelectedIdx]=useState<number|null>(null)
    const dispatch=useAppDispatch()
  
    const headers=[
        'Invoice',
        'Product',
        'Quantity',
        'Amount',
        'Customer Id',
        '',
        '',
        ''
    ]
    
    const handleOrderDetailsPanel = (
        customerId: string,
        transactionId: string,
        status: string,
        amount: number
      ) => {
     
        dispatch(setOrderDetails({ customerId, transactionId, status, amount }));
      };
     const handleTriggerAction = (
    customerId: string,
    transactionId: string,
    status: string,
    productAmount: number,
    idx:number
  ) => {
    if (transactionId && customerId) {
      handleOrderDetailsPanel(customerId, transactionId, status, productAmount);
    }
    setSelectedIdx(idx)
  };
  
  useEffect(()=>{
    console.log("Order display",orderRequests)
  },[orderRequests])
  if(loading){
    return(
        <CircleSpinner size={50} color="#00BFFF" />
    )
}
  return (
    <div className='flex  w-screen h-screen min-w-0 merriwheather '>
 
 <Table className=' md:table-fixed w-full'>
        <TableHeader className='cursor-pointer'>
            <TableRow className='bg-gradient-to-b from-[#FCF3F3] to-[#CCC9C9] hover:from-[#FCF3F3] hover:to-[#CCC9C9] text-black '>
             
                {headers.map((header,idx)=>(
                    <TableHead key={idx} className='text-black truncate font-bold'>{header}</TableHead>
                ))}
               
            </TableRow>
        </TableHeader>
        <TableBody>
             {Array.isArray(newProductRequests) && newProductRequests.length>0 &&
              orderRequests!.length>0 && orderRequests![0].sellerId===newProductRequests[0].sellerId&&
              newProductRequests.map((order,idx)=>(
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
                
                    <Drawer>
                    <DrawerTrigger onClick={()=>handleTriggerAction(order.customerId ?? "",
                    order.transactionId ?? "",
                    order.status,
                    order.productAmount,
                    idx
                )}>Check</DrawerTrigger>
                    {idx===selectedIdx&&<CustomerDisplay />}
                    </Drawer>
                </TableCell>
                </TableRow>
              ))
             }

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
                    
                        <Drawer>
                        <DrawerTrigger onClick={()=>handleTriggerAction(order.customerId ?? "",
                        order.transactionId ?? "",
                        order.status,
                        order.productAmount,
                        idx
                    )}>Check</DrawerTrigger>
                      {idx===selectedIdx&&<CustomerDisplay />}
                        </Drawer>
                    </TableCell>
                    </TableRow>
                ))}
           
        </TableBody>
     </Table>

    </div>
  )
}

export default OrderDisplay

