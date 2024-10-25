import React from 'react'
import OrderDisplay from '../orderDisplay'
interface PageProp{
  params:{orderId:string}
}
const page:React.FC<PageProp> = ({params}) => {


  return (
    <div>
      <header>Order  </header>
      <OrderDisplay product_id={params.orderId}/>
    </div>
  )
}

export default page
