import React from 'react'
import { Outlet } from 'react-router'

function AuthLayout() {
  return (
    <div className='authlayout-container'>
      AuthLayout
      <Outlet/>
      </div>
  )
}

export default AuthLayout