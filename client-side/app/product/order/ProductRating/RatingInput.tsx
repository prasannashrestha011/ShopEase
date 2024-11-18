
import { ValidateInputField } from '@/utils/validator'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { InsertProductRating } from '../fetchers'
import { ProductRatingStruct } from '../types'
import { DialogHeader, DialogFooter, Dialog, DialogTrigger, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Rating } from '@mui/material'
import { Input } from '@mui/material'
import { useAppSelector } from '@/app/redux/Store'
import { Button } from '@/components/ui/button'

const RatingInput = () => {
    const [ratedValue,setRatedValue]=useState<number>(0)
    const [productReview,setProductReview]=useState<string>("")
    const [error,setError]=useState<string>("")
    const [actionResponse,setActionResponse]=useState<string>("")

    const {items:productProps}=useAppSelector((state)=>state.selectedProduct)
    const handleProductReviewInput=(e:ChangeEvent<HTMLInputElement>)=>{
       
          setProductReview(e.target.value)
        
    }
    const handleRatingInput = (event: React.ChangeEvent<{}>, newValue: number | null) => {
        console.log("new rating->",newValue)
        setRatedValue(newValue || 0);
      };
    const handleReviewSubmission=async(e:FormEvent)=>{
    
      e.preventDefault()
      const isInputValid=ValidateInputField(productReview)
      if(!isInputValid){
        setError("Please provide a valid review!!")
        return
      }
     
      if(!productProps.productId || !productProps.username)return
      
      const productRatingEntity=new ProductRatingStruct(productProps.productId,productProps.username,ratedValue,productReview)
      const response=await InsertProductRating(productRatingEntity)
      console.log(response)
      setActionResponse(response)
      setError("")
      setProductReview("")
    }
  return (
    <div>
          
          <Dialog>
        <DialogTrigger asChild>
          <span>
          <Button className='bg-green-600'>Rate now</Button>
            </span>
            </DialogTrigger>
        <DialogContent>
        <DialogTitle>Add your review</DialogTitle>
         <form onSubmit={handleReviewSubmission}>
         <DialogHeader>Product Review</DialogHeader>
          <DialogDescription className='flex flex-col'>
          {!actionResponse&&<>
            <Rating name="half-rating" value={ratedValue} precision={0.5} onChange={handleRatingInput} />
            <Input value={productReview} onChange={handleProductReviewInput} className='border'/>
          </>}
          {error&&<span className='text-red-600'>{error}</span>}
          {actionResponse&&<span>{actionResponse}</span>}
          </DialogDescription>
          <DialogFooter>
            {actionResponse?<img src={"/icons/sucess.png"} className='w-8 object-cover'/> :<Button type='submit'>Confirm</Button>}
          </DialogFooter>
         </form>
        </DialogContent>
        </Dialog>
    </div>
  )
}

export default RatingInput
