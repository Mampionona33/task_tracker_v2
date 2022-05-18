import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Box, Typography, LinearProgress, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import {
  fetchTaskType,
  updateCat,
  userLoggedTasks,
  updateTaskProductivity,
} from './dataHandler';
import { makeStyles } from '@mui/styles';
import { useMutation } from '@apollo/client';
import { UPDATE_FICHE } from '../GraphQL/Mutation';
import { LOAD_DATA } from '../GraphQL/Queries';

const CurrentTaskProductivity = () => {
  const [userTaskListUnsb, setUserTaskListUnsb] = useState([]);
  const [productivity, setProductivity] = useState(0);
  const [currentTask, setCurrentTask] = useState([]);
  const [reelProd, setReelProd] = useState(0);
  const count = useRef(null);

  // execute mutation fichesUpdate with useMutation
  const [fichesUpdate, { error: erroUpDate }] = useMutation(UPDATE_FICHE, {
    refetchQueries: [LOAD_DATA],
  });

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

    /* if task user list is not empty. make filter to find 
    pause and play task and asign it to the current task */

    if (userTaskListUnsb.length > 0 && allTaskType) {
      // If task processing is play and allTaskType note empty
      if (
        taskPlay.length > 0 &&
        allTaskType &&
        taskPlay[0].typeTrav != 'Empty Type'
      ) {
        setCurrentTask((prev) => taskPlay);

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
          const prevProd = prod - 1;
          setProductivity((prev) => (prod > 100 ? 100 : prod));
          setReelProd((prev) => prod);
        }, 1000);
        return () => {
          clearInterval(count.current);
          count.current = 0;
        };
      }

      if (taskPause.length > 0) {
        setCurrentTask((prev) => taskPause);
        const getGoalPause = allTaskType.filter(
          (taskType) => taskType.name === taskPause[0].typeTrav
        );
        const goalPause = getGoalPause[0].objectif;
        const nbAftPause = taskPause[0].nbAft;
        const elapstedTimePause = taskPause[0].elapstedTime;

        const returnGoalPause = goalPause / 3600;
        const returnPause = nbAftPause / elapstedTimePause;
        const prod = Math.round((returnPause / returnGoalPause) * 100);
        clearInterval(count.current);
        setProductivity((prev) => (prod > 100 ? 100 : prod));
        setReelProd((prev) => prod);
      }
    }
  }, [userDataLoged, userTaskListUnsb, allTaskType]);

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

  /* 
    use useMemo to run update only when reelProd
    value change, it's use to limite loop update
    */
  const updateProd = useMemo(() => {
    if (currentTask.length > 0) {
      return updateTaskProductivity(
        currentTask[0].id,
        fichesUpdate,
        erroUpDate,
        reelProd
      );
    }
  }, [reelProd]);

  // save productivity on value change
  const onProdChange = () => {
    if (currentTask.length > 0 && productivity) {
      updateProd;
    }
  };

  //   import the created classe here
  const classes = useStyles();

  const LinearProgressWithLabel = React.forwardRef((props, ref) => {
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
              variant='body2'
              color='#388e3c'
              sx={{ fontWeight: '900' }}
            >
              {' '}
              {`${Math.round(props.value)}%`}
            </Typography>
          ) : props.value > 90 ? (
            <Typography
              variant='body2'
              color=' #f57c00'
              sx={{ fontWeight: '900' }}
            >
              {' '}
              {`${Math.round(props.value)}%`}
            </Typography>
          ) : (
            <Typography
              variant='body2'
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
  });
  LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func,
  };

  return (
    <Box sx={{ margin: '0 1rem' }}>
      <Box className={classes.processingBox}>
        <Typography variant='body2' className={classes.processingTypography}>
          Productivity
        </Typography>
        <Box sx={{ width: '100%' }}>
          <LinearProgressWithLabel
            value={productivity}
            sx={{ height: '0.5rem', borderRadius: '25px' }}
          />
          <TextField
            value={reelProd}
            onChange={onProdChange()}
            sx={{ display: 'none' }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CurrentTaskProductivity;
