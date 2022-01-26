import React from 'react';
import { Grid, Card, Typography, Divider } from '@mui/material';

import { LOAD_DATA } from '../GraphQL/Queries';
import { UPDATE_FICHE } from '../GraphQL/Mutation';
import { formatNbr } from '../Features/formatNbr';
import CurrentTaskPlay from './CurrentTaskPlay';

import Timer from './Timer.jsx';

export default function processing(params) {
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
          <Timer />
        </Card>
      </Grid>
    </React.Fragment>
  );
}
