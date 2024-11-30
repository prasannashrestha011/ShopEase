import { useAppSelector } from '@/app/redux/Store'
import { DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Rating } from '@mui/material'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import React from 'react'

const RatingDialogDisplay = () => {
    const {items:ratingInfo}=useAppSelector((state)=>state.selectedProductRating)

    
  return (

      <DialogContent className='font-sans'>
        <DialogHeader>
            <DialogTitle className='font-bold'>Rating details</DialogTitle>
        </DialogHeader>
        <DialogDescription className='flex flex-col p-3'>
            <Rating defaultValue={ratingInfo?.ratedValue} readOnly/>
            <div>
            Review- <span className='text-black'>{ratingInfo?.review}</span>
            </div>
        </DialogDescription>
      </DialogContent>
    
  )
}

export default RatingDialogDisplay
