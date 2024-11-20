import { ProductInfo } from "@/app/product/class/productClass";
import {  SelectedProductDataState } from "@/app/types/DataState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState:SelectedProductDataState={
    items:{
        data:null,
        idx:0
    },
    loading:false,
    error:null
}
interface SelectedProductPayload {
    data: ProductInfo;
    idx: number; // or the appropriate type
  }
const SelectedProductSplice=createSlice({
    initialState,
    name:'selectedProduct',
    reducers:{
        SetSelectedProduct:(state,action:PayloadAction<SelectedProductPayload>)=>{
        
        
              
                state.items.data=action.payload.data
                state.items.idx=action.payload.idx
               
           
        }
    }
})
export const {SetSelectedProduct}=SelectedProductSplice.actions
export default SelectedProductSplice.reducer