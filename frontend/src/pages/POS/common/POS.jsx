import React from 'react'
import ProductCard from '../../../components/common/ProductCard'
import logo from '../../../assets/logo.png'
import CategoryIcon from '../../../components/common/CategoryIcon';

function POS() {
  const role = "admin"
  const productData = { name: "Pizza", price: 12, description: "Food", image: logo };
  const handleAddToCart = () => {

  }
  return (
    <div>
      <div className='flex gap-2'>
        <CategoryIcon image={logo} name="Pizza" selected={true}/>
        <CategoryIcon image={logo} name="Burger"/>
      </div>
      <div className='grid grid-cols-4 gap-3 p-3'>
        <ProductCard
          product={productData}
          showActions={false}         // hide Edit + Delete
          showAddToCart={true}        // custom prop for order button
          showDescription = {true}
          onAddToCart={handleAddToCart}
        />
        <ProductCard
          product={productData}
          showActions={false}         // hide Edit + Delete
          showAddToCart={true}        // custom prop for order button
          showDescription = {true}
          onAddToCart={handleAddToCart}
        />
        <ProductCard
          product={productData}
          showActions={false}         // hide Edit + Delete
          showAddToCart={true}        // custom prop for order button
          showDescription = {true}
          onAddToCart={handleAddToCart}
        />
        <ProductCard
          product={productData}
          showActions={false}         // hide Edit + Delete
          showAddToCart={true}        // custom prop for order button
          showDescription = {true}
          onAddToCart={handleAddToCart}
        />
        <ProductCard
          product={productData}
          showActions={false}         // hide Edit + Delete
          showAddToCart={true}        // custom prop for order button
          showDescription = {true}
          onAddToCart={handleAddToCart}
        />
        <ProductCard
          product={productData}
          showActions={false}         // hide Edit + Delete
          showAddToCart={true}        // custom prop for order button
          showDescription = {true}
          onAddToCart={handleAddToCart}
        />
        <ProductCard
          product={productData}
          showActions={false}         // hide Edit + Delete
          showAddToCart={true}        // custom prop for order button
          showDescription = {true}
          onAddToCart={handleAddToCart}
        />
        <ProductCard
          product={productData}
          showActions={false}         // hide Edit + Delete
          showAddToCart={true}        // custom prop for order button
          showDescription = {true}
          onAddToCart={handleAddToCart}
        />
        <ProductCard
          product={productData}
          showActions={false}         // hide Edit + Delete
          showAddToCart={true}        // custom prop for order button
          showDescription = {true}
          onAddToCart={handleAddToCart}
        />
        <ProductCard
          product={productData}
          showActions={false}         // hide Edit + Delete
          showAddToCart={true}        // custom prop for order button
          showDescription = {true}
          onAddToCart={handleAddToCart}
        />
        <ProductCard
          product={productData}
          showActions={false}         // hide Edit + Delete
          showAddToCart={true}        // custom prop for order button
          showDescription = {true}
          onAddToCart={handleAddToCart}
        />
        <ProductCard
          product={productData}
          showActions={false}         // hide Edit + Delete
          showAddToCart={true}        // custom prop for order button
          showDescription = {true}
          onAddToCart={handleAddToCart}
        />
        <ProductCard
          product={productData}
          showActions={false}         // hide Edit + Delete
          showAddToCart={true}        // custom prop for order button
          showDescription = {true}
          onAddToCart={handleAddToCart}
        />
        <ProductCard
          product={productData}
          showActions={false}         // hide Edit + Delete
          showAddToCart={true}        // custom prop for order button
          showDescription = {true}
          onAddToCart={handleAddToCart}
        />
       
      </div>
    </div>
  )
}

export default POS