import React, { useState, useEffect, useRef } from 'react';
import {
  Grid,
  Card,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  Button,
  IconButton,
} from '@mui/material';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import { useQuery, gql } from '@apollo/client';
import { LOAD_DATA } from '../GraphQL/Queries';
import { formatNbr } from '../Features/formatNbr';

import { withRouter } from 'react-router-dom';

export default function processing(params) {
  const [taches, setTaches] = useState([]);
  const [day, setDay] = useState(0);
  const [hrs, setHrs] = useState(0);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [dayInt, setDayInt] = useState(0);
  const [hrsInt, setHrsInt] = useState(0);
  const [minInt, setMinInt] = useState(0);
  const [secInt, setSecInt] = useState(0);
  const increment = useRef(null);
  const [isClicked, setIsClicked] = useState(false);

  const timer = `${formatNbr(day)}:${formatNbr(hrs)}:${formatNbr(
    min
  )}:${formatNbr(sec)}`;

  // querying data from mongodb
  const { error, loading, data } = useQuery(LOAD_DATA);
  // get actual processing task
  const processing = taches.filter((item) => item.processing === true);
  // get all values in the processing task
  let processingData = {};
  const processingValues = processing.map(
    (value) =>
      (processingData = {
        duree: value.duree,
        typeTrav: value.typeTrav,
        numFiche: value.numFiche,
        productivity: value.productivity,
        url: value.url,
        nbBefor: value.nbBefor,
        nbAft: value.nbAft,
        id: value.id,
      })
  );

  const id = processingData.id;
  const numFiche = processingData.numFiche;
  const typeTrav = processingData.typeTrav;
  const duree = processingData.duree;

  // set tick
  const tick = async () => {
    setSec((sec) => sec + 1);
  };
  // increment clock
  if (sec >= 60) {
    setSec(0);
    setMin((min) => min + 1);
    if (min >= 60) {
      setMin(0);
      setHrs((hrs) => hrs + 1);
      if (hrs >= 24) {
        setHrs(0);
        setDay((day) => day + 1);
      }
    }
  }

  const initTimer = () => {
    if (
      dayInt != undefined &&
      hrsInt != undefined &&
      minInt != undefined &&
      secInt != undefined
    ) {
      setDay(dayInt);
      setHrs(hrsInt);
      setMin(minInt);
      setSec(secInt);
    }
  };

  // arretter l'incrementation par la click sur le button pause
  const handleClickPause = (e) => {
    e.preventDefault();
    clearInterval(increment.current);
  };
  // activer l'incrementation par la click sur le button play
  const handleClickPlay = (e) => {
    e.preventDefault();
    increment.current = setInterval(() => tick(), 1000);
  };

  // useEffect -------------------------------
  useEffect(() => {
    if (data) {
      setTaches(data.listFiches);
    }
    if (duree != undefined) {
      let dayString = duree.slice(0, 2);
      let hrsString = duree.slice(3, 5);
      let minString = duree.slice(6, 8);
      let secString = duree.slice(9, 12);
      setDayInt((prev) => parseInt(dayString));
      setHrsInt((prev) => parseInt(hrsString));
      setMinInt((prev) => parseInt(minString));
      setSecInt((prev) => parseInt(secString));
    }

    initTimer();
    increment.current = setInterval(() => tick(), 1000);
    return () => clearInterval(increment.current);
  }, [data, duree, hrsInt, minInt, secInt]);

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

  const handleClickButton = (e) => {
    e.preventDefault();
    isClicked ? setIsClicked(false) : setIsClicked(true);
  };

  return (
    <React.Fragment>
      <Grid item>
        <Card>
          <Grid
            sx={{
              backgroundColor: '#B03A2E',
              color: 'secondary.contrastText',
              padding: '0.5em',
            }}
          >
            <Typography variant='h6'>Processing Booth : {numFiche}</Typography>
          </Grid>
          <Divider />
          <Grid>
            <List>
              <ListItem>Work Type : {typeTrav}</ListItem>
              <ListItem>Time Elapsed : {/*hrsInt*/} </ListItem>
              <ListItem>Time Left : {timer} </ListItem>
              <ListItem>productivity</ListItem>
              <ListItem>Goal</ListItem>
            </List>
          </Grid>
          <Grid display='flex' justifyContent='flex-end'>
            <IconButton onClick={handleClickButton}>
              {isClicked ? <ButtonPlay /> : <ButtonPause />}
            </IconButton>
          </Grid>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
