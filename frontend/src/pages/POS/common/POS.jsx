import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../../../components/common/ProductCard";
import logo from "../../../assets/logo.png";
import CategoryIcon from "../../../components/common/CategoryIcon";
import CartProduct from "../../../components/common/CartProduct";
import { AuthContext } from "../../../context/AuthContext";
import { ProductContext } from "../../../context/ProductContext";
import { CategoryContext } from "../../../context/CategoryContext";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";

function POS() {
  const { user } = useContext(AuthContext);
  const {addToCart , cart, increaseQty, decreaseQty, removeFromCart} = useContext(CartContext)
  const role = user.role;
  const { categoryName } = useParams();   
  const navigate = useNavigate();

  const { products, productsLoading, fetchProducts } = useContext(ProductContext);
  const { categories, fetchCategories } = useContext(CategoryContext);

  const [showCheckout, setShowCheckout] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");


  const applyFilter = (categoryId) => {
    if (categoryId === "all") {
      setSelectedCategory("all");
      setFilterProducts(products);
      navigate("/pos"); 
    } else {
      setSelectedCategory(categoryId);
      setFilterProducts(products.filter((prod) => prod.category_id === categoryId));
      const cat = categories.find((c) => c.category_id === categoryId);
      if (cat) navigate(`/pos/${cat.name.toLowerCase()}`);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!products || !categories) return;

    if (!categoryName) {
      setSelectedCategory("all");
      setFilterProducts(products);
    } else {
      const matchedCategory = categories.find(
        (c) => c.name.toLowerCase() === categoryName.toLowerCase()
      );
      if (matchedCategory) {
        setSelectedCategory(matchedCategory.category_id);
        setFilterProducts(
          products.filter((prod) => prod.category_id === matchedCategory.category_id)
        );
      } else {
        setSelectedCategory("all");
        setFilterProducts(products);
      }
    }
  }, [categoryName, products, categories]);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <div className="flex h-full">
      <div className="flex flex-col w-full lg:w-2/3">
        {/* Category Icons */}
        <div className="flex-none p-3 w-full overflow-x-auto rounded flex gap-2">
          <CategoryIcon
            onClick={() => applyFilter("all")}
            name="All Products"
            selected={selectedCategory === "all"}
            image={null}
          />
          {categories.map((cat) => (
            <CategoryIcon
              key={cat.category_id}
              onClick={() => applyFilter(cat.category_id)}
              selected={selectedCategory === cat.category_id}
              image={cat.image_url}
              name={cat.name}
            />
          ))}
        </div>

        {/* Checkout Button (mobile) */}
        <button
          onClick={() => setShowCheckout(true)}
          className="lg:hidden fixed right-5 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg"
        >
          Checkout
        </button>

        {/* Products */}
        <div className="flex-1 overflow-y-auto">
          <div className="my-3">
            {products.length === 0 && <p>No product found.</p>}
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:gap-3 lg:p-3">
            {productsLoading ? (
              <p>Loading...</p>
            ) : (
              filterProducts.map((p) => (
                <ProductCard
                  product={p}
                  key={p.product_id}
                  showActions={false}
                  showAddToCart={true}
                  showDescription={true}
                  onAddToCart={addToCart}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Checkout Side Panel (desktop) */}
      <div className="hidden lg:flex flex-col w-1/3 bg-white">
        <div className="flex-none p-3 border-b sticky bg-white">
          <h2 className="text-lg font-semibold">Checkout</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <div className="flex flex-col gap-2">
            {cart.length === 0 ?  (<p>No items in cart</p>) : (
              cart.map((item , index)=>(
                <CartProduct key={index} onDecrease={decreaseQty} onIncrease={increaseQty} onRemoveItem={removeFromCart} id={item.product_id} img={item.image_url} name={item.name} quantity={item.quantity} price={item.price * item.quantity} />
              ))
            )}
            
          </div>
        </div>
        <div className="flex items-center justify-center gap-1 py-2">
          <label htmlFor="promocode" className="text-sm">Enter promo code:</label>
          <input
            type="text"
            name="promocode"
            id="promocode"
            className="border rounded w-1/2"
          />
          <button className={`${role} text-white p-1 rounded cursor-pointer`}>
            Apply
          </button>
        </div>
        <div className="flex-none p-3 border-t mt-3 bg-white">
          <div className="flex flex-row justify-between mb-3">
            <p className="font-bold">Total :</p>
            <p className="font-bold">Rs. {totalPrice}</p>
          </div>
          <button className="w-full bg-green-500 hover:bg-green-600 cursor-pointer text-white py-2 rounded-lg">
            Confirm Order
          </button>
        </div>
      </div>

      {/* Checkout Drawer (mobile) */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/40 z-50">
          <div className="absolute right-0 top-0 h-full w-3/4 sm:w-1/2 bg-white shadow-xl flex flex-col">
            <div className="flex justify-between items-center p-3 border-b">
              <h2 className="text-lg font-semibold">Checkout</h2>
              <button onClick={() => setShowCheckout(false)}>✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
            {cart.length === 0 ?  (<p>No items in cart</p>) : (
              cart.map((item , index)=>(
                <CartProduct key={index} onDecrease={decreaseQty} onIncrease={increaseQty} onRemoveItem={removeFromCart} id={item.product_id} img={item.image_url} name={item.name} quantity={item.quantity} price={item.price * item.quantity} />
              ))
            )}
            </div>
            <div className="p-3 border-t">
              <div className="flex justify-between mb-3">
                <p className="font-bold">Total:</p>
                <p className="font-bold">Rs. {totalPrice}</p>
              </div>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default POS;
