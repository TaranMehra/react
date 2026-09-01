import { ax } from "./axiosOpen"
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
