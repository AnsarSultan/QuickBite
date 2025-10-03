import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { ShoppingBag } from "lucide-react";
import { CartContext } from "../../context/CartContext";
import CartProduct from "../common/CartProduct";

function Navbar() {
  const { cart, increaseQty, decreaseQty, removeFromCart } =
    useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

  const navbarClasses =
    "text-white bg-stone-800 font-semibold text-lg px-4 border-2 rounded";

  let totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <div className="w-full h-24 flex flex-row items-center justify-between px-12 py-8">
        <div className="flex flex-row items-center gap-6">
          <img className="w-30" src={logo} alt="" />
          <div className="w-full flex flex-row items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${navbarClasses} ${
                  isActive ? "border-red-500" : "border-transparent"
                }`
              }
            >
              HOME
            </NavLink>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `${navbarClasses} ${
                  isActive ? "border-red-500" : "border-transparent"
                }`
              }
            >
              TRACK ORDERS
            </NavLink>
          </div>
        </div>

        <div className="relative inline-block">
          <ShoppingBag
            size={30}
            className="cursor-pointer"
            onClick={() => setShowCart(true)}
          />
          <span className="absolute -top-2 -right-2 text-white bg-red-500 w-5 h-5 flex items-center justify-center rounded-full font-bold text-xs">
            {cart.length}
          </span>
        </div>
      </div>

      {showCart && (
        <div className="fixed inset-0 bg-black/40 z-50">
          <div className="absolute right-0 top-0 h-full w-3/4 sm:w-1/2 bg-white shadow-xl flex flex-col text-black">
            <div className="flex justify-between items-center p-3 border-b">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <button
                className="cursor-pointer"
                onClick={() => setShowCart(false)}
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
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
            <div className="p-3 border-t">
              <div className="flex justify-between mb-3">
                <p className="font-bold">Total:</p>
                <p className="font-bold">Rs. {totalPrice}</p>
              </div>
              <NavLink
                to="/checkout"
                className="block w-full text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg cursor-pointer"
              >
                Checkout
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
