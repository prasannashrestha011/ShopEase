import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { OrderDetailsState } from "../types/DataState";
import { OrderDetailsStruct } from "../seller/dashboard/class";
const initialState:OrderDetailsState={
    items:null,
    loading:false,
    error:null
}
const OrderDetailsSplice=createSlice({
    initialState,
    name:'OrderDetails',
    reducers:{
        setOrderDetails:(state,action:PayloadAction<OrderDetailsStruct>)=>{
            state.items=action.payload
        }
    }
})
export const {setOrderDetails}=OrderDetailsSplice.actions
export default OrderDetailsSplice.reducer