import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/Components/ui/popover"
  import { FaShoppingCart } from 'react-icons/fa';
import { useAppSelector } from '@/app/redux/Store';
import { useRouter } from 'next/navigation';
const Chart = () => {
  const {items}=useAppSelector((state)=>state.chart)
  const router=useRouter();
  return (

      <Popover>
  <PopoverTrigger><FaShoppingCart className='text-red-600'/></PopoverTrigger>
  <PopoverContent className='yatraone cursor-pointer'>
    <header className='text-xl mx-auto w-fit flex item-center gap-2 '><FaShoppingCart className='text-red-600'/>Your chart</header>
    <ul className='flex flex-col gap-2'>
    {items&&items?.map((chart)=>(
      <span className='border-b-2 border-gray-300 p-1 ' onClick={()=>router.push(`/product/order/${chart.productId}`)}>{chart.productName}</span>
    ))}
    </ul>
  </PopoverContent>
</Popover>


  )
}

export default Chart
