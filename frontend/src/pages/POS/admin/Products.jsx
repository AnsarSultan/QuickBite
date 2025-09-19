import React from 'react'
import { Plus } from 'lucide-react';
import { NavLink } from "react-router-dom";
import ProductCard from '../../../components/common/ProductCard';
import logo from '../../../assets/logo.png'
import LinkButton from '../../../components/pos/ui/LinkButton';

function Products() {
  const productData = { name: "Pizza", price: 12, description: "Food", image: logo };
  const handleEdit = () => {

  }
  const handleDelete = () => {

  }
  return (
    <div className='flex flex-col'>
      <div className='flex gap-2 items-center'>
        <LinkButton link={'/pos/products/addProduct'}><Plus />Add new product</LinkButton>
        
        <LinkButton link={'/pos/products/category'}>
          Manage Category
        </LinkButton>
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