import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChartDataState } from "../types/DataState";
import { ChartStruct } from "../product/chart/ChartStruct";

const initialState:ChartDataState={
    items:[],
    loading:false,
    error:null
}
    

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

    }
})
export const {addChart,removeChart}=ChartDataSlice.actions
export default ChartDataSlice.reducer;