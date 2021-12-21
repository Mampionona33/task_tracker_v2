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
import { ADD_FICHE, UPDATE_FICHE } from '../GraphQL/Mutation';
import { formatNbr } from '../Features/formatNbr';

import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from '@apollo/client';

export default function processing(params) {
  const [taches, setTaches] = useState([]);
  const increment = useRef(null);
  const [isClicked, setIsClicked] = useState(false);

  // querying data from mongodb
  const { error, loading, data } = useQuery(LOAD_DATA);
  // if data load, then asign data to taches on components mount
  useEffect(() => {
    data ? setTaches(data.listFiches) : setTaches([]);
  }, [data]);

  // get user authentified
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  let logedUserData = [];
  // if there is user, check the user in the database
  if (user) {
    logedUserData = taches.filter((fiche) => fiche.user === user.name);
  }

  user ? console.log(logedUserData) : console.log('nop');
  isLoading ? console.log('is Loading') : console.log('nop 1');


  
  // get the current time
  const currentTime = new Date();
  console.log(currentTime);

  // Mutation to execute whene button pause clicked
  const [fichesUpdate, { error: erroUpDate }] = useMutation(UPDATE_FICHE, {
    refetchQueries: [LOAD_DATA],
  });

  // arretter l'incrementation par la click sur le button pause
  const handleClickPause = (e) => {
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
              <ListItem>Work Type : {/*typeTrav*/}</ListItem>
              <ListItem>Time Elapsed : {/*hrsInt*/} </ListItem>
              <ListItem>Time Left : {/*timer*/} </ListItem>
              <ListItem>productivity</ListItem>
              <ListItem>Goal</ListItem>
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
