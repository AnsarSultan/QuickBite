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
import { toast } from "react-toastify";
import axios from "axios";

function POS() {
  const { user, token } = useContext(AuthContext);
  const { addToCart, cart, increaseQty, decreaseQty, removeFromCart , clearCart } =
    useContext(CartContext);
  const role = user.role;
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const { products, productsLoading, fetchProducts } =
    useContext(ProductContext);
  const { categories, fetchCategories } = useContext(CategoryContext);

  const [showCheckout, setShowCheckout] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [userPromoCode, setUserPromoCode] = useState("");
  const [promoCodeApplied, setPromoCodeApplied] = useState(false);
  const [discountedTotal, setDiscountedTotal] = useState(null);
  const [promoDetails, setPromoDetails] = useState(null);
  const [loading , setLoading] = useState(false)

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const applyFilter = (categoryId) => {
    if (categoryId === "all") {
      setSelectedCategory("all");
      setFilterProducts(products);
    } else {
      setSelectedCategory(categoryId);
      setFilterProducts(
        products.filter((prod) => prod.category_id === categoryId)
      );
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
          products.filter(
            (prod) => prod.category_id === matchedCategory.category_id
          )
        );
      } else {
        setSelectedCategory("all");
        setFilterProducts(products);
      }
    }
  }, [categoryName, products, categories]);

  let totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const applyPromoCode = async (e) => {
    e.preventDefault();
    if (!userPromoCode) {
      toast.error("Enter Promo Code");
      return;
    }
  
    try {
      const { data } = await axios.get(
        `${backendURL}/api/promotions/${userPromoCode}`,
        { headers: { token } }
      );
  
      if (data.success) {
        const { type, value } = data.data;
  
        let newTotal = totalPrice;
        if (type === "flat") {
          newTotal = Math.max(0, totalPrice - value);
        } else if (type === "percentage") {
          newTotal = totalPrice - (totalPrice * value) / 100;
        }
  
        setDiscountedTotal(newTotal);
        setPromoDetails({ code: userPromoCode, value, type });
        setPromoCodeApplied(true);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(msg);
    }
  };
  


  const placeOrder = async ()=>{
    if(cart.length === 0){
      toast.error("Cart is Empty")
    }
    
    try {
      setLoading(true);
      const orderdata = {
        promotion_code: promoDetails ? promoDetails.code : null,
        items: cart.map((item)=>({
            product_id: item.product_id,
            quantity: item.quantity,
          })) 
      }

      
      const {data} = await axios.post(`${backendURL}/api/orders` , orderdata , {headers: {token}})
      if (data.success) {
        toast.success("Order placed successfully!");
        setDiscountedTotal(null);
        setPromoDetails(null);
        setPromoCodeApplied(false);
        setUserPromoCode("");
        clearCart()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong... please try again.")
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="flex h-full">
      <div className="flex flex-col w-full lg:w-2/3">
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

       
        <button
          onClick={() => setShowCheckout(true)}
          className="lg:hidden fixed right-5 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg"
        >
          Checkout
        </button>

       
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
                  POS={true}
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

    
      <div className="hidden lg:flex flex-col w-1/3 bg-white">
        <div className="flex-none p-3 border-b sticky bg-white">
          <h2 className="text-lg font-semibold">Checkout</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <div className="flex flex-col gap-2">
            {cart.length === 0 ? (
              <p>No items in cart</p>
            ) : (
              cart.map((item, index) => (
                <CartProduct
                  key={index}
                  onDecrease={decreaseQty}
                  onIncrease={increaseQty}
                  onRemoveItem={removeFromCart}
                  id={item.product_id}
                  img={item.image_url}
                  name={item.name}
                  quantity={item.quantity}
                  price={item.price * item.quantity}
                />
              ))
            )}
          </div>
        </div>
        {!promoCodeApplied && (
          <form
            onSubmit={applyPromoCode}
            className="flex items-center justify-center gap-1 py-2"
          >
            <label htmlFor="promocode" className="text-sm">
              Enter promo code:
            </label>
            <input
              type="text"
              name="promocode"
              id="promocode"
              value={userPromoCode}
              onChange={(e) => setUserPromoCode(e.target.value)}
              className="border rounded w-1/2"
              required
            />
            <button
              type="submit"
              className={`${role} text-white p-1 rounded cursor-pointer`}
            >
              Apply
            </button>
          </form>
        )}
        <div className="flex-none p-3 border-t mt-3 bg-white">
          {promoCodeApplied && promoDetails && (
            <div className="flex flex-row justify-between mb-3">
              <p>{promoDetails.code}</p>
              <p>
                {promoDetails.type === "flat"
                  ? `- Rs. ${promoDetails.value}`
                  : `- ${promoDetails.value}%`}
              </p>
            </div>
          )}
          <div className="flex flex-row justify-between mb-3">
            <p className="font-bold">Total :</p>
            <p className="font-bold">
              Rs. {discountedTotal !== null ? discountedTotal : totalPrice}
            </p>
          </div>
          <button onClick={placeOrder} className="w-full bg-green-500 hover:bg-green-600 cursor-pointer text-white py-2 rounded-lg">
            Confirm Order
          </button>
        </div>
      </div>

     
      {showCheckout && (
        <div className="fixed inset-0 bg-black/40 z-50">
          <div className="absolute right-0 top-0 h-full w-3/4 sm:w-1/2 bg-white shadow-xl flex flex-col">
            <div className="flex justify-between items-center p-3 border-b">
              <h2 className="text-lg font-semibold">Checkout</h2>
              <button onClick={() => setShowCheckout(false)}>✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              {cart.length === 0 ? (
                <p>No items in cart</p>
              ) : (
                cart.map((item, index) => (
                  <CartProduct
                  POS
                    key={index}
                    onDecrease={decreaseQty}
                    onIncrease={increaseQty}
                    onRemoveItem={removeFromCart}
                    id={item.product_id}
                    img={item.image_url}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price * item.quantity}
                  />
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
