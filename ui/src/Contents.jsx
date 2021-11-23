import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import components
import TaskList from './TaskList.jsx';
import DashBoard from './Dashboard.jsx';

const NotFound = () => {
  return <h1>Page Not Found</h1>;
};

export default function Contents() {
  return (
    <Routes>
      <Route path='/' element={<DashBoard />} />
      <Route path='/tasklist' element={<TaskList />} />
      <Route path='/dashboard' element={<DashBoard />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
