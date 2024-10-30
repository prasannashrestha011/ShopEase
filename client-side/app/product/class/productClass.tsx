class ProductStruct{
    productName:string;
    productPrice:number;
    productDes:string;
    retailer:string;
    productImages:File[];
    constructor(product_name:string,product_price:number,productDes:string,retailer:string,product_image:File[]){
        this.productName=product_name;
        this.productPrice=product_price;
        this.productDes=productDes;
        this.retailer=retailer;
        this.productImages=product_image;
    }
}
class ProductInfo{
    productId:string
    productName:string;
    productPrice:number;
    productDes:string;
    sellerId:string;
    productImages:string[];
    createdAt:Date | null;
    updatedAt:Date |null;
    constructor(product_id:string,product_name:string,product_price:number,productDes:string,sellerId:string,product_images:string[],created_at:Date,updated_at:Date){
        this.productId=product_id;
        this.productName=product_name;
        this.productPrice=product_price;
        this.productDes=productDes;
        this.sellerId=sellerId;
        this.productImages=product_images;
        this.createdAt=created_at;
        this.updatedAt=updated_at
      
    }
}
export  {ProductStruct,ProductInfo}