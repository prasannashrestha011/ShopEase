
import React from 'react'


import ProductList from './ProductsList/ProductList';
import { Input } from '../ui/input';
const HomePg = () => {
    
    
    
  return (
    <div className='flex flex-col justify-center items-center gap-3'>
       <header className=' text-3xl font-semibold'>ShopEase</header>
      <nav className='w-4/12'>
        <Input placeholder='Search your product' className=' font-san '/>
      </nav>
        <main>
         
      <ProductList/>
        </main>
    </div>
  )
}

export default HomePg
