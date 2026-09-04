import { Navigate, Outlet } from "react-router";
import { useUserData } from "../../config/api/contextApi";

const PublicRoutes = ()=>{

  const {isAuthenticated, loading}  = useUserData();

  if(loading) return <h1>loading.....</h1>;
  if(isAuthenticated) return <Navigate to="/app/dashboard" replace/> 

    return <Outlet/>
}

export default PublicRoutes