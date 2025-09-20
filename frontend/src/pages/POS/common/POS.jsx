import React from 'react'
import ProductCard from '../../../components/common/ProductCard'
import logo from '../../../assets/logo.png'
import CategoryIcon from '../../../components/common/CategoryIcon';
import CartProduct from '../../../components/common/CartProduct';

function POS() {
  const role = "admin"
  const productData = { name: "Pizza", price: 12, description: "Food", image: logo };
  const handleAddToCart = () => {

  }
  return (
    <div className='flex h-full'>
      <div className='flex flex-col w-2/3' >
        <div className='flex-none p-3 rounded flex gap-2'>
          <CategoryIcon image={logo} name="Pizza" selected={true} />
          <CategoryIcon image={logo} name="Burger" />
        </div>
        <div className='flex-1 overflow-y-auto'>
          <div className='grid grid-cols-3 gap-3 p-3'>
            <ProductCard
              product={productData}
              showActions={false}         // hide Edit + Delete
              showAddToCart={true}        // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false}         // hide Edit + Delete
              showAddToCart={true}        // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false}         // hide Edit + Delete
              showAddToCart={true}        // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false}         // hide Edit + Delete
              showAddToCart={true}        // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false}         // hide Edit + Delete
              showAddToCart={true}        // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false}         // hide Edit + Delete
              showAddToCart={true}        // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false}         // hide Edit + Delete
              showAddToCart={true}        // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false}         // hide Edit + Delete
              showAddToCart={true}        // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false}         // hide Edit + Delete
              showAddToCart={true}        // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false}         // hide Edit + Delete
              showAddToCart={true}        // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false}         // hide Edit + Delete
              showAddToCart={true}        // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false}         // hide Edit + Delete
              showAddToCart={true}        // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false}         // hide Edit + Delete
              showAddToCart={true}        // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />
            <ProductCard
              product={productData}
              showActions={false}         // hide Edit + Delete
              showAddToCart={true}        // custom prop for order button
              showDescription={true}
              onAddToCart={handleAddToCart}
            />

          </div>
        </div>

      </div>
      <div className='flex flex-col  w-1/3 bg-white'>
        <div className="flex-none p-3 border-b sticky bg-white">
          <h2 className="text-lg font-semibold">Checkout</h2>
        </div>
        <div className='flex-1 overflow-y-auto p-3'>
          <div className='flex flex-col gap-2'>
            <CartProduct img={logo} name="Strips Chips N' Dips" quantity="3" price="350" />
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

        <div className="flex-none p-3 border-t mt-3 bg-white">
          <div className='flex flex-row justify-between mb-3'>
            <p>Total :</p>
            <p>Rs. 3205</p>
          </div>
          <button className="w-full bg-green-600 text-white py-2 rounded-lg">
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default POS