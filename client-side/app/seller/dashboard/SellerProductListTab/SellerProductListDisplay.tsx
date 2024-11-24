import { ProductInfo } from '@/app/product/class/productClass'
import { useAppDispatch, useAppSelector } from '@/app/redux/Store'
import React, { useEffect, useRef, useState } from 'react'


import { Table,TableHead, TableHeader,TableRow } from '@/components/ui/table'
import { TableBody, TableCell } from '@mui/material'
import { SetSelectedProduct } from '@/app/redux/Seller/SelectedProductSplice'
import { Drawer, DrawerTrigger } from '@/components/ui/drawer'
import SelectedProductContain from './SelectedProductContain'
import { ScrollArea } from '@/components/ui/scroll-area'

import { GetProductListOfSeller } from '../fetchers'
import { AddFurtherSellerProductList } from '@/app/redux/Seller/SellerProductsSlice'


const SellerProductListDisplay = () => {
    const headers=[
        'product id',
        'product Name',
        'product Price',
        'views',
        ''
    ]
    const loadRef=useRef(null)
    const {items:productList}=useAppSelector((state)=>state.sellerProductList)
    const {items:userDetails}=useAppSelector((state)=>state.userDetails)
    const [pageCount,setPageCount]=useState<number>(0)
    const dispatcher=useAppDispatch()
    const [selectedIdx,setSelectedIdx]=useState<number|null>(null)
 

    //lazyloading
    const observer=new IntersectionObserver(
        (entries:IntersectionObserverEntry[])=>{
           if(entries[0].isIntersecting){
            triggerPageLoad()
           }
        },{
            root:null,
            rootMargin:'0px',
            threshold:1.0
        }
    )
    //
    const handleSelectedProduct=(selectedProductDetails:ProductInfo,idx:number)=>{
        dispatcher(SetSelectedProduct({data:selectedProductDetails,idx}))
        setSelectedIdx(idx)
    }
    const triggerPageLoad=async()=>{
        const nextPageCount = pageCount + 1; // Calculate the next page count
        setPageCount(nextPageCount);
        if(userDetails){
            console.log("...loading")
            const furtherList=await GetProductListOfSeller(userDetails?.id,pageCount)
            dispatcher(AddFurtherSellerProductList(furtherList))
        }
    }
    useEffect(()=>{
        if(loadRef.current){
            observer.observe(loadRef.current)
        }
        return ()=>{
            if(loadRef.current){
                observer.unobserve(loadRef.current)
            }
        }
    },[])
  return (
  
       <div className='w-7/12 flex flex-col justify-center items-center   ml-3'>
       <span >Your Products</span>
       <Table className='border rounded-md '>
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
                        <TableCell>{product.productViews}</TableCell>
                        <TableCell className='text-right'>
                            <Drawer>
                                <DrawerTrigger onClick={()=>handleSelectedProduct(product,idx)} ><span className='underline font-bold'>See details</span></DrawerTrigger>
                               {selectedIdx===idx&& <SelectedProductContain/>}
                            </Drawer>
                            </TableCell>
                     
                     </TableRow>
                ))}
                      <span className='underline' ref={loadRef}>Load more..</span>
            </TableBody>
          </ScrollArea>
          
        </Table>
       </div>
      
    
       
 
  )
}

export default SellerProductListDisplay
