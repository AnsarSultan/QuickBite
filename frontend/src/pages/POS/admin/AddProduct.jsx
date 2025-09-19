import React from "react";
import ProductForm from "../../../components/pos/ProductForm";
import LinkButton from "../../../components/pos/ui/LinkButton";

function AddProduct() {
  return (
    <div>
      <LinkButton link={'/pos/products' }>Back</LinkButton>
        
      <h1 className="text-xl font-bold my-2">Add New Product</h1>
      <ProductForm mode="add" />
    </div>
  );
}

export default AddProduct;
