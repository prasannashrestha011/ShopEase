import { ProductInfo } from '@/app/product/class/productClass'
import { useAppSelector } from '@/app/redux/Store'
import { Button } from '@/components/ui/button'
import { DrawerContent, DrawerTitle } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { UpdateProductDetails } from '../fetchers'
import { UpdateProductDetailsStruct } from '../class'

const UpdateProductInfoDisplay = () => {

  const {items:selectedProduct}=useAppSelector((state)=>state.selectedSellerProduct)
  const [isUpdateDisabled,setIsUpdateDisabled]=useState<boolean>(true)
  const [serverResponse,setServerResponse]=useState<string>("")
  const [productDetails, setProductDetails] = useState<UpdateProductDetailsStruct>({
    productId:"",
    productName:"",
    productPrice:0,
    productDes:""
  })
  

 const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  setProductDetails(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }));
};
const handleDetailsSubmit=async(e:FormEvent)=>{
      e.preventDefault()
      const newDetails=new UpdateProductDetailsStruct(productDetails.productId,
      productDetails.productName,
      productDetails.productPrice,
      productDetails.productDes)
      const response=await UpdateProductDetails(newDetails)
      if(typeof(response)=="string") setServerResponse(response)
      
}
  useEffect(()=>{
    if(selectedProduct){
      setProductDetails(selectedProduct)
    }
  },[])

  if(!selectedProduct){
    return(
      <div className='text-red-600'>No product selected!!</div>
    )
  }
  return (
    <DrawerContent className='h-5/6 flex flex-col items-center justify-start font-sans '>
        <DrawerTitle className='w-full bg-blue-600 text-slate-50 text-center p-3'>Update Product Information</DrawerTitle>
        <br/>
        <form onSubmit={handleDetailsSubmit}>
        <main
    
    className='flex flex-col gap-2  items-center justify-center border shadow-lg w-96 p-6 rounded-md'>
      <label htmlFor='productName' className='flex flex-col gap-1'>
        <span className='font-semibold'>ProductName</span>
      <Input id='productName' name='productName'   value={productDetails.productName} onChange={handleInputChange} 
        readOnly={isUpdateDisabled}
      />
      </label>

      <label htmlFor='productPrice' className='flex flex-col gap-1'>
      <span className='font-semibold'>Product Price</span>
      <Input id='productPrice' name='productPrice' 
      value={productDetails.productPrice} onChange={handleInputChange}
      readOnly={isUpdateDisabled}
      />
      </label>
      
      <label htmlFor='productDes' className='flex flex-col gap-1'>
      <span className='font-semibold'>Product Description</span>
      <Input id='productDes' name='productDes' value={productDetails.productDes}
       onChange={handleInputChange}
       readOnly={isUpdateDisabled}
       />
      </label>
     {!isUpdateDisabled && <Button className='bg-green-500' type='submit'>Save</Button>}
     {isUpdateDisabled&& <Button onClick={()=>setIsUpdateDisabled(!isUpdateDisabled)}>Update</Button>}
    {serverResponse&&<span>{serverResponse}</span>}
    </main>
        </form>
    </DrawerContent>
  )
}

export default UpdateProductInfoDisplay
