class CustomerStruct{
    id:string
    username:string
    email:string
    contactNumber:number
    address:string
    constructor(id:string,username:string,email:string,contactNumber:number,address:string){
        this.id=id;
        this.username=username;
        this.email=email;
        this.contactNumber=contactNumber;
        this.address=address
    }
}
class RevenueStruct{
     revenueId:string
     sellerId:string
     transactionId:string
     amount:number
     createdAt:Date|null
     constructor(revenueId:string,sellerId:string,transactionId:string,amount:number,createdAt:Date|null){
        this.revenueId=revenueId;
        this.sellerId=sellerId;
        this.transactionId=transactionId;
        this.amount=amount;
        this.createdAt=createdAt;
     }
}
class DailyRevenueStruct{
  
        [key:number]:RevenueStruct[]
    
}
interface CurrAndPrevRevenueStruct {
    [key:number]:{
        records:{
          [key:number]:RevenueStruct[]
        }
    }
}
interface ChartData{
    day:string
    "Total Revenue":number
}
interface PrevAndCurrentStruct{
    day:string,
    prev:number,
    current:number
}
export {CustomerStruct,RevenueStruct,DailyRevenueStruct}
export type {CurrAndPrevRevenueStruct,ChartData,PrevAndCurrentStruct}
