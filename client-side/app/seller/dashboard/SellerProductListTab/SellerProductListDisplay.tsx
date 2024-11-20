import { ProductInfo } from '@/app/product/class/productClass'
import { useAppDispatch, useAppSelector } from '@/app/redux/Store'
import React, { useState } from 'react'


import { Table,TableHead, TableHeader,TableRow } from '@/components/ui/table'
import { TableBody, TableCell } from '@mui/material'
import { SetSelectedProduct } from '@/app/redux/Seller/SelectedProductSplice'
import { Drawer, DrawerTrigger } from '@/components/ui/drawer'
import SelectedProductContain from './SelectedProductContain'


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
    <div>
        <Table>
            <TableHeader>
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
        </Table>
    </div>
  )
}

export default SellerProductListDisplay
