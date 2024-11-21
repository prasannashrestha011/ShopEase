import React from 'react'
import SellerProductListDisplay from './SellerProductListDisplay'
import RatingDisplay from './RatingDisplay'
import UploadDisplay from '@/app/product/upload/UploadDisplay'

const SellerListIndex = () => {
  return (
    <div className='flex flex-col gap-8 w-full  '>
      <div className='flex gap-2 h-screen border-b-2  items-start justify-start mt-4'>
      <SellerProductListDisplay/>
      <RatingDisplay />
      </div>
      <UploadDisplay/>
    </div>
  )
}

export default SellerListIndex
