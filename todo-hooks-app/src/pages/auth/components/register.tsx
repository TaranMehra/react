import React, { useEffect, useState } from 'react'
// import { AxiosBaseFunc } from '../../../config/api/axiosBase';
// import { createCookieFunc } from '../../../config/createCookie';
import {redirect, useNavigate} from "react-router-dom"
import { registerUser } from '../../../config/api/apiMethods';
import { useUserData } from '../../../config/api/contextApi';

type emailType = `${string}@${string}.${string}`;

function Register() {


    const {isAuthenticated ,setLoading, loading,setIsredirection, isredirection, setUserobj, userobj, setUserAuthObj, userAuthObj} = useUserData();
  

  const [username, setUsername] = useState<string>('');
  // const [Lastname, setLastname] = useState<string | undefined>('');
  const [Email, setEmail] = useState<emailType>('' as emailType);
  const [Phoneno, setPhoneno] = useState<string>('');
  const [Password, setPassword] = useState<string>('');

  // navigation for
  const navigate = useNavigate();

  // AxiosBaseFunc();
  const [Error , setError] = useState<{
    email?:string,
    phoneno?:string,
    password?:string,
  }>({});


  const validationForm=()=>{
    const tempErrors : typeof Error = {};


    // email validation Regx
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    if(!Email){
      tempErrors.email = "Email is required"
    }
    else if(!emailRegex.test(Email)){
      tempErrors.email = "Enter A valid Email address";
    }

    
    const phonenoRegex =  /^[6-9][0-9]{9}$/; //must indian no 6-9 and 0-9 numbers long
    if(!Phoneno){
      tempErrors.phoneno = "Phone no. is required"
    }else if(! phonenoRegex.test(Phoneno)){
      tempErrors.phoneno = "Enter a Valid Phone 10 digit phone no."
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
    if(!Password){
      tempErrors.password = "Password is Required"
    }
    else if(! passwordRegex.test(Password)){
      tempErrors.password = "Password Should Alphanuric & Atleast 4-5 Characters"
    }

    setError(tempErrors);

    return Object.keys(tempErrors).length === 0;
    
}

const handleSubmitData = async(e) =>{
      e.preventDefault();

      if(validationForm()){
        const payload = {
          username,
          Email,
          Phoneno,
          Password,
        }
        
        setLoading(true);
        const result = await registerUser(payload);
           const {success , data } = result;
           if(success){
            setLoading(false);
            setIsredirection(true);
            setTimeout(()=>{
              navigate('/auth/login');
            }, 2000)
           }
        
      }
    }

    if(loading){
      return <h1>loading</h1>
    }

    if(isredirection){
      return <h1>Redirecting to Login</h1>
    }

    useEffect(()=>{
      if(isAuthenticated){
        navigate('/dashboard');
      }

      
    },[isAuthenticated])
  return (
    <div className='register-container border-2px border-solid h-full w-full bg-[#4e311b]  p-5'>
      <h1>register</h1>
      <div className="form-container">
        <form  className='grid gap-2 w-2xl' onSubmit={handleSubmitData}>

        {/* name */}
        {/* <div className="name-div flex justify-between w-2xl"> */}
        {/* firstname */}
          <div className="div flex flex-col ">
         <label htmlFor="firstname">Enter Your Name</label>
          <input type='text' id="firstname" name='firstname' placeholder='Taranpreet' value={username} onChange={(e)=> setUsername(e.target.value)} className='border-2 rounded' required></input>
          </div>

          {/* lastname */}
          {/* <div className="div flex flex-col">
          <label htmlFor="lastname">Enter Last Name</label>
          <input type='text' id="lastname" name='lastname' placeholder='Singh' value={Lastname} onChange={(e)=> setLastname(e.target.value)} className='border-2 rounded'></input>
          </div>
        </div> */}

        <label htmlFor="email" className='mt-5'>Enter Your Email </label>
          <input type='text' id="email" name='email' placeholder='taran@gamil.com' value={Email} onChange={(e)=> setEmail(e.target.value as emailType)} className='border-2 rounded'></input>
          <h1>{Error.email}</h1>


          <label htmlFor="phoneno" className='mt-5'>Enter Phone No.</label>
          <input type='tel' id="phoneno" name='phoneno' placeholder='+91 - 6234567890' value={Phoneno} onChange={(e)=> setPhoneno(e.target.value)} className='border-2 rounded'></input>
          <h1>{Error.phoneno}</h1>


          <label htmlFor="password" className='mt-5'>Enter Password </label>
          <input type='password' id="password" name='phoneno' placeholder='Atleast 4-5 letters in alphanuric' value={Password} onChange={(e)=> setPassword(e.target.value)} className='border-2 rounded'></input>

          <button type="submit" className='pointer border-2 w-min p-1 rounded-2xl'>Submit</button>
          <h1>{Error.password}</h1>
        </form>
      </div>
      
      
      </div>
  )
}

export default Register