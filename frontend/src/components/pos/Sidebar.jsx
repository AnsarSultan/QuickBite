import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.png'

function Sidebar() {
    const navlinkClasses = "w-full h-11 flex items-center justify-center my-2 rounded text-xl"
  return (
    <div className='w-48 bg-white flex flex-col items-center shadow-xl p-4'>
        <img className='w-24' src={logo} alt="" />
        <NavLink to="/dashboard" className={({isActive})=> `${navlinkClasses} ${isActive ? "bg-admin text-white shadow-md" : "bg-stone-100 hover:bg-Hadmin"}`}>Dashboard</NavLink>
        <NavLink to="/orders" className={({isActive})=> `${navlinkClasses} ${isActive ? "bg-admin text-white shadow-md" : "bg-stone-100 hover:bg-Hadmin" }`}>Orders</NavLink>
        <NavLink to="/pos" className={({isActive})=> `${navlinkClasses} ${isActive ? "bg-admin text-white shadow-md" : "bg-stone-100 hover:bg-Hadmin" }`}>POS</NavLink>
        <NavLink to="/products" className={({isActive})=> `${navlinkClasses} ${isActive ? "bg-admin text-white shadow-md" : "bg-stone-100 hover:bg-Hadmin" }`}>Products</NavLink>
        <NavLink to="/reports" className={({isActive})=> `${navlinkClasses} ${isActive ? "bg-admin text-white shadow-md" : "bg-stone-100 hover:bg-Hadmin" }`}>Reports</NavLink>
        <NavLink to="/users" className={({isActive})=> `${navlinkClasses} ${isActive ? "bg-admin text-white shadow-md" : "bg-stone-100 hover:bg-Hadmin" }`}>Users</NavLink>
        <NavLink to="/settings" className={({isActive})=> `${navlinkClasses} ${isActive ? "bg-admin text-white shadow-md" : "bg-stone-100 hover:bg-Hadmin" }`}>Settings</NavLink>
        <button className="w-full h-11 flex items-center justify-center my-2 rounded text-xl cursor-pointer bg-red-500 text-white hover:shadow-xl">Logout</button>
    </div>
  )
}

export default Sidebar