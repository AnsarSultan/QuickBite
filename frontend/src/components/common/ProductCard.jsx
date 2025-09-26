import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function ProductCard({ product, showActions, showAddToCart, onDelete, onAddToCart , showDescription }) {
  const {user} = useContext(AuthContext)
    const role = user.role;
    return (
      <div className="w-50 bg-white shadow-md rounded-xl p-4">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-30 object-cover rounded-md"
        />
  
        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
       {showDescription && <p className="text-gray-600">{product.description}</p>}
        <p className="text-gray-600">Rs.{product.price}</p>
  
        {showActions && (
          <div className="flex justify-between mt-3">
            <NavLink to={`/pos/products/editProduct/${product.product_id}`} className="bg-blue-500 text-white px-3 py-1 rounded-lg">
              Edit
            </NavLink>
            <button onClick={() => onDelete(product.product_id)} className="bg-red-500 text-white px-3 py-1 rounded-lg cursor-pointer">
              Delete
            </button>
          </div>
        )}
  
        
        {showAddToCart && (
          <button 
            onClick={() => onAddToCart(product)} 
            className={`${role} text-white px-4 py-2 mt-3 rounded-lg w-full cursor-pointer`}
          >
            Add to Cart
          </button>
        )}
      </div>
    );
  }

export default ProductCard