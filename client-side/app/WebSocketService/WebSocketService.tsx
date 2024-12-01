import {Client} from '@stomp/stompjs'
import SocketJs from 'sockjs-client'
import { TransactionStruct } from '../product/class/transactionClass'
import { AddNewProductRequest } from '../redux/OrderRequests/ProductRequestsStateSlice'
import { Dispatch } from '@reduxjs/toolkit'
const backedURL=process.env.NEXT_PUBLIC_BACKEND_ROOT_API

class WebSocketService{
    private client:Client|null=null
    private connection:boolean=false 

   

    connect(dispatch:Dispatch):Promise<string>{
       return new Promise((resolve,reject)=>{
        const socket=new SocketJs(`${backedURL}/ws`)
        this.client=new Client({
            webSocketFactory:()=>socket,
            connectHeaders:{},
            onConnect:()=>{
                console.log("Connection established")
                this.connection=true
                this.client?.subscribe('/topic/broadcast',(data)=>{
                    console.log("Received data: ",JSON.parse(data.body))
                    const parsedData=JSON.parse(data.body)
                     dispatch(AddNewProductRequest(parsedData))
                 
                })
                
            },
            reconnectDelay:5000,
            onStompError:(frame)=>{
                console.error('Broker reported error:', frame.headers['message']);
                reject(new Error(frame.headers['message'])); 
            }
        })
        this.client.activate()
       })
    }
    disconnect(){
        if(this.client && this.connection){
            this.client.deactivate()
            this.connection=false
        }
    }
   
    addProductRequest(productRequestDetails:TransactionStruct){
        if(!this.client || !this.connection) return 

        const message=JSON.stringify(productRequestDetails)
        this.client.publish({
            destination:'/app/insert/productRequest',
            body:message,
        })
    }
}
export default new WebSocketService