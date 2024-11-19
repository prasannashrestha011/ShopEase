import { ProductInfo, ProductStruct } from '@/app/product/class/productClass'
import { useAppDispatch, useAppSelector } from '@/app/redux/Store'
import React, { useEffect, useState } from 'react'
import { GetProductListOfSeller } from '../fetchers'

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
    const [productList,setProductList]=useState<ProductInfo[]>([])
    const {items:userDetails}=useAppSelector((state)=>state.userDetails)
    const dispatcher=useAppDispatch()
    const [selectedIdx,setSelectedIdx]=useState<number|null>(null)
    const fetchProductList=async()=>{
        if(!userDetails) return 
        const list=await GetProductListOfSeller(userDetails.id)
        setProductList(list)
    }
    const handleSelectedProduct=(selectedProductDetails:ProductInfo,idx:number)=>{
        dispatcher(SetSelectedProduct(selectedProductDetails))
        setSelectedIdx(idx)
    }
    useEffect(()=>{
        fetchProductList()
    },[userDetails])
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
            {productList.map((product,idx)=>(
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
