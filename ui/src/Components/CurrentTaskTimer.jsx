import React, { useEffect, useState, useRef } from 'react';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useMutation } from '@apollo/client';
import { UPDATE_FICHE } from '../GraphQL/Mutation';
import { LOAD_DATA } from '../GraphQL/Queries';
import {
  setProcessToPause,
  setProcessToPlay,
  updateElastedTime,
  updateTaskLastUpdate,
  loadAllData,
  loadUnsubmitedTask,
} from './dataHandler';
import { getUtcDateNow } from '../Features/getUtcDateNow';
import { Tooltip, IconButton, Typography, Box } from '@mui/material';
import CurrentTaskTimerDisplay from './CurrentTaskTimerDisplay';
import { makeStyles } from '@mui/styles';
import ValidateButton from './ValidateButton.jsx';
import { useAuth0 } from '@auth0/auth0-react';

const CurrentTaskTimer = () => {
  const [taskList, setTaskList] = useState([]);
  const [uiTimer, setUiTimer] = useState(0);
  let timerCount = useRef(null);

  // load processing task status
  const loadAllDataTimer = loadAllData();
  const dataUnsubmited = loadUnsubmitedTask();

  // execute mutation fichesUpdate with useMutation
  const [fichesUpdate, { error: erroUpDate }] = useMutation(UPDATE_FICHE, {
    refetchQueries: [LOAD_DATA],
  });

  //   create classe for Box and Typography
  const useStyles = makeStyles({
    processingBox: {
      display: 'flex',
      justifyContent: 'space-between',
      columnGap: '1rem',
      padding: '0.5rem',
    },
    processingTypography: {
      fontWeight: '700',
      marginTop: '5px',
    },
  });
  //   import the created classe here
  const classes = useStyles();

  // get connected user
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();

  let userTaskList = [];
  if (taskList !== undefined) {
    userTaskList = taskList.filter((task) => task.user.email === user.email);
  }

  let userTaskPlay = [];
  let userTaskPause = [];

  if (userTaskList.length > 0) {
    userTaskPlay = userTaskList.filter((task) => task.processing === 'isPlay');
    userTaskPause = userTaskList.filter(
      (task) => task.processing === 'isPause'
    );
  }

  let currentTask = [];

  if (userTaskPlay.length > 0) {
    currentTask = userTaskPlay;
  }

  if (userTaskPause.length > 0) {
    currentTask = userTaskPause;
  }

  let currentTaskDataArray = {};
  const currentTaskData = currentTask.map((task) => {
    currentTaskDataArray = {
      processing: task.processing,
      id: task.id,
      lastUpdate: task.lastUpdate,
      elapstedTime: task.elapstedTime,
    };
    return currentTaskDataArray;
  });

  useEffect(() => {
    if (dataUnsubmited !== undefined) {
      setTaskList((prev) => dataUnsubmited);
    }
    if (currentTaskDataArray.processing === 'isPlay') {
      timerCount.current = 0;
      timerCount.current = setInterval(() => tick(), 1000);
      // tsy azoko le logic fa nataoko teo de mande
      return () => {
        clearInterval(timerCount.current);
        timerCount.current = 0;
      };
    }
    if (currentTaskDataArray.processing === 'isPause') {
      setUiTimer((prev) => currentTaskDataArray.elapstedTime);
      stopTick();
    }
  }, [loadAllDataTimer, currentTaskDataArray.processing, dataUnsubmited]);

  const tick = () => {
    setUiTimer(
      (prev) =>
        (Date.parse(new Date()) - Date.parse(currentTaskDataArray.lastUpdate)) /
          1000 +
        currentTaskDataArray.elapstedTime
    );
  };

  const stopTick = async () => {
    clearInterval(timerCount.current);
    return (timerCount.current = 0);
  };

  const handleClickPlay = async (e) => {
    await setProcessToPlay(
      currentTaskDataArray.id,
      fichesUpdate,
      erroUpDate
    ).then(updateTaskLastUpdate(currentTaskDataArray.id, fichesUpdate, erroUpDate));
  };

  const handleClickPause = async (e) => {
    const elapstedTime =
      (Date.parse(new Date()) - Date.parse(currentTaskDataArray.lastUpdate)) /
        1000 +
      currentTaskDataArray.elapstedTime;

    await stopTick()
      .then(
        updateElastedTime(
          currentTaskDataArray.id,
          Math.floor(elapstedTime),
          fichesUpdate,
          erroUpDate
        )
      )
      .then(
        setProcessToPause(currentTaskDataArray.id, fichesUpdate, erroUpDate)
      )
      .then(
        updateTaskLastUpdate(currentTaskDataArray.id, fichesUpdate, erroUpDate)
      );
  };

  const ButtonPlay = () => {
    return (
      <Tooltip title='Set Timer Play' arrow>
        <IconButton
          color='primary'
          component='span'
          label='Play button'
          onClick={handleClickPlay}
        >
          <PlayCircleIcon sx={{ fontSize: '30px', color: '#A52A2A' }} />
        </IconButton>
      </Tooltip>
    );
  };

  const ButtonPause = () => {
    return (
      <Tooltip title='Set Timer Pause' arrow>
        <IconButton
          color='primary'
          component='span'
          label='Pause button'
          onClick={handleClickPause}
        >
          <PauseCircleIcon sx={{ fontSize: '30px' }} />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '0 1rem',
          columnGap: '1rem',
        }}
      >
        <Typography variant='body2' className={classes.processingTypography}>
          Elapsted time:
        </Typography>
        <CurrentTaskTimerDisplay value={uiTimer} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '0 1rem',
        }}
      >
        <ValidateButton
          prevTaskId={currentTaskDataArray.id}
          resetTimer={setUiTimer}
        />
        {currentTaskDataArray.processing === 'isPlay' ? (
          <ButtonPause />
        ) : (
          <ButtonPlay />
        )}
      </Box>
    </Box>
  );
};

export default CurrentTaskTimer;
