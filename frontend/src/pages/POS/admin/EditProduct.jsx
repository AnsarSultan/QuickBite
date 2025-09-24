import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../../../components/pos/ProductForm";
import LinkButton from "../../../components/pos/ui/LinkButton";
import { ProductContext } from "../../../context/ProductContext";

function EditProduct() {
  const { id } = useParams();
  const { products, fetchProducts, productsLoading } = useContext(ProductContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!products || products.length === 0) {
      fetchProducts();
    }
  }, []);

  useEffect(() => {
    if (products && products.length > 0) {
      const selected = products.find((p) => String(p.product_id) === String(id));
      setProduct(selected);
    }
  }, [products, id]);

  return (
    <div>
      <LinkButton link={"/pos/products"}>Cancel</LinkButton>
      <h1 className="text-xl font-bold my-2">Edit Product</h1>
      {productsLoading ? (
        "Loading..."
      ) : product ? (
        <ProductForm mode="edit" product={product} />
      ) : (
        "Product not found"
      )}
    </div>
  );
}

export default EditProduct;
