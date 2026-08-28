import React, { useEffect, useState } from 'react'
import { getUserFromDummyJson } from '../../../config/api/apiMethods';

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

  const [userobj, setUserobj] = useState<UserType>({
          username: ' ',
          email: ' ',
          age: 0,
          password:' ',
          firstName: ' ',
     
  }); //hybrid -> when i know little what would in obj

  

  useEffect(()=>{

    (async()=>{

      const result  = await getUserFromDummyJson();
      setUserobj(result);
      console.log(result)
    })();
  },[])

   

  return (
    <div>
      login


      <h1>Hi { userobj.username }</h1>
    </div>
    
  )
}

export default Login