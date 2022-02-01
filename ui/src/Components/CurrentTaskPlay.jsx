import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { userLoggedData, loadUnsubmitedTask, loadAllData } from './dataHandler';
import { useAuth0 } from '@auth0/auth0-react';

export default function CurrentTaskPlay() {
  const [currentFiche, setCurrentFiche] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [userTask, setUserTask] = useState([]);
  const [currentTaskPlay, setCurrentTaskPlay] = useState([]);

  const { user } = useAuth0();

  // fetching data on component mount
  const userData = loadUnsubmitedTask();
  const loadData_ = loadAllData();

  useEffect(() => {
    if (userData.length > 0) {
      // const taskPlay = userData.filter(
      //   (task) => task.processing === 'isPlay' && task.user.email === user.email
      // );
      const taskPause = userData.filter(
        (task) =>
          task.processing === 'isPause' && task.user.email === user.email
      );

      // if (taskPlay.length > 0) {
      //   setCurrentFiche((prev) => taskPlay);
      // }

      if (taskPause.length > 0) {
        setCurrentFiche((prev) => taskPause);
      }
    }
    // fetch all data
    if (loadData_ !== undefined) {
      setTaskList((prev) => loadData_.listFiches);
    }
    // fet all data for the current user
    if (taskList !== undefined) {
      setUserTask((prev) =>
        taskList.filter((task) => task.user.email === user.email)
      );
    }

    if (userTask.length > 0) {
      // fetch the current task play
      setCurrentTaskPlay((prev) =>
        userTask.filter((task) => task.processing === 'isPlay')
      );
    }

    // if (currentTaskPlay.length > 0) {
    //   setCurrentFiche((prev) => currentTaskPlay);
    // }
  }, [userData, loadData_, taskList, currentTaskPlay]);

  console.log('list fiche', taskList);
  console.log('user list fiche', userTask);
  console.log('Current task ', currentTaskPlay);

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

  console.log('data', currentFiche);

  let arrayTask = {};
  const currentTask = currentFiche.map((task) => {
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

  console.log(arrayTask.taskType);

  return (
    <Box display='flex' flexDirection='column' margin='1em'>
      <Box className={classes.processingBox}>
        <Typography className={classes.processingTypography}>
          Task Type:
        </Typography>
        <Typography>{arrayTask.taskType}</Typography>
      </Box>
      <Divider />

      <Box className={classes.processingBox}>
        <Typography className={classes.processingTypography}>
          Task Number:
        </Typography>
        <Typography>{arrayTask.numFiche}</Typography>
      </Box>
      <Divider />

      <Box className={classes.processingBox}>
        <Typography className={classes.processingTypography}>
          Status Commercial:
        </Typography>
        <Typography>{arrayTask.statuCom}</Typography>
      </Box>
      <Divider />

      <Box className={classes.processingBox}>
        <Typography className={classes.processingTypography}>
          Nbr Product Before:
        </Typography>
        <Typography>{arrayTask.nbrBefore}</Typography>
      </Box>
      <Divider />

      <Box className={classes.processingBox}>
        <Typography className={classes.processingTypography}>
          Nbr Product After:
        </Typography>
        <Typography>{arrayTask.nbrAfter}</Typography>
      </Box>
      <Divider />

      <Box className={classes.processingBox}>
        <Typography className={classes.processingTypography}>
          Status:
        </Typography>
        <Typography>{arrayTask.status}</Typography>
      </Box>
      <Divider />
    </Box>
  );
}
