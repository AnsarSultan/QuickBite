import React, { useContext } from 'react'
import { NavLink } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext';

function LinkButton({children , link}) {
  const {user} = useContext(AuthContext)
    const role = user.role;
  return (
    <NavLink to={link} className={`inline-flex items-center justify-center ${role} text-white px-4 py-2 rounded w-fit`}>{children}</NavLink>
  )
}

export default LinkButton