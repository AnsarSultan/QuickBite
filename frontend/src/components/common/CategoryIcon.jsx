import React from 'react'
import logo from '../../assets/logo.png'

function CategoryIcon() {
  return (
    <div 
      className="flex flex-row items-center gap-3 cursor-pointer px-2 
                 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition w-fit"
    >
      <img 
        src={logo} 
        alt="Category"
        className="w-10 h-10 object-cover rounded-md"
      />
      <p className="font-medium text-sm">Pizza</p>
    </div>
  )
}

export default CategoryIcon