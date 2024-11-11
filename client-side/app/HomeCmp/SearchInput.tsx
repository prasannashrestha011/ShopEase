import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

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
        if(search.product=="") return
            
        router.push(`/product/search?product=${search.product}`)
    }
  return (
  
      <form className='flex  justify-center items-center' onSubmit={handleSubmitAction} >
       <Input placeholder='Search your product' className='yatraone rounded-none rounded-l-md ' name='product' onChange={handleValueChange}/>
       <button type='submit' className='border rounded-r-md   p-3'><FaSearch/></button>
       </form>
  
  )
}

export default SearchInput
