import React, { useEffect, useState, useRef } from 'react';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useMutation } from '@apollo/client';
import { UPDATE_FICHE } from '../GraphQL/Mutation';
import { LOAD_DATA } from '../GraphQL/Queries';
import {
  loadProcessingPause,
  loadProcessingPlay,
  setProcessToPause,
  setProcessToPlay,
  getLastupdate,
  updateElastedTime,
  modifyLastUpdate,
} from './dataHandler';
import { getUtcDateNow } from '../Features/getUtcDateNow';
import { Tooltip, IconButton, Typography, Box } from '@mui/material';
import TimerDisplay from './TimerDisplay';
import { makeStyles } from '@mui/styles';
import ValidateButton from './ValidateButton.jsx';

const Timer = () => {
  const [currentProcess, setCurrentProcess] = useState('');
  const [prevProcessId, setPrevProcessId] = useState(0);
  const [prevFicheLastUpdate, setPrevFicheLastUpdate] = useState([]);
  const [prevFicheElapstedTime, setPrevFicheElapstedTime] = useState(0);
  const [uiTimer, setUiTimer] = useState(0);

  let count = useRef(null);
  let timerCount = useRef(null);

  // load processing task status
  const pauseData = loadProcessingPause();
  const playData = loadProcessingPlay();
  const lastUpdate = getLastupdate();
  const dateNow = getUtcDateNow();

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

  useEffect(() => {
    if (playData.length > 0) {
      setPrevProcessId((prevId) => playData[0].id);
      setCurrentProcess((prev) => playData[0].processing);
      setPrevFicheLastUpdate((prev) => playData[0].lastUpdate);
      setPrevFicheElapstedTime((prev) => playData[0].elapstedTime);
    }

    if (pauseData.length > 0) {
      setCurrentProcess((prev) => pauseData[0].processing);
      setPrevProcessId((prevId) => pauseData[0].id);
      setPrevFicheLastUpdate((prev) => pauseData[0].lastUpdate);
      setPrevFicheElapstedTime((prev) => pauseData[0].elapstedTime);
    }

    if (currentProcess === 'isPlay') {
      timerCount.current = setInterval(() => tick(), 1000);
      // tsy azoko le logic fa nataoko teo de mande
      return () => {
        clearInterval(timerCount.current);
        timerCount.current = 0;
      };
    }

    if (currentProcess === 'isPause') {
      setUiTimer((prev) => prevFicheElapstedTime);
      stopTick();
    }
  }, [pauseData, playData, currentProcess, prevFicheLastUpdate]);

  const tick = () => {
    setUiTimer(
      (prev) =>
        (Date.parse(new Date()) - Date.parse(prevFicheLastUpdate)) / 1000 +
        prevFicheElapstedTime
    );
  };

  const stopTick = async () => {
    clearInterval(timerCount.current);
    return (timerCount.current = 0);
  };

  const handleClickPlay = async (e) => {
    await setProcessToPlay(prevProcessId, fichesUpdate, erroUpDate).then(
      modifyLastUpdate(prevProcessId, fichesUpdate, erroUpDate)
    );
  };

  const handleClickPause = async (e) => {
    const elapstedTime =
      (Date.parse(new Date()) - Date.parse(prevFicheLastUpdate)) / 1000 +
      prevFicheElapstedTime;

    await stopTick()
      .then(
        updateElastedTime(
          prevProcessId,
          Math.floor(elapstedTime),
          fichesUpdate,
          erroUpDate
        )
      )
      .then(setProcessToPause(prevProcessId, fichesUpdate, erroUpDate))
      .then(modifyLastUpdate(prevProcessId, fichesUpdate, erroUpDate));
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
        <Typography className={classes.processingTypography}>
          Elapsted time:
        </Typography>
        <TimerDisplay value={uiTimer} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '0 1rem',
        }}
      >
        <ValidateButton />
        {currentProcess === 'isPlay' ? <ButtonPause /> : <ButtonPlay />}
      </Box>
    </Box>
  );
};

export default Timer;
