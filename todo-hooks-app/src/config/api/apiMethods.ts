import { ax } from "./axiosOpen"
import { axSecure } from "./axiosSecure";

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

export const getrefreshToken = async(payload)=>{
  const result = await ax.post('/auth/refresh', payload);
  return result.data;
}


//app path (secure paths)
export const getUserDataThroughToken = async()=>{
  const result = await axSecure.get("/app/dash/user/me");
  // const result = await axSecure.get("/hello");
return result.data;
}


export const fetchSecureMessage = async()=>{
  const result = await axSecure.get("/app/dash/user/msg");
  // const result = await axSecure.get("/hello");
return result.data;
}

export const changeBioApi = async()=>{
  const result = await axSecure.get("/app/profile/user/bio");
  // const result = await axSecure.get("/hello");
return result.data;
}