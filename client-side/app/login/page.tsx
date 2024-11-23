

import LoginInputs from '@/AppComponents/LoginInputs/LoginInputs'
import React from 'react'

const Login = () => {
  return (
    <div className='flex flex-col justify-start item-center  h-screen gap-10 '>
    <header className=' text-3xl md:text-4xl font-semibold  mx-auto'>Shop Ease</header>
    <main className='h-1/2'>
        <LoginInputs/>
    </main>
    </div>
  )
}

export default Login
