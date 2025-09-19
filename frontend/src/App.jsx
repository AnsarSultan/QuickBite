import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Routes, Route, Navigate } from "react-router-dom";
import POSLayout from "./layouts/POSLayout";
import CustomerLayout from "./layouts/CustomerLayout";
import Dashboard from "./pages/POS/admin/Dashboard";
import Orders from "./pages/POS/common/Orders";
import POS from "./pages/POS/common/POS";
import Products from "./pages/POS/admin/Products";
import Reports from "./pages/POS/admin/Reports";
import Users from "./pages/POS/admin/Users";
import Settings from "./pages/POS/common/Settings";
import Home from "./pages/customer/Home";
import OrdersCustomer from "./pages/customer/Orders";
import StaffLogin from "./pages/POS/common/StaffLogin"
import StaffForgotPassword from "./pages/POS/common/StaffForgotPassword"
import StaffResetPassword from "./pages/POS/common/StaffResetPassword"
import AddProduct from "./pages/POS/admin/AddProduct"
import EditProduct from "./pages/POS/admin/EditProduct"
import Category from "./pages/POS/admin/Category";


function App() {
  return (
    <Routes>
      <Route path="/pos" element={<POSLayout />}>
        <Route index element={<POS />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="reports" element={<Reports />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
        <Route path="products/addProduct" element={<AddProduct />} />
        <Route path="products/editProduct/:id" element={<EditProduct />} />
        <Route path="products/category" element={<Category/>}/>
      </Route>
      <Route path="/pos/login" element={<StaffLogin />} />
      <Route path="/pos/staff/forgot-password" element={<StaffForgotPassword />} />
      <Route path="/pos/staff/reset-password" element={<StaffResetPassword />} />
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<Home />} />
        <Route path="/orders" element={<OrdersCustomer />} />
      </Route>
    </Routes>
  );
}

export default App;
