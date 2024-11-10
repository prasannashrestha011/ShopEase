import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { TransactionStruct } from "../product/class/transactionClass";
import axios from "axios";
import { OrderRequestsState } from "../types/DataState";
const initialState:OrderRequestsState={
    items:[],
    loading:true,
    error:null
}
export const FetchOrderRequest=createAsyncThunk<TransactionStruct[]|null,string>('/fetch/orderrequest',async(sellerId:string)=>{
   try{
    if(sellerId!=null){
        const response=await axios.get(`http://localhost:8080/transaction/seller/entries?seller_id=${sellerId}`,{withCredentials:true});

        return response.data
    }
   }catch(err){
    console.error(err)
    return null;
   }
})
const OrderRequestsSlice=createSlice({
    initialState,
    name:"data",
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(FetchOrderRequest.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(FetchOrderRequest.fulfilled,(state,action)=>{
            state.loading=false,
            state.items=action.payload
        })
        .addCase(FetchOrderRequest.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.error.message
            
        })
    }
})
export default OrderRequestsSlice.reducer