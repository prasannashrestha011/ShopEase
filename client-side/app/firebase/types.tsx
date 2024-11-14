class NotificationTokenStruct{
    userId:string
    token:string
    username:string
    constructor(userId:string,token:string,username:string){
        this.userId=userId;
        this.token=token;
        this.username=username
    }
}
class NotificationBody{
    token:string
    title:string
    body:string
    constructor(token:string,title:string,body:string){
        this.token=token
        this.title=title
        this.body=body
    }
}
export {NotificationTokenStruct,NotificationBody}

