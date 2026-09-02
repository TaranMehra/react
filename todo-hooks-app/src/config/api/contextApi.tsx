import { createContext , useState, useContext, useEffect, useCallback} from "react";
// import { getUserObj } from "./apiMethods";

const UserContext = createContext(null);

//UserType -> For /auth/login for type safety,
interface UserType {
  username: string,
  age:number,
  password:string,
  firstName:string,
  lastName?:string,
  email:string,
  [key:string]:unknown
}
//
interface userAuthObjType {
    accessToken: string,
    refreshToken:string,
  [key:string]:unknown,

}

export const UserProvider = ({children})=>{


  
    const  [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userobj, setUserobj] = useState<UserType>({
              username: ' ',
              email: ' ',
              age: 0,
              password:' ',
              firstName: ' ',
         
      }); //hybrid -> when i know little what would in obj

      const [userAuthObj, setUserAuthObj]  = useState<userAuthObjType | null >({
        accessToken:'',
        refreshToken:''
      });

      const [loading, setLoading] = useState<boolean>(false);
      const [isredirection, setIsredirection] = useState<boolean>(false);



      const login = async (token, username)=>{
        localStorage.setItem('token' , token);
        localStorage.setItem('username', username);
        setIsAuthenticated(!!token)
      }

      const logout = ():void =>{
        localStorage.removeItem('token');
      }

      const getToken = ():string =>{
        if(isAuthenticated){
          const token = localStorage.getItem('token');
          return token;
        }
      }
      
      const getUsername = ():string =>{
        if(isAuthenticated){
          const username = localStorage.getItem('username');
          return username;
        }
      }

      useEffect(()=>{
        //once the app load , check whether user is persist
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
   
      },[]);



      return (
          <UserContext.Provider value={{isAuthenticated, login, logout, setLoading, loading, getToken, getUsername, setIsredirection, isredirection, setUserobj, userobj, setUserAuthObj, userAuthObj}}>
            {children}
          </UserContext.Provider>
      )
}


export const useUserData =() => useContext(UserContext);



