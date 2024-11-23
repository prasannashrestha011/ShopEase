class ProductStruct{
    productName:string;
    productPrice:number;
    productDes:string;

    productImages:File[];
    productCategory:string
    constructor(product_name:string,product_price:number,productDes:string,product_image:File[],productCategory:string){
        this.productName=product_name;
        this.productPrice=product_price;
        this.productDes=productDes;
      
        this.productImages=product_image;
        this.productCategory=productCategory
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
    productCategory:string
    productViews?:number
    constructor(product_id:string,product_name:string,
        product_price:number,productDes:string,sellerId:string,
        product_images:string[],created_at:Date,updated_at:Date,
        productCategory:string,productViews?:number){
        this.productId=product_id;
        this.productName=product_name;
        this.productPrice=product_price;
        this.productDes=productDes;
        this.sellerId=sellerId;
        this.productImages=product_images;
        this.createdAt=created_at;
        this.updatedAt=updated_at
        this.productCategory=productCategory
        this.productViews=productViews
    }
}
export  {ProductStruct,ProductInfo}