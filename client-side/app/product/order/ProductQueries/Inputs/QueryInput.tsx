import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ProductQueryStruct } from '../../types'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/app/redux/Store'
import { InsertProductQuery } from '../fetchers'
import DisplayQueries from '../DisplayQueries'

interface Props{
  productId:string,
  sellerId:string
}
const QueryInput:React.FC<Props> = ({productId,sellerId}) => {
    const [productQuery,setProductQuery]=useState<ProductQueryStruct | null>(null)
    const {items:userDetails}=useAppSelector((state)=>state.userDetails)
    const [isSubmit,setIsSubmit]=useState<boolean>(false)
    const handleUserInput=(e:ChangeEvent<HTMLInputElement>)=>{
        setProductQuery(prevState => ({
            ...prevState!,
            [e.target.name]: e.target.value
        }));
    }
    const handleQuerySubmit=async(e:FormEvent)=>{
      e.preventDefault()
      console.log(productQuery)
      if(userDetails?.username&&productQuery){
        const userQuery = new ProductQueryStruct(
          "",
          productId,
          sellerId,
          userDetails?.username, 
          productQuery?.questionDesc,
        );
         const message=await InsertProductQuery(userQuery)
         setProductQuery(null)
         setIsSubmit(true)
      }
    }
   
  return (
    <div className='flex flex-col items-center yatraone'>
      <header>Queries</header>
      <DisplayQueries productId={productId}/>
       {isSubmit?(
        <div className='mt-4'>
          Query Submitted Sucessfully
          </div>
       ):(
        <form className='flex flex-col gap-4 w-8/12 items-center justify-center mx-auto h-40 pt-4' onSubmit={handleQuerySubmit}>
        <Input name="questionDesc" className='w-4/12' value={productQuery?.questionDesc} onChange={handleUserInput}/>
        <Button type='submit'>Submit</Button>
    </form>
       )}
    </div>
  )
}

export default QueryInput
