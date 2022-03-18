import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import PropTypes from 'prop-types';
import { fetchTaskType, userLoggedTasks } from './dataHandler';
import { makeStyles } from '@mui/styles';
import { useMutation } from '@apollo/client';
import { UPDATE_FICHE } from '../GraphQL/Mutation';
import { LOAD_DATA } from '../GraphQL/Queries';
import {updateProductivity} from './dataHandler' 

const CurrentTaskProductivity = () => {
  const [userTaskListUnsb, setUserTaskListUnsb] = useState([]);
  const [productivity, setProductivity] = useState(0);
  const count = useRef();


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

    /* if task user list is note empty. make filter to find 
    pause and play task and asign it to the current task */

    if (userTaskListUnsb.length > 0 && allTaskType) {
      // If task processing is play and allTaskType note empty
      if (
        taskPlay.length > 0 &&
        allTaskType &&
        taskPlay[0].typeTrav != 'Empty Type'
        ) {
        const getGoalPlay = allTaskType.filter(
          (taskType) => taskType.name === taskPlay[0].typeTrav
          );

      const goalPlay = getGoalPlay[0].objectif;
      const nbAftPlay = taskPlay[0].nbAft;
      let elapstedTime_ =
      (Date.parse(new Date()) - Date.parse(taskPlay[0].lastUpdate)) / 1000 +
      taskPlay[0].elapstedTime;

          // let prod = 1;

          count.current = setInterval(() => {
            elapstedTime_++;
            const returnGoal = goalPlay / 3600;
            const return_ = nbAftPlay / elapstedTime_;
            const prod = Math.round((return_ / returnGoal) * 100);
            const prevProd = prod - 1;
            setProductivity((prev) => (prod > 100 ? 100 : prod));
            
            // if(prod === prevProd){
            //   console.log(prod)
            //   updateProductivity(taskPlay[0].id,fichesUpdate,erroUpDate,prod)
            // }

          }, 1000);
          return () => {
            clearInterval(count.current);
            count.current = 0;

          };
        }

        if (taskPause.length > 0) {
        // console.log(taskPause[0])
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
        updateProductivity(taskPause[0].id,fichesUpdate,erroUpDate,prod)
      }
    }
    const refetchQuery = () => userLoggedTasks();
    window.addEventListener('focus', refetchQuery);
    return () => window.removeEventListener('focus', refetchQuery);
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
    <Typography variant='body2' className={classes.processingTypography}>
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
