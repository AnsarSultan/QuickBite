import React from 'react'
import { Plus, Minus } from 'lucide-react';

function CartProduct({ img, name, quantity, price }) {
    return (
        <div className='flex flex-row items-center justify-around gap-3 p-2 bg-gray-100 rounded w-full'>
            <img src={img} className='w-15' alt="" />
            <div className='flex flex-col items-center'>
                <p className='font-semibold'>{name}</p>
                <div className='flex items-center justify-center gap-3'>
                    <Minus className='cursor-pointer hover:bg-white rounded-full'/>
                    <p>{quantity}</p>
                    <Plus className='cursor-pointer hover:bg-white rounded-full'/>
                </div>
            </div>
            <p>Rs.{price}</p>
        </div>
    )
}

export default CartProduct