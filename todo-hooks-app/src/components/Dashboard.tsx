import React, { useEffect } from 'react'
import TodoTaskEnter from './layout/TodoTaskEnter'
import { useNavigate } from 'react-router'
import { getCookieFunc } from '../config/createCookie';
import { useState } from 'react';
import { fetchJsonPlaceholderDummy } from '../config/api/apiMethods';

 function Dashboard() {

   const navigate = useNavigate();
   const [email, setEmail]  = useState<string>('');
   const [data, setData]  = useState();


   useEffect(()=>{

    /* Check Validation by fetching browser cookie */
     (async ()=>{
       const cookieValue =  await getCookieFunc('email');
       console.log("outside the if");
       if(!cookieValue){
         console.log("!cookieValue not exec");
         navigate('/auth/register', { replace: true});
        //  return 
        }
        setEmail(cookieValue);
        
        
        // console.log(result)
        
        if(cookieValue){

          const reuslt = await fetchJsonPlaceholderDummy();
          setData(reuslt.data);
          console.log("Data : ", data)
        }
        // (async()=>{
      // })
    })();
      

    },[navigate])
  
 

  return (
    <div>Dashboard

          <h1>Welcom , {email}</h1>


        {/* <TodoTaskEnter></TodoTaskEnter> */}
    </div>
  )
}

export default Dashboard