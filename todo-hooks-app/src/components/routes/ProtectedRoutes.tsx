import { Navigate, Outlet } from "react-router";
import { useUserData } from "../../config/api/contextApi";

const ProtectedRoutes = ()=>{

  const {isAuthenticated, loading}  = useUserData();

  if(loading) return <h1>loading.....</h1>;
  if(!isAuthenticated) return <Navigate to="/auth/login"/> 

    return <Outlet/>
}

export default ProtectedRoutes;