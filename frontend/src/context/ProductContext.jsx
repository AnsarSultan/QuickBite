import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const ProductContext = createContext();

const ProductProvider =  ({ children }) => {

    const [products , setProducts] = useState([])
    const [productsLoading , setProductsLoading] = useState(false);
    const [errors , setErrors] = useState(null);
    const {token} = useContext(AuthContext)

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const fetchProducts = async ()=>{
        try {
            setProductsLoading(true);
            const {data} = await axios.get(`${backendURL}/api/products`,{ headers:  {token}})
            if(data.success){
                setProducts(data.data)
                console.log(products)
            }
        } catch (err) {
            console.error("Error fetching categories:", err);
            setErrors("Failed to fetch categories");
        } finally {
            setProductsLoading(false);
        }
    }

    useEffect(()=>{
        fetchProducts()
    },[])
    return <ProductContext.Provider value={{fetchProducts, errors , productsLoading , products}}>{children}</ProductContext.Provider>;
};

export default ProductProvider;
