import axios from "axios";
import { getCookieFunc } from "../../context/createCookie";
import { useContext } from "react";
import { useUserData } from "./contextApi";





export const ax =  axios.create({
        baseURL:"https://dummyjson.com",
        withCredentials:true,
    })


// export const ax2 =  axios.create({
//         baseURL:"https://dummyjson.com",
//         withCredentials:true,
//     });

// ax2.interceptors.request.use(
//     (config)=>{
//             const token = userAuthObj.accessToken;
//             config.headers.Authorization = `Bearer ${token}`
//             return config;
//         }
//     )

//     ax.interceptors.request.use(
//      function(config){
//         // return 'asdf'
//             const cookieValue = getCookieFunc('email');
//             console.log(cookieValue);
//             config.headers["Content-Type"] = "application/json";
//             config.headers.
//             config.baseURL =  'https://jsonplaceholder.typicode.com'
            

//             return config;
//     },

//     function (error){
//         return Promise.reject(error);
//     }
// )



