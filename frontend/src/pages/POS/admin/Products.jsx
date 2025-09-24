import React, { useContext } from 'react'
import { Plus } from 'lucide-react';
import { NavLink } from "react-router-dom";
import ProductCard from '../../../components/common/ProductCard';
import logo from '../../../assets/logo.png'
import LinkButton from '../../../components/pos/ui/LinkButton';
import { AuthContext } from '../../../context/AuthContext';
import { ProductContext } from '../../../context/ProductContext';

function Products() {
  const { user } = useContext(AuthContext)
  const role = user.role
  const { fetchProducts, products, productsLoading } = useContext(ProductContext)
  // const productData = { name: "Pizza", price: 12, description: "Food", image: logo };
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
          <button className={`${role} shadow-${role} hover:shadow-md text-white mx-3 px-3 py-1 rounded-xl cursor-pointer`}>
            Search
          </button>
        </div>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7'>
        {productsLoading ? (
          <p>Loading...</p>
        ) : (
          products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              showActions={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Products