import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'

interface Prop{ 
    product:string
}
const SearchInput = () => {
    const router=useRouter()
    const [search,setSearch]=useState<Prop>({product:""})
    const handleValueChange=(e:ChangeEvent<HTMLInputElement>)=>{
        setSearch({
            ...search,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmitAction=(e:FormEvent)=>{
        e.preventDefault();
        console.log(search)
        if(search.product=="null") alert("fill your field")
        router.push(`/product/search?product=${search.product}`)
    }
  return (
  
      <form className='flex gap-2 justify-center items-center' onSubmit={handleSubmitAction} >
       <Input placeholder='Search your product' className='yatraone w-4/12' name='product' onChange={handleValueChange}/>
       <button type='submit'>Search</button>
       </form>
  
  )
}

export default SearchInput
