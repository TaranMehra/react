import axios from "axios";


export const ax =  axios.create({
        baseURL:"https://dummyjson.com",
        withCredentials:true,
    });


