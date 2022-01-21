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
  const [prevFicheElapstedTime, setPrevFicheElapstedTime] = useState(0);

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
      // setTickInc((prev) => pauseData[0].elapstedTime);
      setPrevFicheLastUpdate((prev) => pauseData[0].lastUpdate);
      setPrevFicheElapstedTime((prev) => pauseData[0].elapstedTime);
    }
    if (playData.length > 0) {
      setCurrentProcess((prev) => playData[0].processing);
      setPrevProcessId((prevId) => playData[0].id);
      // setTickInc((prev) => playData[0].elapstedTime);
      setPrevFicheLastUpdate((prev) => playData[0].lastUpdate);
      setPrevFicheElapstedTime((prev) => playData[0].elapstedTime);
    }

    if (currentProcess === 'isPlay') {
      // timerCount.current = setInterval(() => tick(), 1000);
    }

    if (currentProcess === 'isPause') {
      // clearInterval(timerCount.current);
    }

    if (prevFicheLastUpdate) {
      const dateNow = new Date();

      const utcDateNow = new Date(
        dateNow.getTime() - dateNow.getTimezoneOffset() * 60000
      ).toISOString();

      let diffDate =
        Date.parse(utcDateNow) -
        Date.parse(prevFicheLastUpdate) +
        prevFicheElapstedTime;

      setTickInc((prev) => diffDate);

      // const test = (diffDate) => {
      //   const day = Math.floor((diffDate % 86400) / 36000)
      //     .toString()
      //     .padStart(2, '0');
      //   const hours = Math.floor((diffDate % 86400) / 3600)
      //     .toString()
      //     .padStart(2, '0');
      //   const min = Math.floor((diffDate % 3600) / 60)
      //     .toString()
      //     .padStart(2, '0');
      //   const sec = Math.floor(diffDate % 60)
      //     .toString()
      //     .padStart(2, '0');
      //   return `${day}:${hours}:${min}:${sec}`;
      // };

      // console.log(test(diffDate));
    }
  }, [pauseData, playData, currentProcess, prevFicheLastUpdate]);

  // console.log('prevFicheLastUpdate', prevFicheLastUpdate);

  // const tick = () => {
  //   setTickInc((prev) => prev + 1);
  // };

  const handleClickPlay = async (e) => {
    await setProcessToPlay(prevProcessId, fichesUpdate, erroUpDate);
  };

  const handleClickPause = async (e) => {  

    const elapstedTime =
      Date.parse(utcDateNow) -
      Date.parse(prevFicheLastUpdate) +
      prevFicheElapstedTime;

    console.log('elapstedTime', elapstedTime);
    console.log('prevProcessId', prevProcessId);
    await setProcessToPause(prevProcessId, fichesUpdate, erroUpDate).then(
      modifyLastUpdate(prevProcessId, fichesUpdate, erroUpDate).then(
        updateElastedTime(prevProcessId, elapstedTime, fichesUpdate, erroUpDate)
      )
    );
    // clearInterval(timerCount.current);
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
