import { ax } from "./axiosBase"

 
export const getUserFromDummyJson = async()=>{
  const result = await ax.get('/user/3');
    return result.data;
}