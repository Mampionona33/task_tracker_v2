import React from 'react';
import {
  Card,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Input,
  OutlinedInput,
} from '@mui/material';
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

  return (
    <Card elevation={3} sx={{ marginTop: '1rem' }}>
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
            label='Hrs'
            type='number'
            inputProps={{ style: TimerTextFieldeStyle, min: '0', max: '23' }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label='Min'
            type='number'
            inputProps={{ style: TimerTextFieldeStyle, min: '0', max: '59' }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label='Sec'
            type='number'
            inputProps={{ style: TimerTextFieldeStyle, min: '0', max: '59' }}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default CurrentTaskSimulator;
