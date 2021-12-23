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
import { FILTRED_FICHE } from '../GraphQL/Queries';
import { ADD_FICHE, UPDATE_FICHE } from '../GraphQL/Mutation';
import { formatNbr } from '../Features/formatNbr';

import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from '@apollo/client';

export default function processing(params) {
  const [taches, setTaches] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  // get user authentified
  const { loginWithRedirect, user, isLoading } = useAuth0();
  let currentUser = '';
  user ? (currentUser = user.name) : (currentUser = '');

  // querying data from mongodb with variable user
  const { error, loading, data } = useQuery(FILTRED_FICHE, {
    variables: {
      input: {
        user: currentUser,
      },
    },
  });

  // if data load, then asign data to taches on components mount
  useEffect(() => {
    data ? setTaches(data.searchFiches) : setTaches([]);
  }, [data]);

  // get the current task in process
  const currentBooth = taches.filter((fiche) => fiche.processing === 'isPlay');
  const currentTypeTrav = currentBooth.map((fiche) => fiche.typeTrav);
  const getLastUpdate = currentBooth.map((fiche) => fiche.lastUpdate);
  const lastUpDate = new Date(getLastUpdate.toLocaleString());

  // get the current time
  const currentTime = new Date();

  let diffDate = currentTime.getTime() - lastUpDate.getTime();
  console.log(diffDate);
  let day = Math.floor(diffDate / 86400000);
  let hours = Math.floor((diffDate / 3600000) % 24);
  let min = Math.floor((diffDate / 60000) % 60);
  let sec = Math.floor((diffDate / 1000) % 60);
  let milSec = Math.floor(diffDate % 1000);

  console.debug(`${day}:${hours}:${min}:${sec}`);
  // arretter l'incrementation par la click sur le button pause
  const handleClickPause = (e) => {
    // console.log(currentTime);
    e.preventDefault();
    // clearInterval(increment.current);
  };
  // activer l'incrementation par la click sur le button play
  const handleClickPlay = (e) => {
    e.preventDefault();
    // increment.current = setInterval(() => tick(), 1000);
  };

  // handle event functions
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
            <Typography variant='h6'>
              Processing Booth : {/*numFiche*/}
            </Typography>
          </Grid>
          <Divider />
          <Grid>
            <List>
              <ListItem>
                <Typography>Work Type : {currentTypeTrav}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Time Elapsed :</Typography>
              </ListItem>
              <ListItem>
                <Typography>Time Left :</Typography>
              </ListItem>
              <ListItem>
                <Typography>Productivity</Typography>
              </ListItem>
              <ListItem>
                <Typography>Goal</Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid display='flex' justifyContent='flex-end'>
            <IconButton onClick={handleClickButtonPausePlay}>
              {isClicked ? <ButtonPlay /> : <ButtonPause />}
            </IconButton>
          </Grid>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
