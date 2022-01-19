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
import {
  loadProcessingPause,
  loadAllData,
  loadProcessingPlay,
  loadUnsubmitedTask,
} from './dataHandler';

import PausePlayButton from './PausePlayButton.jsx';

export default function processing(params) {
  // get the current time
  // const currentTime = new Date();
  // get difference between the last update and now, type int
  // let diffDate = currentTime.getTime() - lastUpDate.getTime();

  // const processingHours = Math.floor((diffDate / 3600000) % 24);

  // let day = Math.floor(diffDate / 86400000);
  // let hours = Math.floor((diffDate / 3600000) % 24);
  // let min = Math.floor((diffDate / 60000) % 60);
  // let sec = Math.floor((diffDate / 1000) % 60);
  // let milSec = Math.floor(diffDate % 1000);

  // let initialDuration = ``;

  // if (day && hours && min && sec) {
  //   initialDuration = `${day}:${hours}:${min}:${sec}`;
  // }

  // const tick = async () => {
  //   setTickInc((prev) => prev + 1);
  // };

  // on click Pause Button
  // const handleClickPause = async (e) => {
  //   e.preventDefault();
  //   setProcessingPause();
  //   // stop counter
  //   clearInterval(increment.current);
  // };
  // activer l'incrementation par la click sur le button play
  // const handleClickPlay = async (e) => {
  //   e.preventDefault();
  //   setProcessingPlay();
  //   // increment counter
  //   increment.current = setInterval(() => tick(), 1000);
  // };

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
            <PausePlayButton />
          </Grid>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
