"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import React, { useEffect, useState } from 'react'
import OrderDisplay from "./OrderRequestTab/OrderDisplay"
import { useAppDispatch, useAppSelector } from "@/app/redux/Store"
import { FetchOrderRequest } from "@/app/redux/OrderRequests/OrderRequestSplice"
import Analytics from "./analytics/Analytics"
import { FetchAnalyticData } from "@/app/redux/AnalyticsSplice"
import { FaChartLine, FaShoppingCart } from "react-icons/fa"
import { GetUnReadRequest } from "@/utils/GetUnReadRequest"
import SellerProductListDisplay from "./SellerProductListTab/SellerProductListDisplay"
import { FetchSellerProductList } from "@/app/redux/Seller/SellerProductsSlice"
import RatingDisplay from "./RatingsTab/RatingDisplay"
import { FetchSellerProductRating } from "@/app/redux/ProductRatings/SellerRatingListSplice"

const DashBoardDisplay = () => {
    const dispatcher=useAppDispatch();
    const {items}=useAppSelector((state)=>state.userDetails);
    const {items:orderRequest}=useAppSelector((state)=>state.orderRequests)
    const [unReadOrdersCount,setUnReadOrdersCount]=useState<number|null>(null)
    useEffect(()=>{
        if(items){
            setUnReadOrdersCount(GetUnReadRequest(orderRequest??[]))
            dispatcher(FetchOrderRequest(items?.id))
            dispatcher(FetchAnalyticData(items.id))
            dispatcher(FetchSellerProductList(items.id))
            dispatcher(FetchSellerProductRating(items.id))
        }
    },[items])
   
  return (
    <div className="merriwheather md:overflow-hidden">
        <Tabs defaultValue="analytics" className="flex ">
            <TabsList className="flex flex-col items-start justify-start h-screen p-6 border-r-2 border-t-2 border-gray-200 rounded-none ">
                <TabsTrigger value="analytics" className="w-full flex gap-2 justify-start"> <FaChartLine className="text-blue-700" size={20}/> analytics </TabsTrigger>
                <TabsTrigger value="orderRequest" className="w-full flex gap-2">
               
                    <FaShoppingCart className="text-blue-700" size={20}/>
                    <div className="relative inline-block">
                        <p>Order Request</p>
                        <span className="absolute -top-2 -right-6 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                            {unReadOrdersCount}
                        </span>
                     </div>
                  
                    </TabsTrigger>
                    <TabsTrigger value="products" className="w-full">
                    <span>Manage Products</span>
                    </TabsTrigger>
                  
            </TabsList>
            <TabsContent value="analytics" className="w-full ">                
                <Analytics/>
                </TabsContent>
            <TabsContent value="orderRequest" className="overflow-hidden w-full  ">
                <OrderDisplay/>
            </TabsContent>
            <TabsContent value="products" className="overflow-hidden w-full  ">
                <SellerProductListDisplay/>
            </TabsContent>
           
        </Tabs>
    </div>
 
)
}

export default DashBoardDisplay
