import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.png'

function Sidebar() {
  const role= "cashier";
  const acitveClasses = `${role} text-white shadow-md`;
  const nonActiveClasses = `bg-stone-100 H${role}`;
    const navlinkClasses = "w-full h-11 flex items-center justify-center my-2 rounded text-xl"
  return (
    <div className='w-48 bg-white flex flex-col items-center shadow-xl p-4'>
        <img className='w-24' src={logo} alt="" />
        <NavLink to="/pos/dashboard" className={({isActive})=> `${navlinkClasses} ${isActive ? `${acitveClasses}` : `${nonActiveClasses}`}`}>Dashboard</NavLink>
        <NavLink to="/pos/orders" className={({isActive})=> `${navlinkClasses} ${isActive ? `${acitveClasses}` : `${nonActiveClasses}` }`}>Orders</NavLink>
        <NavLink to="/pos" end className={({isActive})=> `${navlinkClasses} ${isActive ? `${acitveClasses}` : `${nonActiveClasses}` }`}>POS</NavLink>
        <NavLink to="/pos/products" className={({isActive})=> `${navlinkClasses} ${isActive ? `${acitveClasses}` : `${nonActiveClasses}` }`}>Products</NavLink>
        <NavLink to="/pos/reports" className={({isActive})=> `${navlinkClasses} ${isActive ? `${acitveClasses}` : `${nonActiveClasses}` }`}>Reports</NavLink>
        <NavLink to="/pos/users" className={({isActive})=> `${navlinkClasses} ${isActive ? `${acitveClasses}` : `${nonActiveClasses}` }`}>Users</NavLink>
        <NavLink to="/pos/settings" className={({isActive})=> `${navlinkClasses} ${isActive ? `${acitveClasses}` : `${nonActiveClasses}` }`}>Settings</NavLink>
        <button className="w-full h-11 flex items-center justify-center my-2 rounded text-xl cursor-pointer bg-red-500 text-white hover:shadow-xl">Logout</button>
    </div>
  )
}

export default Sidebar