import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { loadUnsubmitedTask } from './dataHandler';
import { useAuth0 } from '@auth0/auth0-react';

export default function CurrentTaskPlay() {
  const [taskList, setTaskList] = useState([]);

  const { user } = useAuth0();

  // fetching data on component mount
  const dataUnsubmited = loadUnsubmitedTask();

  //Riley Reyes
  useEffect(() => {
    if (dataUnsubmited) {
      setTaskList((prev) => dataUnsubmited);
    }
  }, [dataUnsubmited]);

  let userTask = [];
  if (taskList !== undefined) {
    userTask = taskList.filter((task) => task.user.email === user.email);
  }

  let taskPlay = [];
  let taskPause = [];
  if (userTask.length > 0) {
    taskPlay = userTask.filter((task) => task.processing === 'isPlay');
    taskPause = userTask.filter((task) => task.processing === 'isPause');
  }

  let currentTasks = [];

  if (taskPlay.length > 0) {
    currentTasks = taskPlay;
  }

  if (taskPause.length > 0) {
    currentTasks = taskPause;
  }

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

  let arrayTask = {};
  const currentTask = currentTasks.map((task) => {
    arrayTask = {
      taskType: task.typeTrav,
      numFiche: task.numFiche,
      nbrBefore: task.nbBefor,
      nbrAfter: task.nbAft,
      statuCom: task.statuCom,
      status: task.state,
    };
    return arrayTask;
  });

  return (
    <Box display='flex' flexDirection='column' margin='1em'>
      <Box className={classes.processingBox}>
        <Typography variant='body2' className={classes.processingTypography}>
          Task Type:
        </Typography>
        <Typography variant='body2'>{arrayTask.taskType}</Typography>
      </Box>
      <Divider />

      <Box className={classes.processingBox}>
        <Typography variant='body2' className={classes.processingTypography}>
          Task Number:
        </Typography>
        <Typography variant='body2'>{arrayTask.numFiche}</Typography>
      </Box>
      <Divider />

      <Box className={classes.processingBox}>
        <Typography variant='body2' className={classes.processingTypography}>
          Status Commercial:
        </Typography>
        <Typography variant='body2'>{arrayTask.statuCom}</Typography>
      </Box>
      <Divider />

      <Box className={classes.processingBox}>
        <Typography variant='body2' className={classes.processingTypography}>
          Nbr Product Before:
        </Typography>
        <Typography variant='body2'>{arrayTask.nbrBefore}</Typography>
      </Box>
      <Divider />

      <Box className={classes.processingBox}>
        <Typography variant='body2' className={classes.processingTypography}>
          Nbr Product After:
        </Typography>
        <Typography variant='body2'>{arrayTask.nbrAfter}</Typography>
      </Box>
      <Divider />

      <Box className={classes.processingBox}>
        <Typography variant='body2' className={classes.processingTypography}>
          Status:
        </Typography>
        <Typography variant='body2'>{arrayTask.status}</Typography>
      </Box>
      <Divider />
    </Box>
  );
}

// use this use object.map() inside of React.Children.toArray to avoid warning key unique
// const output = React.Children.toArray(
// currentFiche.map((item, index) => {
// return (
// <React.Fragment>
// <Box className={classes.processingBox}>
// <Typography className={classes.processingTypography}>
// Task Type:
// </Typography>
// <Typography>{item.typeTrav}</Typography>
// </Box>
// <Typography></Typography>
// <Divider />

// <Box className={classes.processingBox}>
// <Typography className={classes.processingTypography}>
// Num Fiche:
// </Typography>
// <Typography>{item.numFiche}</Typography>
// </Box>
// <Divider />

// <Box className={classes.processingBox}>
// <Typography className={classes.processingTypography}>
// Status Com:
// </Typography>
// <Typography>{item.statuCom}</Typography>
// </Box>
// <Divider />

// <Box className={classes.processingBox}>
// <Typography className={classes.processingTypography}>
// NB Prod Before:
// </Typography>
// <Typography>{item.nbBefor}</Typography>
// </Box>
// <Divider />

// <Box className={classes.processingBox}>
// <Typography className={classes.processingTypography}>
// NB Prod After:
// </Typography>
// <Typography>{item.nbAft}</Typography>
// </Box>
// <Divider />
// </React.Fragment>
// );
// })
// );
