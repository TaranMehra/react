import axios from "axios";
import { getrefreshToken } from "./apiMethods";
import {toast} from 'react-toastify'

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
			console.log("The OriginalRequest : ", originalRequest);

			if (error.response?.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;
				toast.error('Waiting to fetch details', error)
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
				else{

					const erroCode = error.response.status;
					switch(erroCode){
						case 400:
							toast.error('Invalid Payload to process Request', error)
							break;
						case 403:
							toast.error('You are not authorized to access this', error);
							break;
						case 404:
							toast.error('Resource is not avaliable', error)
							break;
						case 405:
							toast.error('Wrong Request Method', error)
							break;
						case 408:
							toast.error('Request Time Out(accessToken expired)', error)
							break;
						case 500:
							toast.error('Internal server error , Please Try again later', error);
							break;
						default:
							if(!error.response){
								toast.error("Something went wrong , Check You Connection", error);
							}
							else{
								toast.error(error.response.data?.message  ?? "Something went Wrong" );
							}
				
					}

				}

    return Promise.reject(error);
  }
);
        







    // return axSecure;
// }