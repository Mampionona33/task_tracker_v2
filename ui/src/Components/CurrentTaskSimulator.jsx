import React, { useState, useEffect } from 'react';
import { Card, Box, Typography, TextField, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  fetchTaskType,
  loadProcessingPlay,
  loadProcessingPause,
} from './dataHandler';

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

  const [hrs, setHrs] = useState(-1);
  const [min, setMin] = useState(-1);
  const [sec, setSec] = useState(-1);
  const [numberAfter, setNumberAfter] = useState('');
  const [prod, setProd] = useState(0);
  const [taskGoal, setTaskGoal] = useState(1);
  const [elapstedTime, setElapstedTime] = useState(0);
  const [lastUpdate, setLastUpdate] = useState([]);

  // fonction to execute when value of Hrs change
  const handleTimerInputChange = (ev) => {
    // If id = hrs, then test the value of input
    if (ev.target.id == 'hrs') {
      // if input more than 23 or lesse than 0 -> clear input
      ev.target.value > 23 || ev.target.value < 0
        ? setHrs((prev) => ' ')
        : setHrs((prev) => ev.target.value);
      setMin((prev) => -1);
      setSec((prev) => -1);
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
    if (ev.target.id == 'numbAft') {
      setNumberAfter((prev) => ev.target.value);
      setHrs((prev) => -1);
      setMin((prev) => -1);
      setSec((prev) => -1);
    }
    calculProd();
  };

  // get all taskType from data
  const taskTypes = fetchTaskType();
  // get current task
  const taskPause = loadProcessingPause();
  const taskPlay = loadProcessingPlay();
  let currentTask = [];

  if (taskPlay.length > 0) {
    currentTask = taskPlay;
  }
  if (taskPause.length > 0) {
    currentTask = taskPause;
  }

  // calucl prod
  const calculProd = () => {
    // create new date and set it's hours min and sec to the input value
    const prodDate = new Date();
    prodDate.setHours(hrs);
    prodDate.setMinutes(min);
    prodDate.setSeconds(sec);

    const currentElapstedTime =
      elapstedTime + (Date.parse(prodDate) - Date.parse(lastUpdate)) / 1000;

    const typeTaskRendement = taskGoal / 3600;
    const currentRendement = numberAfter / currentElapstedTime;
    const currentProd = Math.round(
      (currentRendement / typeTaskRendement) * 100
    );

    setProd((prev) => currentProd);
  };

  useEffect(() => {
    if (currentTask.length > 0 && taskTypes) {
      const tasktype = taskTypes.filter(
        (item) => item.name === currentTask[0].typeTrav
      );
      setTaskGoal((prev) => tasktype[0].objectif);
      setElapstedTime((prev) => currentTask[0].elapstedTime);
      setLastUpdate((prev) => currentTask[0].lastUpdate);
    }
  }, [currentTask, taskTypes]);

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
              id='numbAft'
              value={numberAfter}
              onChange={handleTimerInputChange}
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
              value={hrs >= 0 ? hrs : ''}
              onChange={handleTimerInputChange}
              inputProps={{ style: TimerTextFieldeStyle, min: '0', max: '23' }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label='Min'
              type='number'
              id='min'
              value={min >= 0 ? min : ''}
              onChange={handleTimerInputChange}
              inputProps={{ style: TimerTextFieldeStyle, min: '0', max: '59' }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label='Sec'
              id='sec'
              type='number'
              value={sec >= 0 ? sec : ''}
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
            <Typography>{prod}%</Typography>
          </Paper>
        </Box>
      </Box>
    </Card>
  );
};

export default CurrentTaskSimulator;
