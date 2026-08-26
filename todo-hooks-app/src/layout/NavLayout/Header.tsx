import React from 'react'
import {NavLink}  from "react-router-dom"
function Header() {
  return (
    <div className='header-container bg-orange-50 p-2 flex justify-between'>
        {/* <h1>Web App : </h1> */}
        <NavLink to="/" className="bg-orange-200 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded z-10">
            Home
        </NavLink>
        <div className="auth-nav-container flex gap-2">

        <NavLink to="/auth/register" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
            Register
        </NavLink>
        <NavLink to="/auth/login" className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded">
            Login
        </NavLink>
        </div>
        </div>
  )
}

export default Header