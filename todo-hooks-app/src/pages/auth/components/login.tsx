import React, { useEffect, useState } from 'react'
import { getUserObj } from '../../../config/api/apiMethods';
import { useUserData } from '../../../config/api/contextApi';

interface UserType {
  username: string,
  email:string,
  age:number,
  password:string,
  firstName:string,
  lastName?:string,
  [key:string]: unknown
 }
function Login() {

  // const [userobj, setUserobj] = useState<Record<string , number | string | object>>({}); //completely unknown from a obj


  
  // const [userobj, setUserobj] = useState<UserType>({
  //         username: ' ',
  //         email: ' ',
  //         age: 0,
  //         password:' ',
  //         firstName: ' ',
     
  // }); //hybrid -> when i know little what would in obj

  
  const {setLoading, loading, setUserobj, userobj, setUserAuthObj, userAuthObj} = useUserData();

  useEffect(()=>{

    (async()=>{

      try {
        setLoading(true)
        const result  = await getUserObj();
        setUserobj(result);
        console.log("/user/3 page -> fetching a user and store in userobj ", result)
       console.log("userobj avaliable into context  ")

        // console.log(result)
        
      } catch (error) {
         throw new Error ("Error While Fething the UserObj at login : ", error)
      }
      finally{
        setLoading(false)
      }

    })();
  },[])

  if(loading){
    return <h1>Loading .....</h1>
  } 


  return (
    <div>
      login


      <h1>Hi { userobj.username }</h1>
    </div>
    
  )
}

export default Login