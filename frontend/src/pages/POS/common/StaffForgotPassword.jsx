import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import logo from '../../../assets/logo.png'
import { NavLink } from 'react-router-dom'

function StaffForgotPassword() {
    
    const navigate = useNavigate();
    const [email , setEmail] = useState('')
    const [loading, setLoading] = useState(false);
    const handleVerify = async (e) => {
        e.preventDefault();
        if (!email) return toast.error("Please enter email address.");
    
        try {
          setLoading(true);
          const backendURL = import.meta.env.VITE_BACKEND_URL;
          const { data } = await axios.post(`${backendURL}/api/users/forgot-password`, { email });
    
          if (data.success) {
            toast.success("OTP sent Successfully");
            navigate("/pos/staff/reset-password" , { state: { email } });
          } else {
            toast.error(data.message);
          }
        } catch (error) {
            if (error.response) {
            if (error.response.data?.errors) {
                error.response.data.errors.forEach((err) => {
                  toast.error(err.msg);  
                });
              }
              else if (error.response.data?.message) {
                toast.error(error.response.data.message);
              } else {
                toast.error("Failed to send OTP.");
              }
            } else {
              toast.error("Server not responding. Please try again later.");
            }
        } finally {
          setLoading(false);
        }
      };
    return (
        <div className='h-screen w-full bg-stone-100 flex items-center justify-center'>
            <form onSubmit={handleVerify} className='w-1/3 bg-white flex flex-col items-center rounded-xl shadow-xl pb-9'>
                <img src={logo} className='w-30' alt="" />
                <div className='flex flex-col py-1 gap-1'>
                    <label htmlFor="email">Enter email address:</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} name='email' className='bg-stone-100 border border-stone-800 rounded p-2 w-75' />
                </div>
                <div className=' my-2'>
                    <button className='bg-blue-600 w-75 py-2 rounded text-white cursor-pointer'>{loading ?  'loading... ' :  'Send OTP'}</button>
                </div>
                <div className='flex gap-1'>
                    <p className='font-semibold'>Want to login?</p>
                    <NavLink to='/pos/login' className='text-blue-600 underline cursor-pointer'>Click here</NavLink>
                </div>
            </form>
        </div>
    )
}

export default StaffForgotPassword