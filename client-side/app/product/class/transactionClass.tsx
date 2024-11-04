class TransactionStruct{
    transactionId:string|null
    sellerId:string
    customerId:string|null
    customerName:string
    customerContact:number
    customerEmail:string
    productName:string
    productQuantity:number
    productAmount:number
    createdAt:Date|null
    updatedAt:Date|null
    status:string
    constructor(transactionId:string | null,
        sellerId:string,
        customerId:string,
        customerName:string,
        customerContact:number,
        customerEmail:string,
        productName:string,
        productQuantity:number,       
        productAmount:number,
        createdAt:Date | null,
        updatedAt:Date | null,
        status:string
    ){
        this.transactionId=transactionId
        this.sellerId=sellerId
        this.customerId=customerId
        this.customerName=customerName
        this.customerContact=customerContact
        this.customerEmail=customerEmail
        this.productName=productName
        this.productQuantity=productQuantity
        this.productAmount=productAmount
        this.createdAt=createdAt
        this.updatedAt=updatedAt
        this.status=status
    }
}
export {TransactionStruct}