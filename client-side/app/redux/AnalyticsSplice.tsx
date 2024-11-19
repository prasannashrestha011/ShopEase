import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { GetCurrentWeekRevenueRecords } from "../seller/dashboard/fetchers";
import { AnalyticsState } from "../types/DataState";

const initialState:AnalyticsState={
    items:null,
    loading:true,
    error:null
}
export const FetchAnalyticData=createAsyncThunk('/fetch/analytics',async(sellerId:string)=>{
    try{
        const response=await GetCurrentWeekRevenueRecords(sellerId);
        if(response==null) throw new Error("failed to fetch the data")
    
        return response;
    }catch(err){
        console.error(err)
        return null
    }
})
const AnalyticsSlice=createSlice({
    name:'analytics',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(FetchAnalyticData.pending,(state)=>{
            state.loading=true
        })
        .addCase(FetchAnalyticData.fulfilled,(state,action)=>{
            state.loading=false
            state.items=action.payload??null
            
        })
        .addCase(FetchAnalyticData.rejected,(state,action)=>{
            state.loading=false
            state.items=null
            state.error=action.error.message
        })
      
    }
})
export default AnalyticsSlice.reducer