import React from 'react'
import { QueryReplyStruct } from '../types'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import moment from 'moment'
interface Prop{
    replies:QueryReplyStruct[]
}
const DisplayReplyQueries:React.FC<Prop> = ({replies}) => {
  return (
    <div >
      <Accordion type="single" collapsible className='w-fit  '>
        <AccordionItem value="item-1">
            <AccordionTrigger >view</AccordionTrigger>
            <AccordionContent>
                <ul className='flex flex-col gap-1'>
                    {replies.map((reply,idx)=>(
                        <li key={idx} className='flex flex-col'>
                            <header className='flex flex-col'>
                             <span className='font-bold'>{reply.username}</span>
                              <span className='text-gray-400'>{moment.utc(reply.createdAt).fromNow()}</span>
                            </header>
                            <main>
                                <span>{reply.ansDesc}</span>
                            </main>
                        </li>
                    ))}
                </ul>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
    </div>
  )
}

export default DisplayReplyQueries
