class CustomerStruct{
    customerId:string
    userImage:string
    username:string
    email:string
    contactNumber:number
    address:string
    postalCode:number
    province:string
    constructor(customerId:string,userImage:string,username:string,email:string,contactNumber:number,address:string,postalCode:number,province:string){
        this.customerId=customerId;
        this.userImage=userImage
        this.username=username;
        this.email=email;
        this.contactNumber=contactNumber;
        this.address=address
        this.postalCode=postalCode
        this.province=province
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
class UpdateProductDetailsStruct{
    productId:string
    productName:string
    productPrice:number 
    productDes:string 
    constructor(productId:string,productName:string,productPrice:number,productDes:string){
        this.productId=productId
        this.productName=productName
        this.productPrice=productPrice,
        this.productDes=productDes  
    }
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
interface OrderDetailsStruct{
    customerId:string,
    transactionId:string,
    status:string,
    amount:number
}


export {CustomerStruct,RevenueStruct,DailyRevenueStruct,UpdateProductDetailsStruct}
export type {CurrAndPrevRevenueStruct,ChartData,PrevAndCurrentStruct,OrderDetailsStruct}
