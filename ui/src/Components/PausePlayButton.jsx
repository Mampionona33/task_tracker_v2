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
  const [prevFicheLastUpdate, setPrevFicheLastUpdate] = useState([]);

  const [tickInc, setTickInc] = useState(0);

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
      setTickInc((prev) => pauseData[0].elapstedTime);
    }
    if (playData.length > 0) {
      setCurrentProcess((prev) => playData[0].processing);
      setPrevProcessId((prevId) => playData[0].id);
      // setTickInc((prev) => playData[0].elapstedTime);
      setPrevFicheLastUpdate((prev) => playData[0].lastUpdate);
    }

    if (currentProcess === 'isPlay') {
      // timerCount.current = setInterval(() => tick(), 1000);
    }

    if (currentProcess === 'isPause') {
      clearInterval(timerCount.current);
    }

    if (prevFicheLastUpdate) {
      const dateNow = new Date();
      let diffDate = dateNow.getTime() - Date.parse(prevFicheLastUpdate);
      setTickInc((prev) => diffDate);
    }
  }, [pauseData, playData, currentProcess, prevFicheLastUpdate]);

  console.log('prevFicheLastUpdate', prevFicheLastUpdate);

  // const tick = () => {
  //   setTickInc((prev) => prev + 1);
  // };

  const handleClickPlay = async (e) => {
    await setProcessToPlay(prevProcessId, fichesUpdate, erroUpDate);
  };

  const handleClickPause = async (e) => {
    clearInterval(timerCount.current);
    await setProcessToPause(prevProcessId, fichesUpdate, erroUpDate).then(
      modifyLastUpdate(prevProcessId, fichesUpdate, erroUpDate)
    );
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
      <Typography>elapsted time: {renderDate(tickInc)}</Typography>
      {currentProcess === 'isPlay' ? <ButtonPause /> : <ButtonPlay />}
    </Box>
  );
};

export default PausePlayButton;
