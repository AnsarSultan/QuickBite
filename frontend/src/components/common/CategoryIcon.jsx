import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

function CategoryIcon({ image, name , selected , onClick}) {
  const {user} = useContext(AuthContext)
  let role = ""
  {user ? role = user.role : role = "customer"}
  let classes = 'flex flex-row items-center gap-3 cursor-pointer px-2 rounded-lg flex-shrink-0 w-32 shadow-sm bg-white hover:bg-gray-100'
 
  if(selected){
    classes = classes + ' border-2 border-red-500'
  }

  return (
    <div
      className={classes}
      onClick={onClick}
    >
{image &&      <img
        src={image}
        alt="Category"
        className="w-10 h-10 object-cover rounded-lg p-1"
      />}
      <p className="font-medium text-sm">{name}</p>
    </div>
  )
}

export default CategoryIcon