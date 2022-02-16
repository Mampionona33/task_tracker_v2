import React from 'react';
import { Grid, Card, Typography, Divider } from '@mui/material';

import CurrentTaskPlay from './CurrentTaskPlay';
import CurrentTaskTimer from './CurrentTaskTimer.jsx';
import CurrentTaskProductivity from './CurrentTaskProductivity.jsx';
import CurrentTaskSimulator from './CurrentTaskSimulator';

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
          <CurrentTaskProductivity />
          <CurrentTaskTimer />
        </Card>
          <CurrentTaskSimulator />
      </Grid>
    </React.Fragment>
  );
}
