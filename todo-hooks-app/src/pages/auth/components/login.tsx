import React, { useEffect, useState } from 'react'
import { getUserObj, loginUser, testapi } from '../../../config/api/apiMethods';
import { useUserData } from '../../../config/api/contextApi';


function Login() {

  
    const [username, setUsername] = useState<string>('');
    const [Password, setPassword] = useState<string>('');
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


const handleSubmitData = async(e) =>{
      e.preventDefault();

      testapi();
        const payload = {
          username,
          Password,
        }
        const result = await loginUser(payload);
        console.log(result);  
      
      }
 

  if(loading){
    return <h1>Loading .....</h1>
  } 

  
  

      return (
        <>
      <h1>Login</h1>
        <div className='register-container border-2px border-solid h-full w-full bg-[#4e311b]  p-5'>
      <div className="form-container">
        <form  className='grid gap-2 w-2xl' onSubmit={handleSubmitData}>

        {/* name */}
        {/* <div className="name-div flex justify-between w-2xl"> */}
        {/* firstname */}
          <div className="div flex flex-col ">
         <label htmlFor="firstname">Enter Your Name</label>
          <input type='text' id="firstname" name='firstname' placeholder='Taranpreet' value={username} onChange={(e)=> setUsername(e.target.value)} className='border-2 rounded' required></input>
          </div>


          <label htmlFor="password" className='mt-5'>Enter Password </label>
          <input type='password' id="password" name='phoneno' placeholder='Atleast 4-5 letters in alphanuric' value={Password} onChange={(e)=> setPassword(e.target.value)} className='border-2 rounded'></input>

          <button type="submit" className='pointer border-2 w-min p-1 rounded-2xl'>Submit</button>
        </form>
      </div>
      
      
      </div>
        </>
  )
}

export default Login