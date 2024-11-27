import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChartDataState } from "../types/DataState";
import { ChartStruct } from "../product/chart/ChartStruct";
import { GetUserCharts } from "../product/upload/uploadAction";

const initialState:ChartDataState={
    items:[],
    loading:false,
    error:null
}
export const FetchProductCharts=createAsyncThunk('fetch/chartlist',async(userId:string)=>{
    const chartList=await GetUserCharts(userId);
    return chartList as ChartStruct[]
})

const ChartDataSlice=createSlice({
    name:"chartSlice",
    initialState,
    reducers:{
       addChart:(state,action:PayloadAction<ChartStruct>)=>{
        if (state.items) {
            state.items.push(action.payload);
          }
       },
       removeChart:(state,action:PayloadAction<string>)=>{
           if(state.items){
        state.items=state.items.filter((item)=>item.productId!==action.payload)
           }
       }

    },
    extraReducers:(builder)=>{
       builder.addCase(FetchProductCharts.pending,(state)=>{
        state.loading=true
       })
       .addCase(FetchProductCharts.fulfilled,(state,action)=>{
        state.loading=false
        state.items=action.payload
       })
       .addCase(FetchProductCharts.rejected,(state,action)=>{
        state.loading=false
        state.items=[]
        state.error=action.error.message
       })
    }
})
export const {addChart,removeChart}=ChartDataSlice.actions
export default ChartDataSlice.reducer;