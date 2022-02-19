import React, { useState, useEffect } from 'react';
import { Card, Box, Typography, TextField, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const CurrentTaskSimulator = (props) => {
  //   create classe for Box and Typography
  const useStyles = makeStyles({
    input1: {
      height: 10,
      color: 'red',
    },
  });

  const TextFieldStyle = {
    padding: 7,
    fontSize: '1rem',
    width: 175,
  };

  const TimerTextFieldeStyle = {
    padding: 7,
    fontSize: '1rem',
    width: 40,
    height: 15,
  };

  //   import the created classe here
  const classes = useStyles();

  const [hrs, setHrs] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  // fonction to execute when value of Hrs change
  const handleTimerInputChange = (ev) => {
    // If id = hrs, then test the value of input
    if (ev.target.id == 'hrs') {
      // if input more than 23 or lesse than 0 -> clear input
      ev.target.value > 23 || ev.target.value < 0
        ? setHrs((prev) => ' ')
        : setHrs((prev) => ev.target.value);
    }

    // If id = min, then test the value of input
    if (ev.target.id == 'min') {
      // if input more than 59  or less than 0 -> clear input
      ev.target.value > 59 || ev.target.value < 0
        ? setMin((prev) => ' ')
        : setMin((prev) => ev.target.value);
    }

    // If id = sec, then test the value of input
    if (ev.target.id == 'sec') {
      // if input more than 59  or less than 0 -> clear input
      ev.target.value > 59 || ev.target.value < 0
        ? setSec((prev) => ' ')
        : setSec((prev) => ev.target.value);
    }
  };

  return (
    <Card elevation={3} sx={{ marginTop: '1rem' }}>
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='space-evenly'
        alignItems='center'
      >
        <Box display='flex' margin='1rem' gap={2} flexDirection='column'>
          <Box>
            <TextField
              size='small'
              type='number'
              label='Nombre Prod Aft'
              inputProps={{ style: TextFieldStyle, min: '1' }}
              InputLabelProps={{ shrink: true }}
              placeholder='Nombre Product After'
            />
          </Box>
          <Box display='flex' gap={1}>
            <TextField
              label='hrs'
              type='number'
              id='hrs'
              value={hrs}
              onChange={handleTimerInputChange}
              inputProps={{ style: TimerTextFieldeStyle, min: '0', max: '23' }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label='Min'
              type='number'
              id='min'
              value={min}
              onChange={handleTimerInputChange}
              inputProps={{ style: TimerTextFieldeStyle, min: '0', max: '59' }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label='Sec'
              id='sec'
              type='number'
              value={sec}
              onChange={handleTimerInputChange}
              inputProps={{ style: TimerTextFieldeStyle, min: '0', max: '59' }}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Box>
        <Box>
          <Paper
            sx={{
              margin: '1rem',
              padding: '0.5rem',
              backgroundColor: 'primary.light',
            }}
          >
            <Typography>100%</Typography>
          </Paper>
        </Box>
      </Box>
    </Card>
  );
};

export default CurrentTaskSimulator;
