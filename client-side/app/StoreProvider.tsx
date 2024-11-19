"use client"

import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import Store from './redux/Store'

import DispatcherProvider from './redux/DispatcherProvider'

const StoreProvider = ({children}:{children:ReactNode}) => {
  
  return (
    <Provider store={Store}>
      <DispatcherProvider>
      {children}
      </DispatcherProvider>
      </Provider>
  )
}

export default StoreProvider
