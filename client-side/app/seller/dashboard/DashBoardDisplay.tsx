"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import React, { useEffect } from 'react'
import OrderDisplay from "./OrderRequest/OrderDisplay"
import { useAppDispatch, useAppSelector } from "@/app/redux/Store"
import { FetchOrderRequest } from "@/app/redux/OrderRequestSplice"
import Analytics from "./analytics/Analytics"

const DashBoardDisplay = () => {
    const dispatcher=useAppDispatch();
    const {items}=useAppSelector((state)=>state.userDetails);
    useEffect(()=>{
        dispatcher(FetchOrderRequest(items?.id??""))
    })
  return (
    <div className="merriwheather">
        <Tabs defaultValue="dashboard" className="flex ">
            <TabsList className="flex flex-col items-start justify-start h-screen p-6 border-r-2 border-t-2 border-gray-200 rounded-none ">
                <TabsTrigger value="analytics" className="w-full">analytics</TabsTrigger>
                <TabsTrigger value="orderRequest" className="w-full">Order Request</TabsTrigger>
            </TabsList>
            <TabsContent value="analytics">
                
                <Analytics/>
                </TabsContent>
            <TabsContent value="orderRequest" className="overflow-hidden w-full">
                <OrderDisplay/>
            </TabsContent>
        </Tabs>
    </div>
 
)
}

export default DashBoardDisplay
