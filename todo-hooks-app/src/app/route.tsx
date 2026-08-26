import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import RootLayout from "../layout/RootLayout";
import Register from "../pages/auth/components/register";
import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/DashboardLayout";
import ProfilePage from "../pages/dashboard/profile/ProfilePage";
import Login from "../pages/auth/components/login";


export const router = createBrowserRouter([

    {
        path:"/",
        element:<RootLayout/>,
        children:[
            {
                index:true,
                element:<Dashboard/>

            },
            {
                path:'auth',
                element:<AuthLayout/>,
                children:[
                    {
                        path:"register",
                        element:<Register/>,
                        
                    },
                    {
                        path:"login",
                        element:<Login/>,
                        
                    }
                ]
            },
            {
                path:'dashboard',
                element:<DashboardLayout/>,
                children:[
                    {
                        path:'profile',
                        element:<ProfilePage/>
                    }
                ]
            }
        ]
        
    }

    ]
    )

