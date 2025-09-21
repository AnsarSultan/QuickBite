import React, { useContext, useState } from 'react'
import logo from '../../../assets/logo.png'
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext'
import { toast } from "react-toastify";

function StaffLogin() {
    const { login, loading, user } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    console.log("page loaded")
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("emntre into handle submit")
    
        if (!email || !password) {

          toast.error("Please fill in all fields");
          return;
        }
        console.log("checked email and password")
        console.log("login api hitting")
        await login(email, password);
        console.log("api hittwed")
      
        if (user) {
          toast.success("Login successful!");
          navigate("/pos/dashboard"); 
        }
      };
    

    return (
        <div className='h-screen w-full bg-stone-100 flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='w-1/3 bg-white flex flex-col items-center rounded-xl shadow-xl pb-9'>
                <img src={logo} className='w-30' alt="" />
                <div className='flex flex-col py-1 gap-1'>
                    <label htmlFor="email">Enter email address:</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name='email' className='bg-stone-100 border border-stone-800 rounded p-2 w-75' />
                </div>
                <div className='flex flex-col py-1 gap-1'>
                    <label htmlFor="password">Enter password:</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name='password' className='bg-stone-100 border border-stone-800 rounded p-2 w-75' />
                </div>
                <div className='my-2'>
                    <button  type="submit" className='bg-blue-600 w-75 py-2 rounded text-white cursor-pointer'>Login</button>
                </div>
                <div className='flex gap-1'>
                    <p className='font-semibold'>Forgot password?</p>
                    <NavLink to='/pos/staff/forgot-password' className='text-blue-600 underline cursor-pointer'>Reset password</NavLink>
                </div>
            </form>
        </div>
    )
}

export default StaffLogin