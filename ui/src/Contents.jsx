import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// import components
import DashBoard from './dashboard/DashBoard.jsx';
import TaskList from './TaskList.jsx';

const NotFound = () => <h1>Page Not Found </h1>;

export default function Contents() {
  return (
    <Routes>
      <Route path='/' element={<DashBoard />} />
      <Route path='/DashBoard' element={<DashBoard />} />
      <Route path='/settings' element={<TaskList/>} />
      <Route element={NotFound} />
    </Routes>
  );
}
