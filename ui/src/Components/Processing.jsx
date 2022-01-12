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
  Tooltip,
} from '@mui/material';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import { useQuery, gql, setLogVerbosity } from '@apollo/client';
import { LOAD_DATA } from '../GraphQL/Queries';
import { UPDATE_FICHE } from '../GraphQL/Mutation';
import { formatNbr } from '../Features/formatNbr';

import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from '@apollo/client';
import CurrentTaskPlay from './CurrentTaskPlay';

export default function processing(params) {
  const [taches, setTaches] = useState([]);
  const [isClicked, setIsClicked] = useState(null);
  const [processDuration, setPocessDuration] = useState(0);

  // const [onPlayButtonId, setOnPlayButtonId] = useState(0);
  const [tickInc, setTickInc] = useState(0);
  const increment = useRef(null);
  const [initialTic, setInitialTic] = useState(0);

  // get user authentified
  const { loginWithRedirect, user, isLoading } = useAuth0();
  let currentUser = '';
  user ? (currentUser = user.email) : (currentUser = '');

  // querying data from mongodb
  const { error, loading, data } = useQuery(LOAD_DATA);

  // get tasks for the current user loged
  const userLogedTask = taches.filter(
    (fiche) => fiche.user.email === currentUser
  );

  // if data load, then asign data to taches on components mount
  useEffect(() => {
    data ? setTaches(data.listFiches) : setTaches([]);
  }, [data]);

  // get the processing task status
  const processingValue = {};
  const processingState = userLogedTask.map((fiche) => {
    processingValue.state = fiche.processing;
  });

  // get the current processing state true or fals to handle refresh button persistant
  useEffect(() => {
    if (processingValue.state === 'isPlay') {
      setIsClicked(false);
    }
    if (processingValue.state === 'isPause') {
      setIsClicked(true);
    }
    // console.debug(processingValue.state);
  }, [processingState]);

  // get the current task in processing play
  const currentPlay = taches.filter(
    (fiche) => fiche.processing === 'isPlay' || fiche.processing === 'isPause'
  );
  const currentTypeTrav = currentPlay.map((fiche) => fiche.typeTrav);
  const getLastUpdate = currentPlay.map((fiche) => fiche.lastUpdate);
  const lastUpDate = new Date(getLastUpdate.toLocaleString());
  let arrayId = {};
  const objectTaskId = currentPlay.map((fiche) => {
    arrayId.id = fiche.id;
  });
  const taskId = arrayId.id;
  // console.debug('array id:', arrayId.id);

  // get last Duration
  const preDuration = {};
  const prevLastUpDate = currentPlay.filter((fiche) => {
    preDuration.value = fiche.duree;
  });

  // get the current time
  const currentTime = new Date();
  // get difference between the last update and now, type int
  let diffDate = currentTime.getTime() - lastUpDate.getTime();

  const processingHours = Math.floor((diffDate / 3600000) % 24);

  let day = Math.floor(diffDate / 86400000);
  let hours = Math.floor((diffDate / 3600000) % 24);
  let min = Math.floor((diffDate / 60000) % 60);
  let sec = Math.floor((diffDate / 1000) % 60);
  let milSec = Math.floor(diffDate % 1000);

  let initialDuration = ``;

  if (day && hours && min && sec) {
    initialDuration = `${day}:${hours}:${min}:${sec}`;
  }

  // execute mutation fichesUpdate with useMutation
  const [fichesUpdate, { error: erroUpDate }] = useMutation(UPDATE_FICHE, {
    refetchQueries: [LOAD_DATA],
  });

  // function to execute when clicking on pause button
  const setProcessingPause = async () => {
    fichesUpdate({
      variables: {
        filter: {
          id: taskId,
        },
        update: {
          processing: 'isPause',
        },
      },
    });
    if (erroUpDate) {
      console.log(erroUpDate);
    }
  };

  // get the current task in processing pause
  const currentPause = taches.filter((fiche) => fiche.processing === 'isPause');
  const arrayIdPause = {};
  const getIdPaused = currentPause.map((fiche) => {
    arrayIdPause.id = fiche.id;
  });
  const onPlayButtonId = arrayIdPause.id;

  // function to execute when clicking on Play button
  const setProcessingPlay = async () => {
    fichesUpdate({
      variables: {
        filter: {
          id: onPlayButtonId,
        },
        update: {
          processing: 'isPlay',
        },
      },
    });
    if (erroUpDate) {
      console.log(erroUpDate);
    }
  };

  const tick = async () => {
    setTickInc((prev) => prev + 1);
  };

  // on click Pause Button
  const handleClickPause = async (e) => {
    e.preventDefault();
    setProcessingPause();
    // stop counter
    clearInterval(increment.current);
  };
  // activer l'incrementation par la click sur le button play
  const handleClickPlay = async (e) => {
    e.preventDefault();
    setProcessingPlay();
    // increment counter
    increment.current = setInterval(() => tick(), 1000);
  };

  // handle event functions ...ButtonPlay/ButtonPause/handleClickButtonPausePlay
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

  const handleClickButtonPausePlay = (e) => {
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
            <Typography textAlign='center' variant='h6'>
              Current Task
            </Typography>
          </Grid>
          <Divider />
          <CurrentTaskPlay />
          <Grid display='flex' justifyContent='flex-end'>
            <IconButton onClick={handleClickButtonPausePlay}>
              {/* swhitch between buttons */}
              {isClicked ? <ButtonPlay taskId={taskId} /> : <ButtonPause />}
            </IconButton>
          </Grid>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
