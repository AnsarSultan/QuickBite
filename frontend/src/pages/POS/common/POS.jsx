import React, { useContext, useState } from "react";
import ProductCard from "../../../components/common/ProductCard";
import logo from "../../../assets/logo.png";
import CategoryIcon from "../../../components/common/CategoryIcon";
import CartProduct from "../../../components/common/CartProduct";
import { AuthContext } from "../../../context/AuthContext";

function POS() {
  const {user} = useContext(AuthContext)
  const role = user.role;
  const productData = {
    name: "Pizza",
    price: 12,
    description: "Food",
    image: logo,
  };
  const [showCheckout, setShowCheckout] = useState(false);
  const handleAddToCart = () => {};
  return (
    <div className="flex h-full">
      <div className="flex flex-col w-full lg:w-2/3">
        <div className="flex-none p-3 w-full overflow-x-auto rounded flex gap-2">
          <CategoryIcon image={logo} name="Pizza" selected={true} />
          <CategoryIcon image={logo} name="Burger" />
          <CategoryIcon image={logo} name="Burger" />
          <CategoryIcon image={logo} name="Burger" />
          <CategoryIcon image={logo} name="Burger" />
          <CategoryIcon image={logo} name="Burger" />
          <CategoryIcon image={logo} name="Burger" />
          <CategoryIcon image={logo} name="Burger" />
          <CategoryIcon image={logo} name="Burger" />
        </div>
        <button
          onClick={() => setShowCheckout(true)}
          className="lg:hidden fixed  right-5 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg"
        >
          Checkout
        </button>
        <div className="flex-1 overflow-y-auto">
          <div className="grid  grid-cols-2 gap-6 md:grid-cols-3 lg:gap-3 lg:p-3">
            <ProductCard
              product={productData}
              showActions={false} // hide Edit + Delete
              showAddToCart={true} // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false} // hide Edit + Delete
              showAddToCart={true} // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false} // hide Edit + Delete
              showAddToCart={true} // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false} // hide Edit + Delete
              showAddToCart={true} // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false} // hide Edit + Delete
              showAddToCart={true} // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false} // hide Edit + Delete
              showAddToCart={true} // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false} // hide Edit + Delete
              showAddToCart={true} // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false} // hide Edit + Delete
              showAddToCart={true} // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false} // hide Edit + Delete
              showAddToCart={true} // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false} // hide Edit + Delete
              showAddToCart={true} // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false} // hide Edit + Delete
              showAddToCart={true} // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false} // hide Edit + Delete
              showAddToCart={true} // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false} // hide Edit + Delete
              showAddToCart={true} // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false} // hide Edit + Delete
              showAddToCart={true} // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
      <div className="hidden lg:flex flex-col w-1/3 bg-white">
        <div className="flex-none p-3 border-b sticky bg-white">
          <h2 className="text-lg font-semibold">Checkout</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <div className="flex flex-col gap-2">
            <CartProduct
              img={logo}
              name="Strips Chips N' Dips"
              quantity="3"
              price="350"
            />
            <CartProduct img={logo} name="pizza" quantity="3" price="350" />
            <CartProduct img={logo} name="pizza" quantity="3" price="350" />
            <CartProduct img={logo} name="pizza" quantity="3" price="350" />
            <CartProduct img={logo} name="pizza" quantity="3" price="350" />
            <CartProduct img={logo} name="pizza" quantity="3" price="350" />
            <CartProduct img={logo} name="pizza" quantity="3" price="350" />
            <CartProduct img={logo} name="pizza" quantity="3" price="350" />
            <CartProduct img={logo} name="pizza" quantity="3" price="350" />
            <CartProduct img={logo} name="pizza" quantity="3" price="350" />
            <CartProduct img={logo} name="pizza" quantity="3" price="350" />
            <CartProduct img={logo} name="pizza" quantity="3" price="350" />
            <CartProduct img={logo} name="pizza" quantity="3" price="350" />
            <CartProduct img={logo} name="pizza" quantity="3" price="350" />
            <CartProduct img={logo} name="pizza" quantity="3" price="350" />
            <CartProduct img={logo} name="pizza" quantity="3" price="350" />
            <CartProduct img={logo} name="pizza" quantity="3" price="350" />
            <CartProduct img={logo} name="pizza" quantity="3" price="350" />
            <CartProduct img={logo} name="pizza" quantity="3" price="350" />
            <CartProduct img={logo} name="pizza" quantity="3" price="350" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 py-3">
          <label htmlFor="promocode">Enter promo code:</label>
          <input
            type="text"
            name="promocode"
            id="promocode"
            className="border rounded p-1"
          />
          <button className={`${role} text-white p-2 rounded cursor-pointer`}>
            Apply
          </button>
        </div>
        <div className="flex-none p-3 border-t mt-3 bg-white">
          <div className="flex flex-row justify-between mb-3">
            <p className="font-bold">Total :</p>
            <p className="font-bold">Rs. 3205</p>
          </div>
          <button className="w-full bg-green-500 hover:bg-green-600 cursor-pointer text-white py-2 rounded-lg">
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
              <CartProduct img={logo} name="Pizza" quantity="3" price="350" />
            </div>
            <div className="p-3 border-t">
              <div className="flex justify-between mb-3">
                <p className="font-bold">Total:</p>
                <p className="font-bold">Rs. 3205</p>
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
