import axios from "axios";
import { getCookieFunc } from "../../context/createCookie";





export const ax =  axios.create({
        baseURL:"https://dummyjson.com",
        withCredentials:true,
    })

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



