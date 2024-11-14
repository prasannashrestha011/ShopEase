"use client"
import React, { ReactNode, useEffect } from 'react'
import { useAppDispatch } from './Store';
import { FetchUserDetails } from './UserDataSplice';
import { FetchProductList } from './ProductDataSplice';
import { onMessage, MessagePayload } from 'firebase/messaging';
import { messaging } from '../firebase/firebase';

const DispatcherProvider = ({children}:{children:ReactNode}) => {
    const dispatch=useAppDispatch();
   
    useEffect(()=>{
      dispatch(FetchUserDetails())
      dispatch(FetchProductList())
      onMessage(messaging,(payload:MessagePayload)=>{
        console.log(payload)
        alert(payload.notification?.body)
      })
    },[])
  return (
    <>
      {children}
    </>
  )
}

export default DispatcherProvider
