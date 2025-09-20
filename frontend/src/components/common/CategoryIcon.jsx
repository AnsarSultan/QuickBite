import React from 'react'

function CategoryIcon({ image, name , selected }) {
  const role = "admin"
  let classes = 'flex flex-row items-center gap-3 cursor-pointer px-2 rounded-lg flex-shrink-0 w-32'
  if (role === "customer") {
    classes = classes + ' bg-stone-800 text-white'
  } else {
     classes = classes +' shadow-sm bg-white hover:bg-gray-100  '
  }
  if(selected){
    classes = classes + ' border-2 border-red-500'
  }

  return (
    <div
      className={classes}
    >
      <img
        src={image}
        alt="Category"
        className="w-10 h-10 object-cover rounded-md"
      />
      <p className="font-medium text-sm">{name}</p>
    </div>
  )
}

export default CategoryIcon