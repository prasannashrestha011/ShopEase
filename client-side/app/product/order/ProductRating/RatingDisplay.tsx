import React, { useState } from 'react'

import Rating from '@mui/material/Rating';
const RatingDisplay = () => {
    const [rating,setRating]=useState<number>(0)

  
    const handleRatingInput = (event: React.ChangeEvent<{}>, newValue: number | null) => {
        console.log("new rating->",newValue)
        setRating(newValue || 0);
      };
  return (
    <div>
       <Rating name="half-rating" value={rating} precision={0.5} onChange={handleRatingInput} />
    </div>
  )
}

export default RatingDisplay
