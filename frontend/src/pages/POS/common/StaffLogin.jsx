import React, { useContext, useState } from 'react'
import logo from '../../../assets/logo.png'
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext'
import { toast } from "react-toastify";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function StaffLogin() {
    const { loading, user ,setToken ,setUser,  setLoading } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
      console.log("entered into handle submit function")
      console.log("now going to check email and password")
        if (!email || !password) {
          toast.error("Please fill in all fields");
          return;
        }
      
        const backendURL = import.meta.env.VITE_BACKEND_URL;
        console.log("backend url stored" , backendURL)
      
        try {
          setLoading(true);
          console.log("going to hit api")
          const { data } = await axios.post(`${backendURL}/api/users/login`, { email, password });
          console.log("after hitting api")
          if (data.success) {
            // Save token
            console.log("api hitted and got successfull")
            console.log("storing token in local storage")
            localStorage.setItem("token", data.token);
            console.log("stored token in local storage")
            console.log("now seting token state")
            setToken(data.token);
            console.log("token is setetd in state")
            // Decode immediately
            console.log("decoding jwt token to get user data")
            const decoded = jwtDecode(data.token);
            // Update user in context
            // (You need setUser in AuthContext for this to work)
            console.log("going to decoded and store in the set user")
            setUser({ id: decoded.id, role: decoded.role });
            console.log("decoded and store in the set user")
      
            toast.success(data.message);
      
            // Navigate based on role
            if (decoded.role === "admin") {
              navigate("/pos/dashboard");
            } else if (decoded.role === "cashier" || decoded.role === "waiter") {
              navigate("/pos");
            } else if (decoded.role === "kitchen") {
              navigate("/pos/orders");
            }
      
          } else {
            toast.error(data.message);
            console.log("api shows error becasu enot succesfully hited")
          }
      
        } catch (error) {
            console.log("shwoing try cath error")
          // Show backend message if exists
          if (error.response && error.response.data?.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Login failed. Please try again.");
          }
        } finally {
          setLoading(false);
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
                    <button  type="submit" className='bg-blue-600 w-75 py-2 rounded text-white cursor-pointer'>{loading ? "loading..." : "Login" }</button>
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