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
    updateAt:Date|null
    isRead:boolean
    status:string
    deliveryType:string
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
        updateAt:Date | null,
        isRead:boolean,
        status:string,
        deliveryType:string
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
        this.updateAt=updateAt
        this.isRead=isRead
        this.status=status
        this.deliveryType=deliveryType
    }
}
export {TransactionStruct}