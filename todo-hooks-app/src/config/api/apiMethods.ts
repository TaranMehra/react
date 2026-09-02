import { ax } from "./axiosOpen"
import { axSecure } from "./axiosSecure";
// import { useSecureTokenAxCustomHooks } from "./axiosSecure";
import { useUserData } from "./contextApi";
// 


//login page exec
export const getUserObj = async()=>{
  const result = await ax.get('/user/3');
    return result.data;
}

//dashboard page exec
export const getAuthTokenFunc = async <T>(payload: T)=>{
  const result = await ax.post('/auth/login', payload);
  return result.data;
}

export const getCurrentUser = async(axSecure)=>{
  const reuslt =  await axSecure.get('/auth/me');
  return reuslt.data;
}


type apiReturnUserAuthType = {
  username : string,
  email:string,
  phoneno:string,
  password:string,
}
interface apiReturnUserAuthi {
  userObj?: apiReturnUserAuthType,
  status:{statusCode:number, message: string, origin:string},
}

//my own user
export const testapi = async()=>{
  const result = await ax.get("/hello");
  console.log("working", result)
  return result;
}

export const registerUser = async<T>(payload:T)=>{
  const result = await ax.post("/auth/register", payload);
  return result.data;
}


export const loginUser = async<T>(payload:T)=>{
  const result = await ax.post("/auth/login", payload);
  return result.data;
}



// const {getToken} = useUserData();
// const token = getToken()
// const axSecure = useSecureTokenAxCustomHooks(token);

//app path (secure paths)
export const getUserDataThroughToken = async<T>(payload:T)=>{
  const result = await axSecure.post("/app/dash/user/me", payload);
  // const result = await axSecure.get("/hello");
return result.data;
}