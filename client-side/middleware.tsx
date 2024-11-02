import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose'
const SecretKey=process.env.JWT_SECRET;
interface tokenProp{
  payload:{
    roles:string[],
  sub:string,
  iat:Date,
  exp:Date
  }
}
const jwtConfig = {
    secret: new TextEncoder().encode(SecretKey),
  }
export async function middleware(req:NextRequest){
    const authToken=req.cookies.get('Authorization');
    var pathName=req.nextUrl.pathname;
    if(!authToken ){
        if(pathName==="/login"){
          NextResponse.next()
        }
        return NextResponse.redirect(new URL("/login",req.url)) 
    }

    try{
      if(SecretKey){
        console.log(new TextEncoder().encode(SecretKey))
        const tokenString=authToken.value
        console.log(tokenString)
        const decodedToken:tokenProp=await jose.jwtVerify(tokenString,jwtConfig.secret);
        console.log("token string ->",( decodedToken).payload)
        
        //authenticated user
        if(pathName.startsWith("/login") && decodedToken){
          return NextResponse.redirect(new URL("/",req.url))
        }

        //seller's path
        if(pathName.startsWith("/seller/") && !decodedToken.payload.roles.find(role=>role==="SELLER")){
          console.log("unauthorized")
          return NextResponse.redirect(new URL("/unauthorized ",req.url))
        }
        
      
      }
     
    }catch(err){
        console.log(err)
        return NextResponse.redirect(new URL("/login", req.url));
    }
}   
export const config={
    matcher:['/login','/','/product/:path*','/seller/:path*',]
}