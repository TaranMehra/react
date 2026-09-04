import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {router} from './app/route.tsx'
import { RouterProvider } from 'react-router-dom'
import { UserProvider } from './config/api/contextApi.tsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <UserProvider>
    <ToastContainer/>
  < RouterProvider router={router}/>
  </UserProvider>
  //  {/* </StrictMode>, */}
)
