import React from 'react'
import { Plus } from 'lucide-react';
import { NavLink } from "react-router-dom";

function Products() {
  const role = "admin"
  return (
    <div>
      <div className='flex gap-2 items-center'>
      <NavLink
         to='/pos/products/addProduct'
          className={`flex bg-${role} text-white p-2 rounded`}
        > 
          <Plus />Add new product
        </NavLink>
      <NavLink
          className={`flex bg-${role} text-white p-2 rounded`}
        >
          <Plus />Add new category
        </NavLink>
      </div>
    </div>
  )
}

export default Products