import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
} from '@mui/material';

import { useQuery, gql } from '@apollo/client';
import { LOAD_DATA } from '../GraphQL/Queries';
import { formatNbr } from '../Features/formatNbr';

export default function processing(params) {
  const [taches, setTaches] = useState([]);
  const { error, loading, data } = useQuery(LOAD_DATA);

  const processing = taches.filter((item) => item.processing === true);
  const numFiche = processing.map((item) => item.numFiche);
  const typeTrav = processing.map((item) => item.typeTrav);
  const duration = processing.map((item) => item.duree);

  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hrs, setHrs] = useState(0);
  const [day, setDay] = useState(0);
  const timer = `${formatNbr(day)}:${formatNbr(hrs)}:${formatNbr(
    min
  )}:${formatNbr(sec)}`;

  let hrsData = {};
  let hrsDataInt = 0;

  // set tick
  const tick = () => {
    setSec((sec) => sec + 1);
  };
  // increment clock
  if (sec >= 60) {
    setSec(0);
    setMin((min) => min + 1);
    if (min >= 60) {
      setMin(0);
      setHrs((hrs) => hrs + 1);
      if (hrs >= 24) {
        setHrs(0);
        setDay((day) => day + 1);
      }
    }
  }

  // fetch last worked time
  const timeData = duration[0];

  if (timeData) {
    hrsData = timeData.slice(0, 2);
    hrsDataInt = parseInt(hrsData);
  }

  useEffect(() => {
    if (data) {
      setTaches(data.listFiches);
    }

    if (hrsDataInt !== 0) {
      setHrs(hrsDataInt);
    }

    const intervalId = setInterval(() => tick(), 1000);

    return () => clearInterval(intervalId);
  }, [data]);

  return (
    <React.Fragment>
      <Grid item>
        <Card>
          <Box
            sx={{
              backgroundColor: '#B03A2E',
              color: 'secondary.contrastText',
              padding: '0.5em',
            }}
          >
            <Typography variant='h6'>Processing Booth : {numFiche}</Typography>
          </Box>
          <Divider />
          <Box>
            <List>
              <ListItem>Work Type : {typeTrav}</ListItem>
              <ListItem>Time Elapsed : {duration} </ListItem>
              <ListItem>Time Left : {timer} </ListItem>
              <ListItem>productivity</ListItem>
              <ListItem>Goal</ListItem>
            </List>
          </Box>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
