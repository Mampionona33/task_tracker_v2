import React from 'react';
import { Typography, Box, Card } from '@mui/material';
import { makeStyles } from '@mui/styles';

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

  //   create classe for Box and Typography
  const useStyles = makeStyles((theme) => ({
    timerCard: {
      backgroundColor: '#008B8B',
      padding: '0.2em',
      color: 'white',
      width: '1.5rem',
    },
    timerTypography: {
      margin: '0 0.2rem',
      letterSpacing: '2.5px',
      fontFamily: 'fantasy',
    },
    timerSeparator: {
      fontFamily: 'fantasy',
      margin: '0 0.2rem',
      color: '#008B8B',
      fontSize: '1.5rem',
    },
  }));

  //   import the created classe here
  const classes = useStyles();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Card className={classes.timerCard}>
        <Typography className={classes.timerTypography}> {day} </Typography>
      </Card>
      <Typography className={classes.timerSeparator}>:</Typography>
      <Card className={classes.timerCard}>
        <Typography className={classes.timerTypography}> {hours} </Typography>
      </Card>
      <Typography className={classes.timerSeparator}>:</Typography>
      <Card className={classes.timerCard}>
        <Typography className={classes.timerTypography}> {min} </Typography>
      </Card>
      <Typography className={classes.timerSeparator}>:</Typography>
      <Card className={classes.timerCard}>
        <Typography className={classes.timerTypography}> {sec} </Typography>
      </Card>
    </Box>
  );
};

export default TimerDisplay;
