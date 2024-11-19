import {configureStore} from '@reduxjs/toolkit'
import UserDetailsReducer from './UserDataSplice'
import ProductListReducer from './ProductDataSplice'
import ChartListReducer from './ChartDataSplice'
import AnalyticsReducer from './AnalyticsSplice'
import OrderDetailsReducer from './OrderDetailSplice'
import OrderRequestsReducer from './OrderRequests/OrderRequestSplice'
import SelectedProductReducer from './ProductRatings/SelectedProductSlice'
import ProductRequestsStateSliceReducer from './OrderRequests/ProductRequestsStateSlice'
import OrderStatusReducer from './OrderRequests/OrderStatusSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
const Store=configureStore({
    reducer:{
        'chart':ChartListReducer,
        'userDetails':UserDetailsReducer,
        'productList':ProductListReducer,
        'orderRequests':OrderRequestsReducer,
        'analytics':AnalyticsReducer,
        'orderDetails':OrderDetailsReducer,
        'selectedProduct':SelectedProductReducer,
        'liveProductRequest':ProductRequestsStateSliceReducer,
        'orderRequest':OrderStatusReducer
    }
})
export type RootState=ReturnType<typeof Store.getState>
export type AppDispatch=typeof Store.dispatch

export const useAppDispatch=()=>useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;

export default Store