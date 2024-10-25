class ProductStruct{
    productName:string;
    productPrice:number;
    productDes:string;
    retailer:string;
    productImage:File;
    constructor(product_name:string,product_price:number,productDes:string,retailer:string,product_image:File){
        this.productName=product_name;
        this.productPrice=product_price;
        this.productDes=productDes;
        this.retailer=retailer;
        this.productImage=product_image;
    }
}
class ProductInfo{
    productId:string
    productName:string;
    productPrice:number;
    productDes:string;
    retailer:string;
    productImage:string;
    createdAt:Date;
    updatedAt:Date;
    constructor(product_id:string,product_name:string,product_price:number,productDes:string,retailer:string,product_image:string,created_at:Date,updated_at:Date){
        this.productId=product_id;
        this.productName=product_name;
        this.productPrice=product_price;
        this.productDes=productDes;
        this.retailer=retailer;
        this.productImage=product_image;
        this.createdAt=created_at;
        this.updatedAt=updated_at
      
    }
}
export  {ProductStruct,ProductInfo}