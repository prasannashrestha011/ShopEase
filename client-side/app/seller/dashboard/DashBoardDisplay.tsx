"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import React from 'react'
import OrderDisplay from "./OrderRequest/OrderDisplay"

const DashBoardDisplay = () => {
  return (
    <div>
        <Tabs defaultValue="dashboard" className="flex ">
            <TabsList className="flex flex-col items-start justify-start h-screen p-6">
                <TabsTrigger value="analytics" className="w-full">analytics</TabsTrigger>
                <TabsTrigger value="orderRequest" className="w-full">Order Request</TabsTrigger>
            </TabsList>
            <TabsContent value="analytics">Dashboard</TabsContent>
            <TabsContent value="orderRequest" className="overflow-hidden w-full">
                <OrderDisplay/>
            </TabsContent>
        </Tabs>
    </div>
 
)
}

export default DashBoardDisplay
