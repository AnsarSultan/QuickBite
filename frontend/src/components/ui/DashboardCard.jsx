import React from 'react'

function DashboardCard({title , desciption}) {
  return (
    <div className="flex flex-col items-center bg-white border border-gray-400 p-3 rounded-xl shadow-xl">
          <p className='text-4xl font-semibold my-2'>{title}</p>
          <hr className="border-gray-300 w-1/2 border-t-2"/>
          <p className='text-lg my-1'>{desciption}</p>
        </div>
  )
}

export default DashboardCard