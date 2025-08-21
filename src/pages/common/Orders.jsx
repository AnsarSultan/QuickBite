import React from 'react'

function Orders() {
  return (
    <div className='h-full'>
      <div>
      <input type="text" className='bg-white border border-gray-500 p-2 rounded-lg'  placeholder='Enter orderID'/>
      <button className='bg-admin text-white mx-3 px-3 py-1 rounded-xl cursor-pointer'>Search</button>
      </div>
    </div>
  )
}

export default Orders