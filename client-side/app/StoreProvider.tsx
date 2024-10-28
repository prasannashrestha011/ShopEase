"use client"

import React, { ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'
import Store, { useAppDispatch } from './redux/Store'
import { FetchUserDetails } from './redux/UserDataSplice'
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
