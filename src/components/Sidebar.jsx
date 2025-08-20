import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

function Sidebar() {
    const navlinkClasses = "w-35 h-11 flex items-center justify-center my-2 rounded text-xl"
  return (
    <div className='w-1/7 bg-white flex flex-col items-center shadow-xl'>
        <img className='w-24' src={logo} alt="" />
        <NavLink to="/admin/dashboard" className={({isActive})=> `${navlinkClasses} ${isActive ? "bg-blue-500 text-white shadow-md" : "bg-stone-100 hover:bg-blue-100"}`}>Dashboard</NavLink>
        <NavLink to="/admin/orders" className={({isActive})=> `${navlinkClasses} ${isActive ? "bg-blue-500 text-white shadow-md" : "bg-stone-100 hover:bg-blue-100" }`}>Orders</NavLink>
        <NavLink to="/admin/orders" className={({isActive})=> `${navlinkClasses} ${isActive ? "bg-blue-500 text-white shadow-md" : "bg-stone-100 hover:bg-blue-100" }`}>POS</NavLink>
        <NavLink to="/admin/orders" className={({isActive})=> `${navlinkClasses} ${isActive ? "bg-blue-500 text-white shadow-md" : "bg-stone-100 hover:bg-blue-100" }`}>Products</NavLink>
        <NavLink to="/admin/orders" className={({isActive})=> `${navlinkClasses} ${isActive ? "bg-blue-500 text-white shadow-md" : "bg-stone-100 hover:bg-blue-100" }`}>Reports</NavLink>
        <NavLink to="/admin/orders" className={({isActive})=> `${navlinkClasses} ${isActive ? "bg-blue-500 text-white shadow-md" : "bg-stone-100 hover:bg-blue-100" }`}>Users</NavLink>
        <NavLink to="/admin/orders" className={({isActive})=> `${navlinkClasses} ${isActive ? "bg-blue-500 text-white shadow-md" : "bg-stone-100 hover:bg-blue-100" }`}>Settings</NavLink>
        <NavLink to="/admin/orders" className={({isActive})=> `${navlinkClasses} ${isActive ? "bg-blue-500 text-white shadow-md" : "bg-red-500 text-white hover:shadow-lg" }`}>Logout</NavLink>
    </div>
  )
}

export default Sidebar