import React from "react";
import ProductForm from "../../../components/pos/ProductForm";
import {NavLink} from "react-router-dom"

function AddProduct() {
    const role = "admin"
  return (
    <div className="p-1">
        <NavLink to='/pos/products' className={`bg-${role} text-white p-2 rounded`}>Back</NavLink>
      <h1 className="text-xl font-bold my-2">Add New Product</h1>
      <ProductForm mode="add" />
    </div>
  );
}

export default AddProduct;
