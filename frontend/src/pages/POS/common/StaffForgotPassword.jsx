import React from 'react'
import logo from '../../../assets/logo.png'
import { NavLink } from 'react-router-dom'

function StaffForgotPassword() {
    return (
        <div className='h-screen w-full bg-stone-100 flex items-center justify-center'>
            <div className='w-1/3 bg-white flex flex-col items-center rounded-xl shadow-xl pb-9'>
                <img src={logo} className='w-30' alt="" />
                <div className='flex flex-col py-1 gap-1'>
                    <label htmlFor="email">Enter email address:</label>
                    <input type="email" name='email' className='bg-stone-100 border border-stone-800 rounded p-2 w-75' />
                </div>
                <div className=' my-2'>
                    <button className='bg-blue-600 w-75 py-2 rounded text-white cursor-pointer'>Send OTP</button>
                </div>
                <div className='flex gap-1'>
                    <p className='font-semibold'>Want to login?</p>
                    <NavLink to='/pos/login' className='text-blue-600 underline cursor-pointer'>Click here</NavLink>
                </div>
            </div>
        </div>
    )
}

export default StaffForgotPassword