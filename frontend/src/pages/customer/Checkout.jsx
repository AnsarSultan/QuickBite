import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

function Checkout() {
    const {cart} = useContext(CartContext)
  return (
    <div>
        {cart.length > 0 ? <div>

        </div> : <div>
            Your cart is empty...
        </div> }
    </div>
  )
}

export default Checkout