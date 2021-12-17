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
import { LOAD_DATA, SEARCH_FICHE_BY_ID } from '../GraphQL/Queries';
import { formatNbr } from '../Features/formatNbr';

import { withRouter } from 'react-router-dom';

export default function CopyProcessing({ listFiches, idCounter }) {
  console.log(listFiches);

  const [SearchFiches, { error, loading, data }] = useQuery(SEARCH_FICHE_BY_ID);

  const fechtFiche = () => {
    searchFiches({
      variables: {
        searchFiches: {
          input: 1,
        },
      },
    });
  };

  useEffect(() => {
    fechtFiche();
  });

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
            <Typography variant='h6'>Copy Processing Booth : </Typography>
          </Grid>
          <Divider />
          <Grid>
            <List>
              <ListItem>Work Type :</ListItem>
              <ListItem>Time Elapsed : </ListItem>
              <ListItem>Time Left : </ListItem>
              <ListItem>productivity</ListItem>
              <ListItem>Goal</ListItem>
            </List>
          </Grid>
          <Grid display='flex' justifyContent='flex-end'></Grid>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
