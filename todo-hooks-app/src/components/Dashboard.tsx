import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getCookieFunc } from '../context/createCookie';
import { useState } from 'react';
import { useUserData } from '../config/api/contextApi';

 function Dashboard() {

   const {loading, getUserData, userobj} = useUserData();
   const navigate = useNavigate();
   const [email, setEmail]  = useState<string>('');
   const [data, setData]  = useState();

   
   console.log("The Result ont useEffect Dashboard :" , userobj);
   
   useEffect(()=>{
     
     if(!userobj){
        navigate('/auth/login');
     }

     

    },[])
  
 

  return (
    <div>Dashboard

          <h1>Welcom , {userobj.username}</h1>
    </div>
  )
}

export default Dashboard