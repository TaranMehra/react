import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './NavLayout/Header'

function RootLayout() {
  return (
    <div className="Root-Layout-Container p-2 ">

    <Header/>
    <Outlet/>
    </div>
  )
}

export default RootLayout