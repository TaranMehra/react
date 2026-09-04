import React from 'react'
import { useUserData } from '../../../config/api/contextApi'
import { changeBioApi } from '../../../config/api/apiMethods';

function ProfilePage() {
  const {userobj} = useUserData();

  const handleBio = async(e)=>{
    e.preventDefault();
     const result = await changeBioApi();
     console.log("change bio api resutl ");

  }
  return (
    <div>
      <h1>
        ProfilePage
        </h1>

<form onSubmit={handleBio} className="fill-mist-600">
        <label>Hi! {userobj.username}</label>
        <button type="submit" className="bg-orange-100 p-2 rounded block">
          FetchBio
        </button>
      </form>
    </div>
  )
}

export default ProfilePage