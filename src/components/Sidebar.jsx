import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

function Sidebar() {
    const navlinkClasses = "w-full h-11 flex items-center justify-center my-2 rounded text-xl"
  return (
    <div className='w-48 bg-white flex flex-col items-center shadow-xl p-4'>
        <img className='w-24' src={logo} alt="" />
        <NavLink to="/admin/dashboard" className={({isActive})=> `${navlinkClasses} ${isActive ? "bg-admin text-white shadow-md" : "bg-stone-100 hover:bg-Hadmin"}`}>Dashboard</NavLink>
        <NavLink to="/admin/orders" className={({isActive})=> `${navlinkClasses} ${isActive ? "bg-admin text-white shadow-md" : "bg-stone-100 hover:bg-Hadmin" }`}>Orders</NavLink>
        <NavLink to="/admin/pos" className={({isActive})=> `${navlinkClasses} ${isActive ? "bg-admin text-white shadow-md" : "bg-stone-100 hover:bg-Hadmin" }`}>POS</NavLink>
        <NavLink to="/admin/products" className={({isActive})=> `${navlinkClasses} ${isActive ? "bg-admin text-white shadow-md" : "bg-stone-100 hover:bg-Hadmin" }`}>Products</NavLink>
        <NavLink to="/admin/reports" className={({isActive})=> `${navlinkClasses} ${isActive ? "bg-admin text-white shadow-md" : "bg-stone-100 hover:bg-Hadmin" }`}>Reports</NavLink>
        <NavLink to="/admin/users" className={({isActive})=> `${navlinkClasses} ${isActive ? "bg-admin text-white shadow-md" : "bg-stone-100 hover:bg-Hadmin" }`}>Users</NavLink>
        <NavLink to="/admin/settings" className={({isActive})=> `${navlinkClasses} ${isActive ? "bg-admin text-white shadow-md" : "bg-stone-100 hover:bg-Hadmin" }`}>Settings</NavLink>
        <button className="w-full h-11 flex items-center justify-center my-2 rounded text-xl cursor-pointer bg-red-500 text-white hover:shadow-xl">Logout</button>
    </div>
  )
}

export default Sidebar