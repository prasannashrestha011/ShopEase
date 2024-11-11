import { TransactionStruct } from "@/app/product/class/transactionClass";


export function GetUnReadRequest(orderList:TransactionStruct[]):number{
    const unReadOrdersCount=orderList.filter(order=>!order.isRead).length
    console.log(unReadOrdersCount ," is your current number")
    return unReadOrdersCount;
}