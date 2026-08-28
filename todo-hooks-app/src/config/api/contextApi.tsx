import { createContext , useState, useContext, useEffect, useCallback} from "react";
import { getUserFromDummyJson } from "./apiMethods";

const UserContext = createContext(null);

interface UserType {
  username: string,
  age:number,
  password:string,
  firstName:string,
  lastName?:string,
  email:string,
  [key:string]:unknown
}

export const UserProvider = ({children})=>{

    const [userobj, setUserobj] = useState<UserType>({
              username: ' ',
              email: ' ',
              age: 0,
              password:' ',
              firstName: ' ',
         
      }); //hybrid -> when i know little what would in obj
      const [loading, setLoading] = useState<boolean>(true);


      const getUserData  =  useCallback( async ()=>{

        try {
            setLoading(true);
            const data = await getUserFromDummyJson();
            // console.log('data from createContext', userobj)
            setUserobj(data);
            return data;
            
          } catch (error) {
            throw new Error ("Could not Fetch User Data");
            
          }
          finally{
            setLoading(false);
          }

      }, []);


      useEffect(()=>{
        getUserData();
   
      },[]);



      return (
          <UserContext.Provider value={{getUserData, loading, userobj}}>
            {children}
            </UserContext.Provider>
      )
}


export const useUserData =() => useContext(UserContext);



