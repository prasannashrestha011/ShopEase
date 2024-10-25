import { NextRequest, NextResponse } from "next/server";
export async function middleware(req:NextRequest){
    const authToken=req.cookies.get('Authorization');
    console.log(authToken)
    if(!authToken){
        return NextResponse.redirect(new URL("/login",req.url))
    }
}   
export const config={
    matcher:['/']
}