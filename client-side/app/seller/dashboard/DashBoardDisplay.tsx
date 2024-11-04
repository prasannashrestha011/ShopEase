"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import React from 'react'
import OrderDisplay from "./OrderRequest/OrderDisplay"

const DashBoardDisplay = () => {
  return (
    <div>
        <Tabs defaultValue="dashboard">
            <TabsList>
                <TabsTrigger value="analytics">analytics</TabsTrigger>
                <TabsTrigger value="orderRequest">Order Request</TabsTrigger>
            </TabsList>
            <TabsContent value="analytics">Dashboard</TabsContent>
            <TabsContent value="orderRequest">
                <OrderDisplay/>
            </TabsContent>
        </Tabs>
    </div>
 
)
}

export default DashBoardDisplay
