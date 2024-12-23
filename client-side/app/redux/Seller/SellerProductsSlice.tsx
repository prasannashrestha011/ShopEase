import { ProductInfo } from "@/app/product/class/productClass";
import { GetProductListOfSeller } from "@/app/seller/dashboard/fetchers";
import { ProductDataState } from "@/app/types/DataState";
import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface PayloadProps{
    updatedProductDetails:ProductInfo,
    idx:number
}
const initialState:ProductDataState={
    items:null,
    loading:true,
    error:null
}
export const FetchSellerProductList=createAsyncThunk('/fetch/seller/productList',async(sellerId:string)=>{
    try{
        const response=await GetProductListOfSeller(sellerId,1);
        if(response==null) throw new Error("failed to fetch the data")
    
        return response;
    }catch(err){
        console.error(err)
        return null
    }
})
const SellerProducts=createSlice({
    name:'sellerProduct',
    initialState,
    reducers:{
        AddFurtherSellerProductList:(state,action:PayloadAction<ProductInfo[]>)=>{
            if(state.items){
                const newItems = action.payload.filter(newItem =>
                    !state.items?.some(existingItem => existingItem.productId === newItem.productId)
                );
                state.items=[...state.items,...newItems]
            }
        },
        UpdateProductListState:(state,action:PayloadAction<PayloadProps>)=>{
           if(state.items){
            console.log("state updated")
            const {updatedProductDetails,idx}=action.payload
            state.items[idx]=updatedProductDetails
           }
        }

    },
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
export const {AddFurtherSellerProductList,UpdateProductListState}=SellerProducts.actions
export default SellerProducts.reducer