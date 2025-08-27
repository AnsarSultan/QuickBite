import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Routes, Route , Navigate  } from "react-router-dom";
import POSLayout from "./layouts/POSLayout";
import Dashboard from "./pages/admin/Dashboard";
import Orders from "./pages/common/Orders";
import POS from "./pages/common/POS";
import Products from "./pages/admin/Products";
import Reports from "./pages/admin/Reports";
import Users from "./pages/admin/Users";
import Settings from "./pages/common/Settings";

function App() {

  return (
    <Routes>
      <Route path="/admin" element={<POSLayout />}>
        <Route index element={<Navigate to="dashboard" replace/>} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="orders" element={<Orders/>} />
        <Route path="pos" element={<POS/>}/>
        <Route path="products" element={<Products/>}/>
        <Route path="reports" element={<Reports/>}/>
        <Route path="users" element={<Users/>}/>
        <Route path="settings" element={<Settings/>}/>
      </Route>
    </Routes>
  );
}

export default App;
