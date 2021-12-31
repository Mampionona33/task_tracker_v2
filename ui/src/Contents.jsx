import React, { useEffect } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';

// import components
import TaskList from './Components/TaskList.jsx';
import DashBoard from './Components/Dashboard.jsx';
import { useAuth0 } from '@auth0/auth0-react';

const NotFound = () => {
  return <h1>Page Not Found</h1>;
};

export default function Contents() {
  const { loginWithRedirect, logout, user, isLoading, isAuthenticated } =
    useAuth0();

  useEffect(() => {
    if (!user && !isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [user, isLoading, isAuthenticated]);

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/dashboard' />} />
      <Route path='/tasklist' element={<TaskList />} />
      <Route path='/dashboard' element={<DashBoard />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
