import React from 'react'
import SellerProductListDisplay from './SellerProductListDisplay'
import RatingDisplay from './RatingDisplay'

const SellerListIndex = () => {
  return (
    <div className='flex gap-2 w-full'>
      <SellerProductListDisplay/>
      <RatingDisplay />
    </div>
  )
}

export default SellerListIndex
