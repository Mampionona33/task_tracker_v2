import React, { useState } from 'react';
import {
  Grid,
  Card,
  Typography,
  Divider,
  Switch,
  FormControlLabel,
  FormGroup,
  Box,
  Paper,
} from '@mui/material';

import CurrentTaskPlay from './CurrentTaskPlay';
import CurrentTaskTimer from './CurrentTaskTimer.jsx';
import CurrentTaskProductivity from './CurrentTaskProductivity.jsx';
import CurrentTaskSimulator from './CurrentTaskSimulator';

export default function DashboardCurrentTask(params) {
  const [simulateHide, setsimulateHide] = useState(false);

  // listen to the switch state
  const handleSwitchChange = (e) => {
    setsimulateHide((prev) => e.target.checked);
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
          <CurrentTaskProductivity />
          <CurrentTaskTimer />
          <Divider />
          <Box sx={{ margin: '0.5rem' }}>
            <Paper
              elevation={6}
              sx={{
                backgroundColor: 'secondary.light',
                maxWidth: '50%',
                borderRadius: 25,
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={<Switch onChange={handleSwitchChange} />}
                  label='Simulate Prod'
                  sx={{
                    color: 'secondary.contrastText',
                    margin: '0 0.2rem',
                  }}
                />
              </FormGroup>
            </Paper>
          </Box>
        </Card>
        {simulateHide === false ? '' : <CurrentTaskSimulator />}
      </Grid>
    </React.Fragment>
  );
}
