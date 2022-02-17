import React, { useState, useEffect } from 'react';
import { formatNbr } from '../Features/formatNbr';
import { useAuth0 } from '@auth0/auth0-react';

import {
  Paper,
  Box,
  Card,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Grid,
} from '@mui/material';
import { useQuery, gql } from '@apollo/client';
import { LOAD_DATA } from '../GraphQL/Queries';
import { loadSubmitedTask } from './dataHandler';

// destructuration de props => on utilise {data}
export default function DashboardSubmitTask() {
  const [tache, setTache] = useState([]);

  // fetching data
  const dataSubmited = loadSubmitedTask();

  useEffect(() => {
    if (dataSubmited) {
      setTache(dataSubmited);
    }
  }, [dataSubmited]);

  // get connected user
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  let loggedUser = [];

  user
    ? (loggedUser = tache.filter((fiche) => fiche.user.email === user.email))
    : (loggedUser = []);
  let submitedFiche = [];

  // if user is connected then show the data for the user
  user
    ? (submitedFiche = loggedUser.filter(
        (item) => item.submiteState === 'isSubmited'
      ))
    : (submitedFiche = []);

  const typeTravSub = submitedFiche.map((fiche) => fiche.typeTrav);

  const nbrTypeTrav = (type) =>
    submitedFiche.filter((fiche) => fiche.typeTrav === type).length;

  const arrayRemoveDuplicate = (array) => {
    let newArray = [];
    array.map((item) => {
      if (!newArray.includes(item)) {
        newArray.push(item);
      }
    });
    return newArray;
  };

  const typeTravNoDouble = arrayRemoveDuplicate(typeTravSub);

  const ListTrav = () =>
    typeTravNoDouble.map((type, index) => {
      let nbr = 0;
      nbr = nbrTypeTrav(type);

      return (
        <ListItem sx={{ paddingBottom: 0, paddingTop: 0 }} key={index}>
          <ListItemText
            primary={
              <Grid container spacing={1}>
                <Grid item>
                  <Typography variant='body2'>{type}</Typography>
                </Grid>
                <Grid item>{formatNbr(nbr)}</Grid>
              </Grid>
            }
          />
        </ListItem>
      );
    });

  return (
    <React.Fragment>
      <Grid item>
        <Card sx={{ maxWidth: '30vw' }} elevation={3}>
          <Box
            sx={{
              backgroundColor: 'secondary.main',
              color: 'secondary.contrastText',
              padding: '0.5em',
            }}
          >
            <Typography variant='h6'>
              Total submited booth : {formatNbr(submitedFiche.length)}{' '}
            </Typography>
          </Box>
          <Divider />
          <List>
            <ListTrav />
          </List>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
