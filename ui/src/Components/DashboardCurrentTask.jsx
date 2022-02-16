import React from 'react';
import { Grid, Card, Typography, Divider } from '@mui/material';

import { LOAD_DATA } from '../GraphQL/Queries';
import { UPDATE_FICHE } from '../GraphQL/Mutation';
import { formatNbr } from '../Features/formatNbr';
import CurrentTaskPlay from './CurrentTaskPlay';
import CurrentTaskTimer from './CurrentTaskTimer.jsx';
import CurrentTaskProductivity from './CurrentTaskProductivity.jsx';

export default function DashboardCurrentTask(params) {
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
          <CurrentTaskProductivity/>
          <CurrentTaskTimer />
        </Card>
      </Grid>
    </React.Fragment>
  );
}