import axios from "axios";
import { getrefreshToken } from "./apiMethods";

// export const useSecureTokenAxCustomHooks = (token:string)=>{

    export const axSecure = axios.create({
        baseURL:"http://localhost:3000/api",
        withCredentials:true
    });

    axSecure.interceptors.request.use((config)=>{
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
            
    },
    (error)=>{

        return Promise.reject(error);

        })


 axSecure.interceptors.response.use((response) => response,
            
        async (error) => {
               const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                   originalRequest._retry = true;

                   console.log("Got the 401 error now fetching accessToken through refreshToken")
                    try {

                      const refreshToken = localStorage.getItem('refreshToken');
                      const res = await getrefreshToken({refreshToken});

                      const newAccessToken = res.accessToken;
                      localStorage.setItem("accessToken", newAccessToken);
                       console.log("Got the refreshToken", refreshToken);

                      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                       return axSecure(originalRequest);
                      } catch (refreshError) {

                      localStorage.removeItem("accessToken");
                      localStorage.removeItem("refreshToken");
                      window.location.href = "/auth/login";
                      return Promise.reject(refreshError);
                      }
                      }

    return Promise.reject(error);
  }
);
        







    // return axSecure;
// }