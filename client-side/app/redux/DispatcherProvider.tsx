"use client"
import React, { ReactNode, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './Store';
import { FetchUserDetails } from './UserDataSplice';
import { FetchProductList } from './ProductDataSplice';
import { onMessage, MessagePayload } from 'firebase/messaging';
import { messaging } from '../firebase/firebase';
import WebSocketService from '../WebSocketService/WebSocketService';
import { FetchProductCharts } from './ChartDataSplice';


const DispatcherProvider = ({children}:{children:ReactNode}) => {
    const dispatch=useAppDispatch();
    const {items:productListPageValue}=useAppSelector((state)=>state.productListPage)

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
      dispatch(FetchProductList(productListPageValue.page))
      
     
        dispatch(FetchProductCharts(window.localStorage.getItem("UUID")??""))
      
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
