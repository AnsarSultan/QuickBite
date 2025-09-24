import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext.jsx";
import CategoryProvider from "./context/CategoryContext.jsx";
import ProductProvider from "./context/ProductContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CategoryProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </CategoryProvider>
    </AuthProvider>
  </BrowserRouter>
);
