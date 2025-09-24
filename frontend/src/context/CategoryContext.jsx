import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [error, setError] = useState(null);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const fetchCategories = async () => {
      try {
          setCategoryLoading(true);
          const {data} = await axios.get(`${backendURL}/api/products/category`);
          if (data.success) {
              setCategories(data.data);
            }
        } catch (err) {
            console.error("Error fetching categories:", err);
            setError("Failed to fetch categories");
        } finally {
            setCategoryLoading(false);
        }
    };
    useEffect(()=>{
        fetchCategories();
    },[] )
  
  return (
    <CategoryContext.Provider value={{ categories, categoryLoading, error , fetchCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
