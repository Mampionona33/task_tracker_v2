import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { loadProcessingPause, loadProcessingPlay } from './dataHandler';
import { useAuth0 } from '@auth0/auth0-react';

export default function CurrentTaskPlay(props) {
  const [currentFiche, setCurrentFiche] = useState([]);

  // get connected user
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  let dataPause;
  let dataPlay;

  if (user) {
    // fetching data
    dataPause = loadProcessingPause();
    dataPlay = loadProcessingPlay();
  }

  // fetching data on component mount
  useEffect(() => {
    if (dataPlay.length > 0) {
      setCurrentFiche(dataPlay);
    }
    if (dataPause.length > 0) {
      setCurrentFiche(dataPause);
    }
  }, [dataPlay, dataPause]);

  //   create classe for Box and Typography
  const useStyles = makeStyles({
    processingBox: {
      display: 'flex',
      justifyContent: 'space-between',
      columnGap: '1rem',
    },
    processingTypography: {
      fontWeight: '700',
    },
  });

  //   import the created classe here
  const classes = useStyles();

  // use this use object.map() inside of React.Children.toArray to avoid warning key unique
  const output = React.Children.toArray(
    currentFiche.map((item, index) => {
      return (
        <React.Fragment>
          <Box className={classes.processingBox}>
            <Typography className={classes.processingTypography}>
              Task Type:
            </Typography>
            <Typography>{item.typeTrav}</Typography>
          </Box>
          <Typography></Typography>
          <Divider />

          <Box className={classes.processingBox}>
            <Typography className={classes.processingTypography}>
              Num Fiche:
            </Typography>
            <Typography>{item.numFiche}</Typography>
          </Box>
          <Divider />

          <Box className={classes.processingBox}>
            <Typography className={classes.processingTypography}>
              Status Com:
            </Typography>
            <Typography>{item.statuCom}</Typography>
          </Box>
          <Divider />

          <Box className={classes.processingBox}>
            <Typography className={classes.processingTypography}>
              NB Prod Before:
            </Typography>
            <Typography>{item.nbBefor}</Typography>
          </Box>
          <Divider />

          <Box className={classes.processingBox}>
            <Typography className={classes.processingTypography}>
              NB Prod After:
            </Typography>
            <Typography>{item.nbAft}</Typography>
          </Box>
          <Divider />
        </React.Fragment>
      );
    })
  );

  return (
    <Box display='flex' flexDirection='column' margin='1em'>
      {output}
    </Box>
  );
}
