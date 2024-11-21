import React from 'react'
import SellerProductListDisplay from './SellerProductListDisplay'
import RatingDisplay from './RatingDisplay'
import UploadDisplay from '@/app/product/upload/UploadDisplay'

const SellerListIndex = () => {
  return (
    <div className='flex flex-col gap-8 w-full h-screen'>
      <div className='flex gap-2 h-screen border items-start justify-start'>
      <SellerProductListDisplay/>
      <RatingDisplay />
      </div>
      <UploadDisplay/>
    </div>
  )
}

export default SellerListIndex
