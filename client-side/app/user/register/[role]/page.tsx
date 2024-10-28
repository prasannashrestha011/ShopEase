import React from 'react'
import InputComponents from './InputComponents'
interface PageProp{
    params:{role:'user' | 'seller'}
}
const page:React.FC<PageProp> = ({params}) => {
    if(params.role!=="user" && params.role!=="seller"){
        return(
            <div>
                <span>Invalid role</span>
            </div>
        )
    }
  return (
    <div>
      <InputComponents role={params.role}/>
    </div>
  )
}

export default page
