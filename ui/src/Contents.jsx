import React, { useEffect } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

// import components
import TaskList from './pages/TaskList.jsx';
import DashBoard from './pages/Dashboard.jsx';
import SubmitedTable from './pages/SubmitedTable.jsx';
import Settings from './pages/Setting.jsx';
import { useAuth0 } from '@auth0/auth0-react';
import History from './Components/History.jsx';

const NotFound = () => {
  return (
    <Box display='flex' justifyContent='center' sx={{ margin: '35vh 0' }}>
      <Typography variant='h1'>Page Not Found</Typography>
    </Box>
  );
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
      <Route path='/submitedList' element={<SubmitedTable />} />
      <Route path='/history' element={<History />} />
      <Route path='/settings' element={<Settings />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
