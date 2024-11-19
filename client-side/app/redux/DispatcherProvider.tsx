"use client"
import React, { ReactNode, useEffect } from 'react'
import { useAppDispatch } from './Store';
import { FetchUserDetails } from './UserDataSplice';
import { FetchProductList } from './ProductDataSplice';
import { onMessage, MessagePayload } from 'firebase/messaging';
import { messaging } from '../firebase/firebase';
import WebSocketService from '../WebSocketService/WebSocketService';


const DispatcherProvider = ({children}:{children:ReactNode}) => {
    const dispatch=useAppDispatch();
    const GetLiveRequest=async()=>{
      console.log("Connecting..."); // Log before attempting to connect
      try {
         await WebSocketService.connect(dispatch);
      } catch (error) {
          console.error("Connection error:", error); // Log any connection errors
      }
   }
    useEffect(()=>{
      GetLiveRequest()
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
