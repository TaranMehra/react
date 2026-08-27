import { AxiosBaseFunc } from "./axiosBase";
const  axInstance = AxiosBaseFunc();

export const fetchJsonPlaceholderDummy = async () =>{
  const result = await  axInstance.get('/todos');
  console.log(result);
  return result;
    }

// const DummyDataInceptors = async ()=>{
//     const result = await axInstance.get()
// }]