import React, { useContext, useEffect } from 'react'
import { Plus } from 'lucide-react';
import { NavLink } from "react-router-dom";
import ProductCard from '../../../components/common/ProductCard';
import LinkButton from '../../../components/pos/ui/LinkButton';
import { AuthContext } from '../../../context/AuthContext';
import { ProductContext } from '../../../context/ProductContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function Products() {
  const { user , token} = useContext(AuthContext)
  const role = user.role
  const { fetchProducts, products, productsLoading } = useContext(ProductContext)
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const handleDelete = async (productID) => {
   try {
    const {data} = await axios.delete(`${backendURL}/api/products/${productID}` , {headers: {token}})
    if(data.success){
      await fetchProducts()
      toast.success(data.message)
    }else{
      toast.error(data.message)
    }
   } catch (error) {
  toast.error("Something went wrong. PLease try again.")  
   }
  }
  useEffect(()=>{
    fetchProducts()
  },[])
  return (
    <div className='flex flex-col'>
      <div className='flex gap-2 items-center'>
        <LinkButton link={'/pos/products/addProduct'}><Plus />Add new product</LinkButton>

        <LinkButton link={'/pos/products/category'}>
          Manage Category
        </LinkButton>
      </div>
      <div className='my-3'>
        {products.length === 0 && <p>No product found...</p>}
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7 my-3'>
        {productsLoading ? (
          <p>Loading...</p>
        ) : (
          products.map((p , index) => (
            <ProductCard
              key={index}
              product={p}
              showActions={true}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Products