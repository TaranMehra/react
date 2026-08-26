import { AxiosBaseFunc } from "./axiosBase";
const  axInstance = AxiosBaseFunc();

const CheckServerResponding = () =>{
    axInstance.get('/hello');
    
    
}