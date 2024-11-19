import { ProductInfo } from "@/app/product/class/productClass";
import {  SelectedProductDataState } from "@/app/types/DataState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState:SelectedProductDataState={
    items:null,
    loading:false,
    error:null
}
const SelectedProductSplice=createSlice({
    initialState,
    name:'selectedProduct',
    reducers:{
        SetSelectedProduct:(state,action:PayloadAction<ProductInfo>)=>{
        
            state.items=action.payload
           
        }
    }
})
export const {SetSelectedProduct}=SelectedProductSplice.actions
export default SelectedProductSplice.reducer