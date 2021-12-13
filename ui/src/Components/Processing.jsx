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
import Clock from './Clock';

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

  // set second tick
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

  useEffect(() => {
    // test if there is a data them take listFiches from data and asign it to Taches
    if (data) {
      setTaches(data.listFiches);
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
              <ListItem>
                Time Left :
                <Clock />
              </ListItem>
              <ListItem>productivity</ListItem>
              <ListItem>Goal</ListItem>
            </List>
          </Box>
        </Card>
      </Grid>
    </React.Fragment>
  );
}