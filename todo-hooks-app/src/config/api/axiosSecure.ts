import axios from "axios";

// export const useSecureTokenAxCustomHooks = (token:string)=>{

    export const axSecure = axios.create({
        baseURL:"http://localhost:3000/api",
        withCredentials:true
    });

    axSecure.interceptors.request.use((config)=>{
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        }
            
    },
    (error)=>{

        return Promise.reject(error);

        })

    // return axSecure;
// }