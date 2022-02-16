import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { fetchTaskType, userLoggedTasks } from './dataHandler';
import { makeStyles } from '@mui/styles';

const CurrentTaskProductivity = () => {
  const [userTaskListUnsb, setUserTaskListUnsb] = useState([]);
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
        const prod = Math.round((returnPlause / returnGoalPause) * 100);
        clearInterval(count.current);
        setProductivity((prev) => prod);
      }
    }
  }, [userDataLoged, userTaskListUnsb]);

  //   create classe for Box and Typography
  const useStyles = makeStyles({
    processingBox: {
      display: 'flex',
      justifyContent: 'space-between',
      columnGap: '1rem',
    },
    processingTypography: {
      fontWeight: '700',
    },
  });
  //   import the created classe here
  const classes = useStyles();

  return (
    <Box sx={{ margin: '0 1rem' }}>
      <Box className={classes.processingBox}>
        <Typography className={classes.processingTypography}>
          Productivity
        </Typography>
        <p>{productivity}</p>
      </Box>
    </Box>
  );
};

export default CurrentTaskProductivity;
