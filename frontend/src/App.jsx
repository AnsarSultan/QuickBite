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
import Unauthorized from "./pages/POS/common/Unauthorized"
import ProtectedRoute from "./context/ProtectedRoute";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path="/pos" element={<ProtectedRoute roles={["admin", "cashier", "waiter" , "kitchen"]}><POSLayout /></ProtectedRoute>}>
        <Route index element={<ProtectedRoute roles={["admin", "cashier", "waiter"]}> <POS /></ProtectedRoute>} />
        <Route path=":category" element={<ProtectedRoute roles={["admin", "cashier", "waiter"]}> <POS /></ProtectedRoute>} />
        <Route path="dashboard" element={<ProtectedRoute roles={["admin"]}> <Dashboard /></ProtectedRoute>} />
        <Route path="orders" element={<ProtectedRoute roles={["admin", "cashier", "waiter", "kitchen", "customer"]}> <Orders /></ProtectedRoute>} />
        <Route path="products" element={<ProtectedRoute roles={["admin"]}><Products /></ProtectedRoute>} />
        <Route path="reports" element={<ProtectedRoute roles={["admin"]}><Reports /></ProtectedRoute>} />
        <Route path="users" element={<ProtectedRoute roles={["admin"]}><Users /> </ProtectedRoute>} />
        <Route path="settings" element={<ProtectedRoute roles={["admin", "cashier", "waiter"]}> <Settings /></ProtectedRoute>} />
        <Route path="products/addProduct" element={<ProtectedRoute roles={["admin"]}> <AddProduct /></ProtectedRoute>} />
        <Route path="products/editProduct/:id" element={<ProtectedRoute roles={["admin"]}> <EditProduct /></ProtectedRoute>} />
        <Route path="products/category" element={<ProtectedRoute roles={["admin"]}><Category /></ProtectedRoute>} />
      </Route>
      <Route path="/pos/login" element={<StaffLogin />} />
      <Route path="/pos/staff/forgot-password" element={<StaffForgotPassword />} />
      <Route path="/pos/staff/reset-password" element={<StaffResetPassword />} />
      <Route path="/pos/unauthorized" element={<Unauthorized />} />
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<Home />} />
        <Route path="/orders" element={<OrdersCustomer />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
