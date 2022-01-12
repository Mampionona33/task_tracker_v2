import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { FILTRED_FICHE } from '../GraphQL/Queries';
import { useQuery, gql } from '@apollo/client';
import { makeStyles } from '@mui/styles';

export default function CurrentTaskPlay(props) {
  const [currentFiche, setCurrentFiche] = useState([]);

  // fetch the current booth played
  const {
    data: playedData,
    error: playedError,
    loading: playedLoading,
  } = useQuery(FILTRED_FICHE, {
    variables: {
      input: {
        processing: 'isPlay',
      },
    },
  });

  // fetch the current booth paused
  const {
    data: pauseData,
    error: pauseError,
    loading: pauseLoading,
  } = useQuery(FILTRED_FICHE, {
    variables: {
      input: {
        processing: 'isPause',
      },
    },
  });

  useEffect(() => {
    if (playedData) {
      setCurrentFiche(playedData.searchFiches);
    }
    if (pauseData) {
      setCurrentFiche(pauseData.searchFiches);
    }
  });

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
