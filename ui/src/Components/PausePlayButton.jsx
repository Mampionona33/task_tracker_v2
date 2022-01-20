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
  renderDate,
} from './dataHandler';
import { IconButton, Typography, Box } from '@mui/material';

const PausePlayButton = () => {
  const [currentProcess, setCurrentProcess] = useState('');
  const [prevProcessId, setPrevProcessId] = useState(0);
  const [localElapstedTime, setLocalElapstedTime] = useState(0);
  const [timer, setTimer] = useState([]);
  let count = useRef(null);
  let timerCount = useRef(null);

  // load processing task status
  const pauseData = loadProcessingPause();
  const playData = loadProcessingPlay();
  const lastUpdate = getLastupdate();

  // execute mutation fichesUpdate with useMutation
  const [fichesUpdate, { error: erroUpDate }] = useMutation(UPDATE_FICHE, {
    refetchQueries: [LOAD_DATA],
  });

  useEffect(() => {
    if (pauseData.length > 0) {
      setCurrentProcess((prev) => pauseData[0].processing);
      setPrevProcessId((prevId) => pauseData[0].id);
      setLocalElapstedTime((prev) => pauseData[0].elapstedTime);
    }
    if (playData.length > 0) {
      setCurrentProcess((prev) => playData[0].processing);
      setPrevProcessId((prevId) => playData[0].id);
      setLocalElapstedTime((prev) => playData[0].elapstedTime);
    }

    if (lastUpdate) {
      tickTimer();
    }
  }, [pauseData, playData, lastUpdate]);

  const tickTimer = () => {
    timerCount.current = setInterval(() => {
      const dateNow = new Date();
      const diffDate = dateNow.getTime() - lastUpdate;
      console.log('diffDate', diffDate);
      setTimer(diffDate);
    }, 1000);
  };

  // const tick = async () => {
  //   count.current = setInterval(() => {
  //     setLocalElapstedTime((prev) => prev + 1);
  //   }, 1000);
  // };

  // const stopTick = () => {
  //   clearInterval(count.current);
  // };

  const handleClickPlay = async (e) => {
    await setProcessToPlay(prevProcessId, fichesUpdate, erroUpDate);
  };

  const handleClickPause = async (e) => {
    await setProcessToPause(prevProcessId, fichesUpdate, erroUpDate);
  };

  const ButtonPlay = () => {
    return (
      <IconButton
        color='primary'
        component='span'
        aria-label='Play button'
        onClick={handleClickPlay}
      >
        <PlayCircleIcon />
      </IconButton>
    );
  };

  const ButtonPause = () => {
    return (
      <IconButton
        color='primary'
        component='span'
        aria-label='Pause button'
        onClick={handleClickPause}
      >
        <PauseCircleIcon />
      </IconButton>
    );
  };

  return (
    <Box sx={{ margin: 5 }}>
      {lastUpdate ? <p>last Update:{renderDate(timer)}</p> : '...'}
      <Typography>elapsted time: {localElapstedTime}</Typography>
      {currentProcess === 'isPlay' ? <ButtonPause /> : <ButtonPlay />}
    </Box>
  );
};

export default PausePlayButton;
