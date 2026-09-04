import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { loginUser } from '../../../config/api/apiMethods';
import { useUserData } from '../../../config/api/contextApi';


function Login() {

  // State
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [submitting, setSubmitting] = useState(false); // LOCAL loading, not global
  const [error, setError] = useState<string>('');


  // Router & Context
  const navigate = useNavigate();
  const { isAuthenticated, login } = useUserData();


  // Form Submit
  const handleSubmitData = async (e: React.FormEvent) => {

    e.preventDefault();

    setError('');
    setSubmitting(true);

    try {

      const result = await loginUser({
        username,
        password
      });


      if (result.success && result.accessToken && result.refreshToken) {

        await login(result.accessToken, result.refreshToken, result.username); // sync — updates context + setting the token into localStorage
        console.log(
            "login at response : ",
            result
          );

        if (isAuthenticated) {

          


        } else {

          setError(
            'Login succeeded but token could not be stored.'
          );

        }

      } else {

        setError(
          result.message || 'Invalid username or password.'
        );

      }

    } catch (err) {

      console.error('Login error:', err);

      setError(
        'Something went wrong. Please try again.'
      );

    } finally {

      setSubmitting(false);

    }

  };


// Authentication Redirect
useEffect(() => {

    
  }, []);

// UI
return (
    <>

      <h1>Login</h1>


      <div className="register-container border-2px border-solid h-full w-full bg-[#4e311b] p-5">

        <div className="form-container">

          <form
            className="grid gap-2 w-2xl"
            onSubmit={handleSubmitData}
          >

            {/* Username */}

            <div className="div flex flex-col">

              <label htmlFor="username">
                Enter Your Name
              </label>

              <input
                type="text"
                id="username"
                name="username"
                placeholder="Taranpreet"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-2 rounded"
                required
              />

            </div>


            {/* Password */}

            <label
              htmlFor="password"
              className="mt-5"
            >
              Enter Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Atleast 4-5 letters, alphanumeric"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 rounded"
              required
            />


            {/* Error */}

            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}


            {/* Submit */}

            <button
              type="submit"
              disabled={submitting}
              className="pointer border-2 w-min p-1 rounded-2xl"
            >
              {submitting ? 'Logging in...' : 'Submit'}
            </button>

          </form>

        </div>

      </div>

    </>
  );

}


export default Login;
