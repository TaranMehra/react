import { ax } from "./axiosBase"
// import { useSecureTokenAxCustomHooks } from "./axiosSecure";
// 

// const axSecure = useSecureTokenAxCustomHooks();

export const getUserFromDummyJson = async()=>{
  const result = await ax.get('/user/3');
    return result.data;
}

export const getAuthTokenFunc = async <T>(payload: T)=>{
  const result = await ax.post('/auth/login', payload);
  // console.log("From getAuthTokenFUnc : ", result.data)
  return result.data;
}

export const getCurrentUser = async(axSecure)=>{
  const reuslt =  await axSecure.get('/auth/me');
  console.log('from getCurrentUser', reuslt.data);
  return reuslt.data;
}
