import React from 'react'
import { Outlet } from 'react-router-dom'

function Marketing() {
  return (

        <div>Marketing page
          <Outlet/>
        </div>
  )
}

export default Marketing;