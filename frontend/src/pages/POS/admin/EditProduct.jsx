import React from "react";
import { useParams , NavLink } from "react-router-dom";
import ProductForm from "../../../components/pos/ProductForm";
import LinkButton from "../../../components/pos/ui/LinkButton";

function EditProduct() {
  const { id } = useParams();

  // In real app: fetch product from API or DB by id
  const productData = { name: "Pizza", price: 12, description: "Food" };

  return (
    <div>
      <LinkButton link={'/pos/products'}>Cancel</LinkButton>
      <h1 className="text-xl font-bold my-2">Edit Product</h1>
      <ProductForm mode="edit" product={productData} />
    </div>
  );
}

export default EditProduct;
