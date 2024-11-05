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
export {CustomerStruct}