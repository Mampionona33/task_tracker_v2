import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Typography, Divider } from '@mui/material';
import {
  loadAllData,
  loadUnsubmitedTask,
  fetchTaskType,
  userLoggedTasks,
} from './dataHandler';

const CurrentTaskProductivity = () => {
  const [componentData, setComponentData] = useState([]);

  // fetch all unsubmite task
  const allUnsubmitedTask = loadUnsubmitedTask();
  // fetch all task type
  const allTaskType = fetchTaskType();
  const userDataLoged = userLoggedTasks();

  // get connected user
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  let userData = [];
  if (user) {
    userData = componentData.filter((task) => task.user.email === user.email);
  }

  useEffect(() => {
    if (allUnsubmitedTask !== undefined) {
      setComponentData((prev) => allUnsubmitedTask);
    }
  }, [allUnsubmitedTask]);

  console.log('userDataLoged', userDataLoged);
  /* console.log('allTaskType', allTaskType);
  console.log('allTaskType', allTaskType); */

  return (
    <React.Fragment>
      <h1>Productivity</h1>
    </React.Fragment>
  );
};

export default CurrentTaskProductivity;
