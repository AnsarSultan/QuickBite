import { createContext, useState } from "react";


export const CartContext = createContext()

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prev)=>{
            const existing = prev.find((item)=>item.product_id === product.product_id)
            if(existing){
                return prev.map((item)=>
                item.product_id === product.product_id ? {...item, quantity: item.quantity+1} : item); 
            }else{
                return [...prev, {...product, quantity: 1}]
            }
        })
    }

    const increaseQty = (id) => {
        setCart((prev)=> prev.map((item)=> item.product_id === id ? {...item , quantity: item.quantity+1} : item))
    }

    const decreaseQty = (id) => {
        setCart((prev) =>
        prev.map((item) =>
          item.product_id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }

    const removeFromCart = (id)=>{
        setCart((prev) => prev.filter((item) => item.product_id !== id));
    }


    return <CartContext.Provider value={{cart, addToCart, increaseQty, decreaseQty, removeFromCart}}>
        {children}
    </CartContext.Provider>
}

export default CartProvider