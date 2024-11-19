import { ProductInfo, ProductStruct } from '@/app/product/class/productClass'
import { useAppSelector } from '@/app/redux/Store'
import React, { useEffect, useState } from 'react'
import { GetProductListOfSeller } from '../fetchers'

import { Table,TableHead, TableHeader,TableRow } from '@/components/ui/table'
import { TableBody, TableCell } from '@mui/material'


const SellerProductListDisplay = () => {
    const headers=[
        'product id',
        'product Name',
        'product Price',
        ''
    ]
    const [productList,setProductList]=useState<ProductInfo[]>([])
    const {items:userDetails}=useAppSelector((state)=>state.userDetails)
    const fetchProductList=async()=>{
        if(!userDetails) return 
        const list=await GetProductListOfSeller(userDetails.id)
        setProductList(list)
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
                        <TableCell className='text-right'><span className='text-xs'>See Details</span></TableCell>
                     </TableRow>
                ))}
               
            </TableBody>
        </Table>
    </div>
  )
}

export default SellerProductListDisplay
