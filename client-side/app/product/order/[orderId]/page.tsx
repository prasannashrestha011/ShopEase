import React from 'react'
import OrderDisplay from '../orderDisplay'
interface PageProp{
  params:{orderId:string}
}
const page:React.FC<PageProp> = ({params}) => {


  return (
    <div>
      
      <OrderDisplay product_id={params.orderId}/>
    </div>
  )
}

export default page
