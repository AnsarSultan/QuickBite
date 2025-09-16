import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Routes, Route , Navigate  } from "react-router-dom";
import POSLayout from "./layouts/POSLayout"
import CustomerLayout from './layouts/CustomerLayout'
import Dashboard from "./pages/POS/admin/Dashboard";
import Orders from "./pages/POS/common/Orders";
import POS from "./pages/POS/common/POS";
import Products from "./pages/POS/admin/Products";
import Reports from "./pages/POS/admin/Reports";
import Users from "./pages/POS/admin/Users";
import Settings from "./pages/POS/common/Settings";
import Home from "./pages/customer/Home";

function App() {

  return (
    <Routes>
      <Route path="/" element={<POSLayout />}>
        <Route index element={<Navigate to="dashboard" replace/>} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="orders" element={<Orders/>} />
        <Route path="pos" element={<POS/>}/>
        <Route path="products" element={<Products/>}/>
        <Route path="reports" element={<Reports/>}/>
        <Route path="users" element={<Users/>}/>
        <Route path="settings" element={<Settings/>}/>
      </Route>
      <Route path="/" element={<CustomerLayout/>}>
        <Route>
          <Route index element={<Home/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
