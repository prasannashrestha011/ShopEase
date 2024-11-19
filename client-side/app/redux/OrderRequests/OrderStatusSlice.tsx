import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import reducer from "../UserDataSplice"


const initialState={
    items:"",
    loading:false,
    error:null
}
const OrderStatusSlice=createSlice({
    initialState,
    name:"orderStatus",
    reducers:{
        UpdateOrderStatusState:(state,action:PayloadAction<string>)=>{
            state.items=action.payload
        }
    }
})
export const {UpdateOrderStatusState}=OrderStatusSlice.actions
export default OrderStatusSlice.reducer