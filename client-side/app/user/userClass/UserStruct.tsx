class UserStruct{
    id:string 
    email:string
    username:string;
    password:string;
    userImage:string;
    contactNumber:number;
    address:string;
    postalCode:number;
    province:string;
    createAt?:Date | null;
    updateAt?:Date | null;
    roles:string[]
    constructor(id:string,email:string,username:string,password:string,userImage:string,contactNumber:number,address:string,postalCode:number,province:string,createAt:Date | null,updateAt:Date |null ,roles:string[]){
        this.id=id;
        this.email=email;
        this.username=username;
        this.password=password;
        this.userImage=userImage;
        this.contactNumber=contactNumber;
        this.address=address;
        this.postalCode=postalCode;
        this.province=province;
        this.createAt=createAt;
        this.updateAt=updateAt;
        this.roles=roles;
    }
}
export {UserStruct}