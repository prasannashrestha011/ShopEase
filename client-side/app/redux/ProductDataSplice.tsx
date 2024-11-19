import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { ProductInfo } from "../product/class/productClass";
import axios from "axios";
import { ProductDataState } from "../types/DataState";
const initialState:ProductDataState={
    items:[],
    loading:true,
    error:null
}
export const FetchProductList=createAsyncThunk<ProductInfo[]|null,void>('/fetch/products',
    async()=>{
        try{
            const response=await axios.get(`http://localhost:8080/product/list`,{withCredentials:true})
            if(response.status!==200) throw new Error("failed to fetch the data")
        
                return response.data
        }catch(err){
            console.error(err)
            return null
        }
    }
)
const ProductDataSlice=createSlice({
    name:'productData',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.
        addCase(FetchProductList.pending,(state)=>{
            state.loading=true
        })
        .addCase(FetchProductList.fulfilled,(state,action)=>{
            state.loading=false
            state.items=action.payload 
        })
        .addCase(FetchProductList.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
    }
})
export default ProductDataSlice.reducer