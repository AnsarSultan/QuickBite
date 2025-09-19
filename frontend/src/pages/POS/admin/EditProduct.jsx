import React from "react";
import { useParams , NavLink } from "react-router-dom";
import ProductForm from "../../../components/pos/ProductForm";

function EditProduct() {
  const { id } = useParams();
  const role = "admin"

  // In real app: fetch product from API or DB by id
  const productData = { name: "Pizza", price: 12, description: "Food" };

  return (
    <div className="p-1">
        <NavLink to='/pos/products' className={`bg-${role} text-white p-2 rounded`}>Cancel</NavLink>
      <h1 className="text-xl font-bold my-2">Edit Product</h1>
      <ProductForm mode="edit" product={productData} />
    </div>
  );
}

export default EditProduct;
