class NotificationTokenStruct{
    id:string
    token:string
    username:string
    constructor(id:string,token:string,username:string){
        this.id=id;
        this.token=token;
        this.username=username
    }
}
interface NotificationBody{
    token:string,
    title:string,
    body:string
}
export {NotificationTokenStruct}
export type {NotificationBody}