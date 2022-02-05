import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {  loadUnsubmitedTask,productivity,fetchTaskType } from './dataHandler';
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
  
  
  // Productivity
  // let typeTrav = [];
  // let nbrAfter = [];
  // let nbrBefore = [];  
    // if(currentTasks.length >0){
    // typeTrav = currentTasks[0].typeTrav;
    // nbrAfter = currentTasks[0].nbAft;
    // nbrBefore = currentTasks[0].currentTasks;
  // }  
    // console.log('currentTasks',currentTasks);
    
  // const allTaskType = fetchTaskType();
  
  // if(typeTrav.length > 0 && allTaskType !== undefined  ){
  // console.log('allTaskType',allTaskType);
  // console.log('typeTrav',typeTrav);
  
  // const typeTaskRef = allTaskType.filter(item => item.name === typeTrav && nbrAfter !== undefined);
  // console.log('typeTaskRef',typeTaskRef);
  
  // const typeTaskRefObjectif = typeTaskRef[0].objectif;
  // console.log('typeTaskRefObjectif',typeTaskRefObjectif);  
  // console.log('nbrAfter',nbrAfter);  
  
  // const prod = productivity(typeTrav,10,10);
  // console.log('prod', prod);
  // }

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
