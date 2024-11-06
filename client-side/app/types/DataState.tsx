
import { ChartStruct } from "../product/chart/ChartStruct";
import { ProductInfo } from "../product/class/productClass";
import { TransactionStruct } from "../product/class/transactionClass";
import { UserStruct } from "../user/userClass/UserStruct";

interface UserDataState{
    items:UserStruct|null;
    loading:boolean;
    error:string|null|undefined
}

interface ProductDataState{
    items:ProductInfo[]|null;
    loading:boolean;
    error:string|null|undefined
}
interface ChartDataState{
    items:ChartStruct[]|null;
    loading:boolean;
    error:string|null|undefined
}
interface OrderRequestsState{
    items:TransactionStruct[]|null;
    loading:boolean;
    error:string|null|undefined
}

export type {UserDataState,ProductDataState,ChartDataState,OrderRequestsState}