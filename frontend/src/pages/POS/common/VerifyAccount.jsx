import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import logo from '../../../assets/logo.png';

function StaffVerifyAccount() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";  
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp) return toast.error("Please enter OTP");

    try {
      setLoading(true);
      const backendURL = import.meta.env.VITE_BACKEND_URL;
      let accountType = "staff"
      const { data } = await axios.post(`${backendURL}/api/users/verify/otp`, { email, otp , accountType });

      if (data.success) {
        toast.success("Account verified successfully. You can now log in.");
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
            toast.error("Verification failed");
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
        <input 
          type="number"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className='bg-stone-100 border border-stone-800 rounded p-2 w-75 mb-3'
          placeholder='Enter OTP'
        />
        <button type="submit" className='bg-blue-600 w-75 py-2 rounded text-white cursor-pointer'>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
}

export default StaffVerifyAccount;
