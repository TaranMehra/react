import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import RootLayout from "../layout/RootLayout";
import Register from "../pages/auth/components/register";
import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/AppLayout";
import ProfilePage from "../pages/dashboard/profile/ProfilePage";
import Login from "../pages/auth/components/login";
import Marketing from "../pages/marketing/Marketing";
import AppLayout from "../layout/AppLayout";
import PublicRoutes from "../components/routes/PublicRoutes";
import ProtectedRoutes from "../components/routes/ProtectedRoutes";


// export const router = createBrowserRouter([
                                        
//     {
//         path:"/",
//         element:<RootLayout/>,
//         children:[
//             {
//                 index:true,
//                 element:<Marketing/>

//             },
//             {
//                 path:'auth',
//                 element:<AuthLayout/>,
//                 children:[
//                     {
//                         path:"register",
//                         element:<Register/>,
                        
//                     },
//                     {
//                         path:"login",
//                         element:<Login/>,
                        
//                     }
//                 ]
//             },
//             {
//                 path:'dashboard',
//                 element:<AppLayout/>,
//                 children:[
//                     {
//                         index:true,
//                         element:<Dashboard/>
//                     },
//                     {
//                         path:'profile',
//                         element:<ProfilePage/>
//                     }
//                 ]
//             }
//         ]
        
//     }

//     ]
//     )


// export const router = createBrowserRouter([
                                        
//     {
//         path:"/",
//         element:<RootLayout/>,
//         children:[
//             {
//                 index:true,
//                 element:<Marketing/>

//             },
//             {
//                 path:'auth',
//                 element:<PublicRoutes/>,
//                 children:[
                
//                 {

//                   element:<AuthLayout/>,
//                   children:[
//                     {
//                       path:"register",
//                       element:<Register/>,
                      
//                     },
//                     {
//                       path:"login",
//                       element:<Login/>,
                      
//                     }
//                   ]
//                 }
//               ]
//             },
//             {
//                 path:'dashboard',
//                 element:<ProtectedRoutes/>,
//                 children:[
//                     {
//                         // index:true,
//                         element:<AppLayout/>,
//                         children:[
//                            {
//                                 // path:'profile',
//                                 index:true,
//                                 element:<Dashboard/>
//                             },
//                             {
//                                 path:'profile',
//                                 element:<ProfilePage/>
//                             }

//                         ]
//                     },
//                 ] 
//             }
//         ]
        
//     }

//     ]
//     )


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Marketing />,
      },
      {
        path: 'auth',
        element: <PublicRoutes />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              { path: "register", element: <Register /> },
              { path: "login", element: <Login /> },
            ]
          }
        ]
      },
      {
        path: 'app',
        element: <ProtectedRoutes />,
        children: [
          {
            // index:true,
            element: <AppLayout />,
            children: [
              { path:"dashboard", element: <Dashboard /> },
              { path: 'profile', element: <ProfilePage /> },
            ]
          },
        ]
      }
    ]
  }
]);