import {configureStore} from '@reduxjs/toolkit'
import UserDetailsReducer from './UserDataSplice'
import ProductListReducer from './ProductDataSplice'
import ChartListReducer from './ChartDataSplice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
const Store=configureStore({
    reducer:{
        'chart':ChartListReducer,
        'userDetails':UserDetailsReducer,
        'productList':ProductListReducer
    }
})
export type RootState=ReturnType<typeof Store.getState>
export type AppDispatch=typeof Store.dispatch

export const useAppDispatch=()=>useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;

export default Store