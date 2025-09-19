import React from 'react'
import { Plus } from 'lucide-react';
import { NavLink } from "react-router-dom";
import ProductCard from '../../../components/common/ProductCard';
import logo from '../../../assets/logo.png'

function Products() {
  const role = "admin"
  const productData = { name: "Pizza", price: 12, description: "Food", image: logo };
  const handleEdit = () => {

  }
  const handleDelete = () => {

  }
  return (
    <div className='flex flex-col'>
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
      <div>
        <div className='my-3'>
          <input
            type="text"
            className="bg-white border border-gray-500 p-2 rounded-lg"
            placeholder="Enter product name"
          />
          <button className={`bg-${role} shadow-${role} hover:shadow-md text-white mx-3 px-3 py-1 rounded-xl cursor-pointer`}>
            Search
          </button>
        </div>
      </div>
        <div className='grid grid-cols-4 gap-3 p-3'>
          <ProductCard product={productData}
            showActions={true}          // show Edit + Delete
            onEdit={handleEdit}
            onDelete={handleDelete} />
          <ProductCard product={productData}
            showActions={true}          // show Edit + Delete
            onEdit={handleEdit}
            onDelete={handleDelete} />
          <ProductCard product={productData}
            showActions={true}          // show Edit + Delete
            onEdit={handleEdit}
            onDelete={handleDelete} />
          <ProductCard product={productData}
            showActions={true}          // show Edit + Delete
            onEdit={handleEdit}
            onDelete={handleDelete} />
          <ProductCard product={productData}
            showActions={true}          // show Edit + Delete
            onEdit={handleEdit}
            onDelete={handleDelete} />
          <ProductCard product={productData}
            showActions={true}          // show Edit + Delete
            onEdit={handleEdit}
            onDelete={handleDelete} />
        </div>
      </div>
  )
}

export default Products