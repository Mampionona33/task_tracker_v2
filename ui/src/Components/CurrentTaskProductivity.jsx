import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import PropTypes from 'prop-types';
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
          setProductivity((prev) => (prod > 100 ? 100 : prod));
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
        setProductivity((prev) => (prod > 100 ? 100 : prod));
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

  const LinearProgressWithLabel = (props) => {
    return (
      <Box display='flex' alignItems='center'>
        <Box width='100%' mr={1}>
          <LinearProgress
            variant='determinate'
            {...props}
            color={
              props.value >= 94
                ? 'success'
                : props.value > 90
                ? 'warning'
                : 'error'
            }
          />
        </Box>
        <Box minWidth={35}>
          {props.value >= 94 ? (
            <Typography
              variant='body1'
              color='#388e3c'
              sx={{ fontWeight: '900' }}
            >
              {' '}
              {`${Math.round(props.value)}%`}
            </Typography>
          ) : props.value > 90 ? (
            <Typography
              variant='body1'
              color=' #f57c00'
              sx={{ fontWeight: '900' }}
            >
              {' '}
              {`${Math.round(props.value)}%`}
            </Typography>
          ) : (
            <Typography
              variant='body1'
              color='#d32f2f'
              sx={{ fontWeight: '900' }}
            >
              {' '}
              {`${Math.round(props.value)}%`}
            </Typography>
          )}
        </Box>
      </Box>
    );
  };
  LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  };

  return (
    <Box sx={{ margin: '0 1rem' }}>
      <Box className={classes.processingBox}>
        <Typography className={classes.processingTypography}>
          Productivity
        </Typography>
        <Box sx={{ width: '100%' }}>
          <LinearProgressWithLabel
            value={productivity}
            sx={{ height: '0.5rem', borderRadius: '25px' }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CurrentTaskProductivity;
