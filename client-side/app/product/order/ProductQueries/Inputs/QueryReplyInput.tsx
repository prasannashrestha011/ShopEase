import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FaArrowAltCircleUp } from 'react-icons/fa'
import { Button, Input } from '@mui/material'
import { ProductQueryStruct, QueryReplyStruct } from '../../types'
import { useAppSelector } from '@/app/redux/Store'
import { InsertQueryReply } from '../fetchers'

interface Prop{
    queryId:string
}
const QueryReplyInput:React.FC<Prop> = ({queryId}) => {
    
    const [ansDesc,setAnsDesc]=useState<string>("")
    const {items:userDetails}=useAppSelector((state)=>state.userDetails)

    const handleInput=(e:ChangeEvent<HTMLInputElement>)=>{
        setAnsDesc(e.target.value)
    }
    const handleQueryReply=async(e:FormEvent)=>{
        e.preventDefault()
        
        if(userDetails){
            const queryReplyEntity=new QueryReplyStruct("",userDetails?.username,
                ansDesc,new ProductQueryStruct(queryId),
            )
            const response=await InsertQueryReply(queryReplyEntity);
            setAnsDesc("")

        }
    }
  return (
    <div>
        <form onSubmit={handleQueryReply}>
        <Input className='border pl-1' value={ansDesc} onChange={handleInput} />
        <Button type='submit'><FaArrowAltCircleUp size={25}/></Button>
        </form>
    </div>
  )
}

export default QueryReplyInput
