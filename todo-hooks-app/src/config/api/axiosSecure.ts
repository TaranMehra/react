import { useUserData } from "./contextApi";
import axios from "axios";

export const useSecureTokenAxCustomHooks = ()=>{
    const {userAuthObj} =  useUserData();

    const axSecure = axios.create({
        baseURL:"https://dummyjson.com",
        withCredentials:true
    });

    axSecure.interceptors.request.use((config)=>{
        const token = userAuthObj.accessToken;
        config.headers.Authorization = `Bearer ${token}`;
        return config;
        
    },
    (error)=>{

        return Promise.reject(error);

        })

    return axSecure;
}