import React from 'react'
import { NavLink } from "react-router-dom";

function LinkButton({children , link}) {
    const role = "admin";
  return (
    <NavLink to={link} className={`inline-flex items-center justify-center bg-${role} text-white px-4 py-2 rounded w-fit`}>{children}</NavLink>
  )
}

export default LinkButton