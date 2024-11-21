import React, { useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/redux/Store'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { IoReload } from "react-icons/io5";
import { FetchSellerProductRating } from '@/app/redux/ProductRatings/SellerRatingListSplice';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ProductRatingStruct } from '@/app/product/order/types';
import { SetSelectedRating } from '@/app/redux/ProductRatings/SelectedRatingSlice';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import RatingDialogDisplay from './RatingDialogDisplay';
const RatingDisplay = () => {

    const {items:userDetails}=useAppSelector((state)=>state.userDetails)
    const {items:ratingList,loading:listLoading}=useAppSelector((state)=>state.sellerRatingList)
   
    const [selectedIdx,setSelectedIdx]=useState<number|null>(null)
    const dispatcher=useAppDispatch()

    if(!userDetails){
        return(<div>Invalid details</div>)
    }
  
    const handleListRefresh=()=>{
        dispatcher(FetchSellerProductRating(userDetails.id))
    }
    const headers=[
        'product Id',
        'rating',
        'rated by',
        <IoReload size={23} className={`mr-2 w-fit active:rotate-90 transition-transform duration-150 `} onClick={()=>handleListRefresh()}/>
    ]

   const handleSelectedItem=(rating:ProductRatingStruct,idx:number)=>{
      setSelectedIdx(idx);
      dispatcher(SetSelectedRating(rating))
   }

  return (

     
     
     <div className="w-fit max-h-96  h-96  ">
      <header className='w-fit mx-auto '>Your product ratings</header>
      {listLoading?(
        <div>Loading list...</div>
      ):(
        <Table className=' w-6/12  h-20 '>
        <ScrollArea className="h-96 w-fit m-0 p-0 rounded-md border">
        <TableHeader className='bg-gradient-to-b from-[#FCF3F3] to-[#CCC9C9] hover:from-[#FCF3F3] hover:to-[#CCC9C9] text-black ' >
            <TableRow>
                {headers.map((head,idx)=>(
                    <TableHead key={idx}>{head}</TableHead>
                ))}
            </TableRow>
          
        </TableHeader>
      
        <TableBody className=' h-64 w-full '>
            
              {ratingList.map((rating,idx)=>(
                    <TableRow key={idx}>
                        <TableCell>
                            {rating.productId}
                        </TableCell>
                        <TableCell>
                            {rating.ratedValue}
                        </TableCell>
                        <TableCell>
                            {rating.ratedBy}
                        </TableCell>
                        <TableCell>
                         <Dialog>
                         <DialogTrigger className='underline cursor-pointer' onClick={()=>handleSelectedItem(rating,idx)}>View</DialogTrigger>
                       {selectedIdx===idx&&  <RatingDialogDisplay/>}
                         </Dialog>
                        </TableCell>
                    </TableRow>
                ))}
                
            </TableBody>
        </ScrollArea>
       
         
      </Table>
      )}
      
      </div>

  )
}

export default RatingDisplay
