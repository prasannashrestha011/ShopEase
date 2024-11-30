import { createSlice } from "@reduxjs/toolkit";

interface Prop{
    page:number
}
const dataState:Prop={
    page:0
}
const initialState={
    items:dataState,
    loading:false,
    error:null
}
const ProductListPageSlice=createSlice({
 initialState,
 name:"productPage",
 reducers:{
    IncreaseProductListPage(state){
        state.items.page +=1
    }
 }
})

export const {IncreaseProductListPage}=ProductListPageSlice.actions
export default ProductListPageSlice.reducer