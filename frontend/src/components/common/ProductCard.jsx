import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function ProductCard({
  product,
  showActions,
  showAddToCart,
  onDelete,
  onAddToCart,
  showDescription,
  POS,
}) {
  const { user } = useContext(AuthContext);
  const role = user?.role || "customer";
  let cardColor;
  let textColor;
  if (POS) {
    cardColor = "bg-white ";
    textColor = "text-black ";
  } else {
    cardColor = "bg-stone-800 ";
    textColor = "text-white ";
  }
  return (
    <div className={`${cardColor} w-50 shadow-md rounded-xl p-1`}>
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-30 object-cover rounded-md"
      />
      <div className="p-2">
        <div className={`${textColor}`}>
          <h3 className="text-l font-bold">{product.name}</h3>

          {showDescription && (
            <p className="font-normal">{product.description}</p>
          )}
          <p className="font-bold">Rs.{product.price}</p>
        </div>

        {showActions && (
          <div className="flex justify-between mt-3">
            <NavLink
              to={`/pos/products/editProduct/${product.product_id}`}
              className="bg-blue-500 text-white px-3 py-1 rounded-lg"
            >
              Edit
            </NavLink>
            <button
              onClick={() => onDelete(product.product_id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg cursor-pointer"
            >
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
    </div>
  );
}

export default ProductCard;
