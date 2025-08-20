import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Routes, Route , Navigate  } from "react-router-dom";
import POSLayout from "./layouts/POSLayout";
import Dashboard from "./pages/admin/Dashboard";
import Orders from "./pages/common/Orders";

function App() {

  return (
    <Routes>
      <Route path="/admin" element={<POSLayout />}>
        <Route index element={<Navigate to="dashboard" replace/>} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="orders" element={<Orders/>} />
      </Route>
    </Routes>
  );
}

export default App;
