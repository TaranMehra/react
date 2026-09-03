import axios from "axios";
import { refreshToken } from "./apiMethods";

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

                    try {
                     
                     const res = await refreshToken();

                      const newAccessToken = res.accessToken;
                      localStorage.setItem("accessToken", newAccessToken);
                      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                       return axSecure(originalRequest);
                      } catch (refreshError) {

                      localStorage.removeItem("accessToken");
                      window.location.href = "/login";
                      return Promise.reject(refreshError);
                      }
                      }

    return Promise.reject(error);
  }
);
        







    // return axSecure;
// }