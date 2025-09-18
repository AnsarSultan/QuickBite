import React from 'react'
import logo from '../../../assets/logo.png'
import { NavLink } from 'react-router-dom'


function StaffResetPassword() {
  return (
    <div className='h-screen w-full bg-stone-100 flex items-center justify-center'>
    <div className='w-1/3 bg-white flex flex-col items-center rounded-xl shadow-xl pb-9'>
        <img src={logo} className='w-30' alt="" />
        <div className='flex flex-col py-1 gap-1'>
            <label htmlFor="otp">Enter OTP:</label>
            <input type="number" name='otp' className='bg-stone-100 border border-stone-800 rounded p-2 w-75' />
        </div>
        <div className='flex flex-col py-1 gap-1'>
            <label htmlFor="password">Enter password:</label>
            <input type="password" name='password' className='bg-stone-100 border border-stone-800 rounded p-2 w-75' />
        </div>
        <div className='flex flex-col py-1 gap-1'>
            <label htmlFor="password">Re-enter password:</label>
            <input type="password" name='password' className='bg-stone-100 border border-stone-800 rounded p-2 w-75' />
        </div>
        <div className='flex flex-col gap-1 my-2 '>
            <button className='bg-blue-600 w-75 py-2 rounded text-white cursor-pointer'>Reset Password</button>
            <button className='bg-gray-300 text-gray-600 w-75 py-2 rounded cursor-not-allowed'>Resend OTP</button>
        </div>
    </div>
</div>
  )
}

export default StaffResetPassword