import { GetProductListOfSeller } from "@/app/seller/dashboard/fetchers";
import { ProductDataState } from "@/app/types/DataState";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


const initialState:ProductDataState={
    items:null,
    loading:true,
    error:null
}
export const FetchSellerProductList=createAsyncThunk('/fetch/seller/productList',async(sellerId:string)=>{
    try{
        const response=await GetProductListOfSeller(sellerId);
        if(response==null) throw new Error("failed to fetch the data")
    
        return response;
    }catch(err){
        console.error(err)
        return null
    }
})
const SellerProducts=createSlice({
    name:'analytics',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(FetchSellerProductList.pending,(state)=>{
            state.loading=true
        })
        .addCase(FetchSellerProductList.fulfilled,(state,action)=>{
            state.loading=false
            state.items=action.payload??null
            
        })
        .addCase(FetchSellerProductList.rejected,(state,action)=>{
            state.loading=false
            state.items=null
            state.error=action.error.message
        })
      
    }
})
export default SellerProducts.reducer