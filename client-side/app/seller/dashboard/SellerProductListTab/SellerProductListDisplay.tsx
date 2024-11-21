import { ProductInfo } from '@/app/product/class/productClass'
import { useAppDispatch, useAppSelector } from '@/app/redux/Store'
import React, { useState } from 'react'


import { Table,TableHead, TableHeader,TableRow } from '@/components/ui/table'
import { TableBody, TableCell } from '@mui/material'
import { SetSelectedProduct } from '@/app/redux/Seller/SelectedProductSplice'
import { Drawer, DrawerTrigger } from '@/components/ui/drawer'
import SelectedProductContain from './SelectedProductContain'
import { ScrollArea } from '@/components/ui/scroll-area'
import RatingDisplay from '../RatingsTab/RatingDisplay'


const SellerProductListDisplay = () => {
    const headers=[
        'product id',
        'product Name',
        'product Price',
        ''
    ]
    const {items:productList}=useAppSelector((state)=>state.sellerProductList)
    
    const dispatcher=useAppDispatch()
    const [selectedIdx,setSelectedIdx]=useState<number|null>(null)
 
    const handleSelectedProduct=(selectedProductDetails:ProductInfo,idx:number)=>{
        dispatcher(SetSelectedProduct({data:selectedProductDetails,idx}))
        setSelectedIdx(idx)
    }
    
  return (
    <div className='flex  items-start justify-center gap-8'>
       <div className='w-7/12 flex flex-col justify-center items-center'>
       <span >Your Products</span>
       <Table className='border'>
          <ScrollArea className='h-96'>
          <TableHeader className='bg-gradient-to-b from-[#FCF3F3] to-[#CCC9C9] hover:from-[#FCF3F3] hover:to-[#CCC9C9] text-black '>
                <TableRow>
                    {headers.map((header,idx)=>(
                        <TableHead key={idx}>{header}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
            {productList&&productList.length>0&&productList.map((product,idx)=>(
                     <TableRow key={idx}>
                        <TableCell>{product.productId}</TableCell>
                        <TableCell>{product.productName}</TableCell>
                        <TableCell>{product.productPrice}</TableCell>
                        <TableCell className='text-right'>
                            <Drawer>
                                <DrawerTrigger onClick={()=>handleSelectedProduct(product,idx)}>See details</DrawerTrigger>
                               {selectedIdx===idx&& <SelectedProductContain/>}
                            </Drawer>
                            </TableCell>
                     </TableRow>
                ))}
               
            </TableBody>
          </ScrollArea>
        </Table>
       </div>
      
        <RatingDisplay />
       
    </div>
  )
}

export default SellerProductListDisplay
