"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import React, { useEffect } from 'react'
import OrderDisplay from "./OrderRequest/OrderDisplay"
import { useAppDispatch, useAppSelector } from "@/app/redux/Store"
import { FetchOrderRequest } from "@/app/redux/OrderRequestSplice"
import Analytics from "./analytics/Analytics"
import { FetchAnalyticData } from "@/app/redux/AnalyticsSplice"
import { FaChartLine, FaShoppingCart } from "react-icons/fa"

const DashBoardDisplay = () => {
    const dispatcher=useAppDispatch();
    const {items}=useAppSelector((state)=>state.userDetails);
   
    useEffect(()=>{
        if(items){
   
            dispatcher(FetchOrderRequest(items?.id))
            dispatcher(FetchAnalyticData(items.id))
        }
    },[items])
   
  return (
    <div className="merriwheather md:overflow-hidden">
        <Tabs defaultValue="analytics" className="flex ">
            <TabsList className="flex flex-col items-start justify-start h-screen p-6 border-r-2 border-t-2 border-gray-200 rounded-none ">
                <TabsTrigger value="analytics" className="w-full flex gap-2 justify-start"> <FaChartLine className="text-blue-700" size={20}/> analytics </TabsTrigger>
                <TabsTrigger value="orderRequest" className="w-full flex gap-2"><FaShoppingCart className="text-blue-700" size={20}/> Order Request</TabsTrigger>
            </TabsList>
            <TabsContent value="analytics" className="w-full ">                
                <Analytics/>
                </TabsContent>
            <TabsContent value="orderRequest" className="overflow-hidden w-full ">
                <OrderDisplay/>
            </TabsContent>
        </Tabs>
    </div>
 
)
}

export default DashBoardDisplay
