import { ProductRatingStruct } from "@/app/product/order/types";
import { GetProductRatingsOfSeller } from "@/app/seller/dashboard/fetchers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface DataState{
    items:ProductRatingStruct[],
    loading:boolean,
    error:null | string
}
const initialState:DataState={
    items:[],
    loading:false,
    error:null 
}
export const FetchSellerProductRating=createAsyncThunk('/fetch/seller/ratings',async(sellerId:string)=>{
    try{
        const response=await GetProductRatingsOfSeller(sellerId)
        if(response==null) throw new Error("Ratings not found !!")
            return response
    }catch(err){
        return null;
    }
})
const SellerRatingListSlice=createSlice({
    initialState,
    name:'sellerProductRatings',
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(FetchSellerProductRating.pending,(state)=>{
            state.loading=true
        }),
        builder.addCase(FetchSellerProductRating.fulfilled,(state,action)=>{
            if(action.payload){
                state.items=action.payload
                state.loading=false
            }
        })
        builder.addCase(FetchSellerProductRating.rejected,(state,action)=>{
            state.loading=false
         
                state.error=action.error.message ?? "unknow error"
            
                state.items=[]
           
            
        })
    }
})

export  default SellerRatingListSlice.reducer