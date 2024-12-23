import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { UserStruct } from '../user/userClass/UserStruct'
import axios from 'axios';
import { UserDataState } from '../types/DataState';
const initialState:UserDataState={
    items:null,
    loading:true,
    error:null 
}
const backedURL=process.env.NEXT_PUBLIC_BACKEND_ROOT_API
export const FetchUserDetails=createAsyncThunk<UserStruct|null,void>('/fetch/data',
    async()=>{
        const username=window.localStorage.getItem("UUID")
        if(!username)return null;
      try{
        const response=await axios.get(`${backedURL}/user/credentials?userId=${username}`,{withCredentials:true})
        if(response.status!==200) throw new Error("failed to fetch user data")
            
            return response.data as UserStruct
      }catch(err){
        console.error(err);
        return null;
        }
    }
)
const UserDetailsSlice=createSlice({
    name:'data',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(FetchUserDetails.pending,(state)=>{
            state.loading=true
        })
        .addCase(FetchUserDetails.fulfilled,(state,action)=>{
            state.loading=false
            state.items=action.payload
        })
        .addCase(FetchUserDetails.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
    }
})
export default UserDetailsSlice.reducer