import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { ShoppingBag } from 'lucide-react';

function Navbar() {
    const navbarClasses = "text-white bg-stone-800 font-semibold text-lg px-4 border-2 rounded"
    return (
        <>
            <div className="w-full h-24 flex flex-row items-center justify-between px-12 py-8">
                <div className="flex flex-row items-center gap-6">
                    <img className="w-30" src={logo} alt="" />
                    <div className="w-full flex flex-row items-center gap-6">
                        <NavLink to='/' className={({isActive})=> `${navbarClasses}  ${isActive ? " border-red-500" : "border-transparent"}`}>HOME</NavLink>
                        <NavLink to='/orders' className={({isActive})=> `${navbarClasses}  ${isActive ? " border-red-500" : "border-transparent"}`}>ORDERS</NavLink>
                    </div>
                </div>
                <div>
                    <ShoppingBag size={30} />
                </div>
            </div>
        </>
    );
}

export default Navbar;
