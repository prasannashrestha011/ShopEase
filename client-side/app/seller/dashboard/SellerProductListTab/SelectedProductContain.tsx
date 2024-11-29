import { useAppSelector } from '@/app/redux/Store'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import React from 'react'
import { FaCog, FaTimes } from 'react-icons/fa'
import UpdateProductInfoDisplay from './UpdateProductInfoDisplay'

const SelectedProductContain = () => {
    const {items:selectedProduct}=useAppSelector((state)=>state.selectedSellerProduct)
  
 
    if(!selectedProduct){
        return(
            <DrawerContent>
                <DrawerTitle>No content</DrawerTitle>
            </DrawerContent>
        )
    }
    if(!selectedProduct.data){
      return(
        <div className='text-red-600'>No content available here</div>
      )
    }
  return (
    <DrawerContent className='h-5/6 merriwheather flex flex-col gap-2 items-center  '>
        <DrawerTitle>ProductName- {selectedProduct.data.productName}</DrawerTitle>
        <main className='h-full  p-2 flex flex-col gap-4'>
            <header>Product Images</header>
            <ul className='grid grid-cols-2 w-fit border'>
              {selectedProduct.data.productImages.map((imageURL,idx)=>(
                <li key={idx}>
                    <img className='w-40' src={imageURL} alt='productImages'/>
                </li>
              ))}
            </ul>
            <span className='mb-4'>
                <span className='font-bold'>Price-</span>
                ${selectedProduct.data.productPrice}
            </span>
          
            <DrawerDescription className='flex flex-col gap-2'>
                <span className='font-bold'>Descriptions:</span>
            {selectedProduct.data.productDes}
        </DrawerDescription>
        </main>
              <DrawerFooter className='absolute top-1 right-4 flex flex-row items-center'>
                
                  <Drawer direction='bottom'    >
                    <DrawerTrigger>
                      <FaCog className='text-gray-500' size={24}/>
                      </DrawerTrigger>
                    <UpdateProductInfoDisplay/>
                  </Drawer>
                    
                <DrawerClose >
                    <Button variant={'destructive'} className='rounded-full' size={"icon"}><FaTimes/></Button>
                </DrawerClose>
              </DrawerFooter>
    </DrawerContent>
  )
}

export default SelectedProductContain
