//for updating live data
import { TransactionStruct } from "@/app/product/class/transactionClass";
import { OrderRequestsState } from "@/app/types/DataState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState:OrderRequestsState={
    items:[],
    loading:false,
    error:null
}
const ProductRequestsStateSlice= createSlice({
    initialState,
    name:"liveProductRequests",
    reducers:{
        AddNewProductRequest:(state,action:PayloadAction<TransactionStruct>)=>{
            if(state.items){
                console.log("pushed new data...")
                state.items=[...state.items,action.payload]
            }
        }
    }
})

export const {AddNewProductRequest}=ProductRequestsStateSlice.actions
export default ProductRequestsStateSlice.reducer