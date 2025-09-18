import React from 'react'
import { Plus } from 'lucide-react';

function Products() {
  return (
    <div className='h-screen'>
      <div className='flex gap-2 items-center'>
        <div className='flex bg-admin text-white p-2 rounded'> <Plus />Add new product</div>
        <div className='flex bg-admin text-white p-2 rounded'> <Plus />Add new category</div>
      </div>
    </div>
  )
}

export default Products