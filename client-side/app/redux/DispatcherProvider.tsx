"use client"
import React, { ReactNode, useEffect } from 'react'
import { useAppDispatch } from './Store';
import { FetchUserDetails } from './UserDataSplice';
import { FetchProductList } from './ProductDataSplice';

const DispatcherProvider = ({children}:{children:ReactNode}) => {
    const dispatch=useAppDispatch();
    const setTime=new Date()
    useEffect(()=>{
      dispatch(FetchUserDetails())
      dispatch(FetchProductList())
      window.localStorage.setItem("userLastOnline",setTime.toISOString())
    },[])
  return (
    <>
      {children}
    </>
  )
}

export default DispatcherProvider
