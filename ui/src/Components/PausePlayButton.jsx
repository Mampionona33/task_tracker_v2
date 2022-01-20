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
  updateElastedTime,
  loadElapstedTime,
  modifyLastUpdate,
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
  const elapstedTime = loadElapstedTime();

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
      const dateNow = new Date();
      if (currentProcess === 'isPlay') {
        setTimer(dateNow.getTime() - lastUpdate + elapstedTime);
        tickTimer();
      }
      if (currentProcess === 'isPause') {
        stopTickTimer();
        setTimer(dateNow.getTime() - lastUpdate + elapstedTime);
      }
    }
  }, [pauseData, playData, lastUpdate, currentProcess]);

  // console.log('elapstedTime', elapstedTime);

  const tickTimer = () => {
    timerCount.current = setInterval(() => {
      const dateNow = new Date();
      const diffDate = dateNow.getTime() - lastUpdate;
      // console.log('diffDate', diffDate);
      setTimer(diffDate + elapstedTime);
    }, 1000);
  };

  const pauseTimer = () => {
    const dateNowPause = new Date();
    const diffDatePause = dateNowPause.getTime() - lastUpdate;
    setTimer(diffDatePause);
  };

  const stopTickTimer = async () => {
    clearInterval(timerCount.current);
    return timerCount.current;
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
    await setProcessToPlay(prevProcessId, fichesUpdate, erroUpDate).then(
      tickTimer()
    );
  };

  const handleClickPause = async (e) => {
    e.preventDefault();
    console.log('erroUpDate timer', timer);
    await stopTickTimer()
      .then(setProcessToPause(prevProcessId, fichesUpdate, erroUpDate))
      .then(modifyLastUpdate(prevProcessId, fichesUpdate, erroUpDate))
      .then(updateElastedTime(prevProcessId, timer, fichesUpdate, erroUpDate));
    // await
    //   .then(stopTickTimer())
    //   .then(modifyLastUpdate(prevProcessId, fichesUpdate, erroUpDate))
    //   .then(updateElastedTime(prevProcessId, timer, fichesUpdate, erroUpDate));
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
