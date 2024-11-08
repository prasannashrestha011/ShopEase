"use client"
import React, { ReactNode, useEffect } from 'react'
import { useAppDispatch } from './Store';
import { FetchUserDetails } from './UserDataSplice';
import { FetchProductList } from './ProductDataSplice';

const DispatcherProvider = ({children}:{children:ReactNode}) => {
    const dispatch=useAppDispatch();
   
    useEffect(()=>{
      dispatch(FetchUserDetails())
      dispatch(FetchProductList())
  
    },[])
  return (
    <>
      {children}
    </>
  )
}

export default DispatcherProvider
