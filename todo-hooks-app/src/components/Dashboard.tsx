import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getCookieFunc } from '../context/createCookie';
import { useState } from 'react';
import { useUserData } from '../config/api/contextApi';
import { getAuthTokenFunc, getCurrentUser,} from '../config/api/apiMethods';
import { resume } from 'react-dom/server';
import { useSecureTokenAxCustomHooks } from '../config/api/axiosSecure';

type userGetTokenTypePayload = { username: string, password: string };

function Dashboard() {

  const { setLoading, loading, getUserData, userobj, setUserobj, setUserAuthObj, userAuthObj } = useUserData();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [data, setData] = useState();


  //  console.log("The Result ont useEffect Dashboard :" , userobj);
  const axSecure = useSecureTokenAxCustomHooks();

  useEffect(() => {

    
    if (!userobj) {
      navigate('/auth/login');
    }
    
    (async()=>{

      if(userAuthObj.accessToken){
        console.log("get token ");
        console.log("token into interceptors -> api hit -> /auth/me");
        const Autheme = await getCurrentUser(axSecure);
        console.log("Authenticated User : ", Autheme);
        // console.log(`inside IF userAuthObj : ` ,userAuthObj);
      }
    })();

    
  }, [userAuthObj]);



  if (loading) {
      return <h1>loading.. </h1>
      }
      

  const userObjUpdateToken = async (e) => {
    e.preventDefault();
    if (userobj) {

      try {
        
        setLoading(true);
        const reuslt = await getAuthTokenFunc<userGetTokenTypePayload>({
          username: userobj.username,
          password: userobj.password,
        })
        setUserAuthObj(reuslt);

        console.log("{username,password} call -> api hit -> /auth/login -> userAuthObj")

       
      } catch (error) {
        throw new Error ("Error While calling getAuthTOkenFunc", error);
        
      }
      finally{
        setLoading(false)
      }

      // if(!loading){

      //   console.log("USER OBJ WITHOUT TOKENnnnnnnn : ", userAuthObj);
      // }        

    }

  }



  return (


    <div>Dashboard

      <form onSubmit={(e) => userObjUpdateToken(e)} className='fill-mist-600'>
        <label htmlFor="">Hi! {userobj.username}</label>
        <button type="submit" className='bg-orange-100 p-2 rounded block'>Get Token</button>
      </form>

      <div>Your Token :  {userAuthObj.accessToken ? userAuthObj.accessToken : "no token yet"}</div>

    </div>
  )
}

export default Dashboard