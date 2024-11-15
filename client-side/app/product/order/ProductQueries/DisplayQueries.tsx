import React, { useEffect, useState } from 'react'
import { ProductQueryStruct } from '../types'
import { GetProductQueries } from './fetchers'
import moment from 'moment'


import { Card, CardContent,CardHeader ,CardDescription, CardFooter } from '@/components/ui/card'
import { Button, Input } from '@mui/material'
import QueryReplyInput from './Inputs/QueryReplyInput'

import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import DisplayReplyQueries from './DisplayReplyQueries'

interface Prop{
    productId:string
}
const DisplayQueries:React.FC<Prop> = ({productId}) => {
    const[queries,setQueries]=useState<ProductQueryStruct[]>([])

    const [focusedIdx,setFocusedIdx]=useState<number|null>(null)
    const fetchQueries= async()=>{
      
        if(productId){
            const list=await GetProductQueries(productId)
            setQueries(list)
        }
    }
    

    const toggleReplyPanel=(idx:number)=>{
        if (focusedIdx === idx) {
            setFocusedIdx(null);
          } else {
            setFocusedIdx(idx); // Set the new reply to be opened
          }
    }

    useEffect(()=>{
        fetchQueries()
    },[productId])
  return (
    <div className='w-fit'>
     <ul className='grid grid-cols-2 gap-2'>

     {queries.length>0&&queries.map((query,idx:number)=>(
        <li key={idx} >
            <Card className='w-96 '>
                <CardHeader className=''>
                    <span>{query.username}</span>
                     <CardDescription>                 
            <span>{moment.utc(query.createdAt).fromNow()}</span>
                     </CardDescription>                    
                </CardHeader>
                <CardContent className=''>
                    <span>{query.questionDesc}  </span>
                    <span>
                    {query.replies&&query.replies.length>0&&(
                        <DisplayReplyQueries replies={query.replies}/>
                    )}
                    </span>
                </CardContent>
                <CardFooter className='p-1 flex flex-col justify-start items-start'>
                  
                { focusedIdx==idx && (
                    <QueryReplyInput queryId={query.queryId}/>
                )}
                    <Button onClick={()=>toggleReplyPanel(idx)}>Reply</Button>
                  
                </CardFooter>
            </Card>
        </li>
      ))}
     </ul>
    
    </div>
  )
}

export default DisplayQueries
