import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// import components
import TaskList from './Components/TaskList.jsx';
import DashBoard from './Components/Dashboard.jsx';
const NotFound = () => {
  return <h1>Page Not Found</h1>;
};

export default function Contents() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/dashboard' />} />
      <Route path='/tasklist' element={<TaskList />} />
      <Route path='/dashboard' element={<DashBoard />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
