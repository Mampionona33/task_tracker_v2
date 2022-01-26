import React from 'react';
import { Typography, Box } from '@mui/material';

const TimerDisplay = ({ value }) => {
  let day = Math.floor((value % 86400) / 36000)
    .toString()
    .padStart(2, '0');
  let hours = Math.floor((value % 86400) / 3600)
    .toString()
    .padStart(2, '0');
  let min = Math.floor((value % 3600) / 60)
    .toString()
    .padStart(2, '0');
  let sec = Math.floor(value % 60)
    .toString()
    .padStart(2, '0');

  return (
    <Box>
      <Typography sx={{ fontFamily: 'fantasy' }}>
        {day} : {hours} : {min} : {sec}
      </Typography>
    </Box>
  );
};

export default TimerDisplay;
