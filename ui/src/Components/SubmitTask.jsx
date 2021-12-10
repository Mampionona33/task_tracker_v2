import React, { useState, useEffect } from 'react';
import { formatNbr } from '../Features/formatNbr';

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

// destructuration de props => on utilise {data}
export default function SubmitTask() {
  const [tache, setTache] = useState([]);
  const { error, loading, data } = useQuery(LOAD_DATA);
  useEffect(() => {
    if (data) {
      setTache(data.listFiches);
    }
  }, [data]);

  const submitedFiche = tache.filter((item) => item.submiteState === true);

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
                  <Typography>{type}</Typography>
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
