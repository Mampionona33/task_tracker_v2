import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Typography, Divider } from '@mui/material';
import { fetchTaskType, userLoggedTasks } from './dataHandler';
import { empty } from '@apollo/client';

const CurrentTaskProductivity = () => {
  const [userTaskListUnsb, setUserTaskListUnsb] = useState([]);
  //   const [currentTask, setCurrentTask] = useState([]);
  const [goal, setGoal] = useState(0);

  // fetch all task type
  const allTaskType = fetchTaskType();
  // fetch all unsubmite task
  const userDataLoged = userLoggedTasks();

  const taskPlay = userTaskListUnsb.filter(
    (task) => task.processing === 'isPlay'
  );
  const taskPause = userTaskListUnsb.filter(
    (task) => task.processing === 'isPause'
  );

  useEffect(() => {
    // Fetch all task unsubmite for the current user
    if (userDataLoged.length > 0) {
      setUserTaskListUnsb((prev) => userDataLoged);
    }

    /* if task user list is note empty. make filter to find 
		pause and play task and asign it to the current task */
    if (userTaskListUnsb.length > 0 && allTaskType) {
      if (taskPlay.length > 0 && allTaskType) {
        const getGoalPlay = allTaskType.filter(
          (taskType) => taskType.name === taskPlay[0].typeTrav
        );
        setGoal((prev) => getGoalPlay[0].objectif);
      }

      if (taskPause.length > 0) {
        const getGoalPause = allTaskType.filter(
          (taskType) => taskType.name === taskPause[0].typeTrav
        );
        setGoal((prev) => getGoalPause[0].objectif);
      }
    }
  }, [userDataLoged, userTaskListUnsb]);

  console.log('goal', goal);
  /* console.log('allTaskType', allTaskType);
  console.log('allTaskType', allTaskType); */

  return (
    <React.Fragment>
      <h1>Productivity</h1>
    </React.Fragment>
  );
};

export default CurrentTaskProductivity;
