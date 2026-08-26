import axios from "axios";

export const AxiosBaseFunc = () =>{

    return axios.create({
        baseURL: 'localhost:3000'        
    })

    // console.log(axios);
} 

// const axios = Axios.