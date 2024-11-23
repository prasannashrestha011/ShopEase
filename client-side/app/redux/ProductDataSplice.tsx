import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ProductInfo } from "../product/class/productClass";
import axios from "axios";
import { ProductDataState } from "../types/DataState";

const initialState:ProductDataState={
    items:[],
    loading:true,
    error:null
}
export const FetchProductList=createAsyncThunk<ProductInfo[]|null,number>('/fetch/products',
    async(page)=>{
        try{
            const response=await axios.get(`http://localhost:8080/product/list?page=${page}`,{withCredentials:true})
            if(response.status!==200) throw new Error("failed to fetch the data")
                console.log(response.data)
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
    reducers:{
        addAdditionalListData:(state,action:PayloadAction<ProductInfo[]>)=>{
          if(state.items){
            const existingId=new Set(state.items.map(item=>item.productId))
            const uniqueItems=action.payload.filter(item=>!existingId.has(item.productId))
            state.items=[...state.items,...uniqueItems]
          }
        }
    },
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
export const {addAdditionalListData}=ProductDataSlice.actions
export default ProductDataSlice.reducer