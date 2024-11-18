class ProductQueryStruct{
    queryId:string
    productId?:string
    sellerId?:string
    username?:string 
    questionDesc?:string
    replies?:QueryReplyStruct[]
    createdAt?:Date
    constructor(queryId:string,productId?:string,sellerId?:string,
        username?:string,
        questionDesc?:string,
        replies?:QueryReplyStruct[],
        createdAt?:Date
    ){
        this.queryId=queryId;
        this.productId=productId
        this.sellerId=sellerId
        this.username=username 
        this.questionDesc=questionDesc 
        this.replies=replies 
        this.createdAt=createdAt 
    }
}

class QueryReplyStruct{
    replyId:string 
    username:string 
    ansDesc:string 
    productQuery:ProductQueryStruct
    createdAt?:Date
    constructor(replyId:string,username:string,
         ansDesc:string,productQuery:ProductQueryStruct,
         createdAt?:Date
        ){
        this.replyId=replyId 
        this.username=username
        this.ansDesc=ansDesc
        this.productQuery=productQuery
        this.createdAt=createdAt
    }

}
class ProductRatingStruct{
    ratedId?:string 
    productId:string
    ratedBy:string 
    ratedValue:number 
    review:string 
    createdAt?:Date
    constructor(
        productId:string, 
        ratedBy:string ,
        ratedValue:number,
        review:string,
        createdAt?:Date,
        ratedId?:string ,
      
    ) {
        this.ratedId=ratedId
        this.productId=productId
        this.ratedValue=ratedValue
        this.ratedBy=ratedBy
        this.review=review
        this.createdAt=createdAt
    }

}
interface SelectedProductStruct{
    productName?:string,
    productId?:string,
    sellerId?:string,
    username?:string,
    
}
export {ProductQueryStruct,QueryReplyStruct,ProductRatingStruct}
export type {SelectedProductStruct}