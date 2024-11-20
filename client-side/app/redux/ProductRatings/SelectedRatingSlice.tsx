import { ProductRatingStruct } from "@/app/product/order/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface RatingDataState{
    items:ProductRatingStruct|null,
    loading:false,
    error:null
}
const initialState:RatingDataState={
    items:null,
    loading:false,
    error:null
}
const SelectedRatingSlice=createSlice({
    initialState,
    name:'selectedRatingInfo',
    reducers:{
        SetSelectedRating:(state,action:PayloadAction<ProductRatingStruct>)=>{
            state.items=action.payload
        }
    }
})
export const {SetSelectedRating}=SelectedRatingSlice.actions
export default SelectedRatingSlice.reducer