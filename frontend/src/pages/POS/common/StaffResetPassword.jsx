import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import logo from '../../../assets/logo.png'
import { NavLink } from 'react-router-dom'


function StaffResetPassword() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || "";  
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [Cpassword, setCpassword] = useState("");
    const [loading, setLoading] = useState(false);


    const handleVerify = async (e) => {
        e.preventDefault();
        if (!otp) return toast.error("Please enter OTP");
    
        if(password !== Cpassword){
            return toast.error("Confirm passowrd must be same.")
        }
        try {
          setLoading(true);
          const backendURL = import.meta.env.VITE_BACKEND_URL;
          const { data } = await axios.post(`${backendURL}/api/users/reset-password`, { email, otp , password });
    
          if (data.success) {
            toast.success("Password changed Successfully");
            navigate("/pos/login");
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
                toast.error("Failed to changed the password.");
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
        <p className='text-center text-sm mb-4'>Enter the OTP sent to your email: {email}</p>
        <div className='flex flex-col py-1 gap-1'>
            <label htmlFor="otp">Enter OTP:</label>
            <input type="number" name='otp' onChange={(e) => setOtp(e.target.value)} value={otp} className='bg-stone-100 border border-stone-800 rounded p-2 w-75' />
        </div>
        <div className='flex flex-col py-1 gap-1'>
            <label htmlFor="password">Enter password:</label>
            <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} value={password} className='bg-stone-100 border border-stone-800 rounded p-2 w-75' />
        </div>
        <div className='flex flex-col py-1 gap-1'>
            <label htmlFor="password">Confirm password:</label>
            <input type="password" name='password' onChange={(e) => setCpassword(e.target.value)} value={Cpassword} className='bg-stone-100 border border-stone-800 rounded p-2 w-75' />
        </div>
        <div className='flex flex-col gap-1 my-2 '>
            <button className='bg-blue-600 w-75 py-2 rounded text-white cursor-pointer'>{loading ? 'loading..' : 'Reset Password'}</button>
            
            <NavLink to='/pos/staff/forgot-password' className='text-blue-600 text-center underline cursor-pointer'>Resend OTP</NavLink>
        </div>
    </form>
</div>
  )
}

export default StaffResetPassword