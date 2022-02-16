import React, { useEffect, useState, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Typography, Divider } from '@mui/material';
import { fetchTaskType, userLoggedTasks } from './dataHandler';
import { empty } from '@apollo/client';

const CurrentTaskProductivity = () => {
  const [userTaskListUnsb, setUserTaskListUnsb] = useState([]);
  const [goal, setGoal] = useState(0);
  const [nbAft, setNbAft] = useState(0);
  const [elapstedTime, setElapstedTime] = useState(0);
  const [lastUpdate, setLastUpdate] = useState([]);
  const [productivity, setProductivity] = useState(0);
  const count = useRef();

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
      // If task processing is play and allTaskType note empty
      if (taskPlay.length > 0 && allTaskType) {
        const getGoalPlay = allTaskType.filter(
          (taskType) => taskType.name === taskPlay[0].typeTrav
        );

        const goalPlay = getGoalPlay[0].objectif;
        const nbAftPlay = taskPlay[0].nbAft;
        let elapstedTime_ =
          (Date.parse(new Date()) - Date.parse(taskPlay[0].lastUpdate)) / 1000 +
          taskPlay[0].elapstedTime;

        count.current = setInterval(() => {
          elapstedTime_++;
          const returnGoal = goalPlay / 3600;
          const return_ = nbAftPlay / elapstedTime_;
          const prod = Math.round((return_ / returnGoal) * 100);
          setProductivity((prev) => prod);
        }, 1000);
        return () => {
          clearInterval(count.current);
          count.current = 0;
        };
      }

      if (taskPause.length > 0) {
        const getGoalPause = allTaskType.filter(
          (taskType) => taskType.name === taskPause[0].typeTrav
        );
        const goalPause = getGoalPause[0].objectif;
        const nbAftPause = taskPause[0].nbAft;
        const elapstedTimePause = taskPause[0].elapstedTime;

        const returnGoalPause = goalPause / 3600;
        const returnPlause = nbAftPause / elapstedTimePause;
        const prod = Math.round((returnPlause / returnGoalPause) * 1000);

        console.log('goalPause', goalPause);
        console.log('nbAftPause', nbAftPause);
        console.log('elapstedTimePause', elapstedTimePause);
        console.log('prod pause', prod);
      }
    }
  }, [userDataLoged, userTaskListUnsb]);

  return (
    <React.Fragment>
      <h1>Productivity : </h1>
      <p>{productivity}</p>
    </React.Fragment>
  );
};

export default CurrentTaskProductivity;
