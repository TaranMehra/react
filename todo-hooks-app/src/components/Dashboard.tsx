import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useUserData } from '../config/api/contextApi';
import { getUserDataThroughToken } from '../config/api/apiMethods';

function Dashboard() {
  const {
    isAuthenticated,
    logout,
    setLoading,
    loading,
    userobj,
    setUserobj,
  } = useUserData();

  const navigate = useNavigate();

  // Fetch user data once authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      try {
        const result = await getUserDataThroughToken(); // no args needed now

        if (result.success) {
          setUserobj(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        // if the interceptor's refresh also failed, it already redirects to login
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [isAuthenticated, navigate, setLoading, setUserobj]);

  // Logout handler
  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    logout(); // no args — context handles clearing localStorage + state
    navigate("/auth/login");
  };

  // Loading state
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // UI
  return (
    <div>
      <div>Dashboard</div>

      <form onSubmit={handleLogout} className="fill-mist-600">
        <label>Hi! {userobj.username}</label>
        <button type="submit" className="bg-orange-100 p-2 rounded block">
          Log Out
        </button>
      </form>
    </div>
  );
}

export default Dashboard;