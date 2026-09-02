import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useUserData } from '../config/api/contextApi';

import {
  getAuthTokenFunc,
  getCurrentUser,
  getUserDataThroughToken,
} from '../config/api/apiMethods';


// Types
type userGetTokenTypePayload = {
  username: string;
  password: string;
};


function Dashboard({ children }) {

  // --------------------------------------------------
  // Context & Router
  // --------------------------------------------------

  const {
    isAuthenticated,
    logout,
    setLoading,
    loading,
    getToken,
    getUsername,
    getUserData,
    userobj,
    setUserobj,
    setUserAuthObj,
    userAuthObj,
  } = useUserData();

  const navigate = useNavigate();


  // --------------------------------------------------
  // Local State
  // --------------------------------------------------

  const [email, setEmail] = useState<string>('');
  const [data, setData] = useState();


  // --------------------------------------------------
  // Authentication / User Data
  // --------------------------------------------------

  useEffect(() => {

    if (!isAuthenticated) {

      navigate("/auth/login");

    } else {

      (async () => {

        const token = getToken();
        const username = getUsername();

        console.log(
          "are we really getting the username ",
          username
        );

        const result = await getUserDataThroughToken({
          username,
          token
        });

        if (result.success) {

          console.log(
            "with token user fetched the data successfully"
          );

          setUserobj(result.data);
        }

      })();

    }

  }, [isAuthenticated]);


  // --------------------------------------------------
  // Loading State
  // --------------------------------------------------

  if (loading) {
    return <h1>loading..</h1>;
  }


  // --------------------------------------------------
  // Update Authentication Token
  // --------------------------------------------------

  const userObjUpdateToken = async (e) => {

    e.preventDefault();

    if (userobj) {

      try {

        setLoading(true);

        const reuslt =
          await getAuthTokenFunc<userGetTokenTypePayload>({
            username: userobj.username,
            password: userobj.password,
          });

        setUserAuthObj(reuslt);

        console.log(
          "{username,password} call -> api hit -> /auth/login -> userAuthObj"
        );

      } catch (error) {

        throw new Error(
          "Error While calling getAuthTOkenFunc",
          error
        );

      } finally {

        setLoading(false);

      }

    }

  };


  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (

    <div>

      <div>
        Dashboard
      </div>


      <form
        onSubmit={(e) => logout(e)}
        className="fill-mist-600"
      >

        <label htmlFor="">
          Hi! {userobj.username}
        </label>

        <button
          type="submit"
          className="bg-orange-100 p-2 rounded block"
        >
          Log Out
        </button>

      </form>


      <div>
        Your Token : {
          userAuthObj.accessToken
            ? userAuthObj.accessToken
            : "no token yet"
        }
      </div>

    </div>

  );

}

export default Dashboard;

