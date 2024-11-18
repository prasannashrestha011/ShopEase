import React from 'react'


import RatingInput from './RatingInput';
import ProductRatingsList from './ProductRatingsList';


const RatingDisplay:React.FC = () => {
    

  return (
    <div className=' w-full'>
        <ProductRatingsList/>
      <RatingInput/>
    
    </div>
  )
}

export default RatingDisplay
