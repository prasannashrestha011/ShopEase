

import LoginInputs from '@/AppComponents/LoginInputs/LoginInputs'
import React from 'react'

const Login = () => {
  return (
    <div className='flex flex-col justify-start item-center  h-screen border-none'>

    <main className='h-full  flex '>
      <section className={`flex-1 bg-slate-50 h-full flex flex-col p-4`}>
        <div className='w-fit mx-auto text-black text-2xl'>Shop Ease</div>
        <div className={`bg-[url('/wallpapers/login.png')] h-full`}> 

        </div>
      </section>
        <section className=' '>
        <LoginInputs/>
        </section>
    </main>
    </div>
  )
}

export default Login
