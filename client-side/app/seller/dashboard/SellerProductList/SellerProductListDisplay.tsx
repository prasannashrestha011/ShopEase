import { ProductStruct } from '@/app/product/class/productClass'
import { useAppSelector } from '@/app/redux/Store'
import React, { useEffect, useState } from 'react'
import { GetProductListOfSeller } from '../fetchers'

const SellerProductListDisplay = () => {
    const [productList,setProductList]=useState<ProductStruct[]>([])
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
      <ul>
      {productList&&productList.length>0&&productList.map((product,idx)=>(
        <li key={idx}>
            {product.productName}
        </li>
      ))}
      </ul>
    </div>
  )
}

export default SellerProductListDisplay
