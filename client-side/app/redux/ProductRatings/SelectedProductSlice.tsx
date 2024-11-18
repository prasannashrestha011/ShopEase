import { SelectedProductStruct } from "@/app/product/order/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



  
  interface DataState {
    items: SelectedProductStruct;
    loading: boolean;
  }
  
  const initialState: DataState = {
    items:{},
    loading: false,
  };
const SelectedProductSlice=createSlice({
    initialState,
    name:"productRating",
    reducers:{
        SetRatingProp:(state,action:PayloadAction<SelectedProductStruct>)=>{
            console.log(action.payload)
            state.items=action.payload
        },
       
    }
})
export const {SetRatingProp}=SelectedProductSlice.actions
export default SelectedProductSlice.reducer