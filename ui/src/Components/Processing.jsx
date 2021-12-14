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
  const [day, setDay] = useState(dayInt != undefined ? dayInt : 0 );
  const [hrs, setHrs] = useState(hrsInt != undefined ? hrsInt : 0);
  const [sec, setSec] = useState(secInt != undefined ? secInt : 0);
  const [min, setMin] = useState(minInt != undefined ? minInt : 0);
  const [dayInt, setDayInt] = useState(0);
  const [hrsInt, setHrsInt] = useState(0);
  const [minInt, setMinInt] = useState(0);
  const [secInt, setSecint] = useState(0);

  const timer = `${formatNbr(day)}:${formatNbr(hrs)}:${formatNbr(
    min
  )}:${formatNbr(sec)}`;

  // querying data from mongodb
  const { error, loading, data } = useQuery(LOAD_DATA);
  // get actual processing task
  const processing = taches.filter((item) => item.processing === true);
  // get all values in the processing task
  let processingData = {};
  const processingValues = processing.map(
    (value) =>
      (processingData = {
        duree: value.duree,
        typeTrav: value.typeTrav,
        numFiche: value.numFiche,
        productivity: value.productivity,
        url: value.url,
        nbBefor: value.nbBefor,
        nbAft: value.nbAft,
        id: value.id,
      })
  );

  const numFiche = processingData.numFiche;
  const typeTrav = processingData.typeTrav;
  const duree = processingData.duree;

  // variable to store current duration as string  
	
  // set tick
  const tick = async () => {
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
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (data) {
      setTaches(data.listFiches);
    }
	
	if(duree != undefined){
		let dayString = duree.slice(0,2);
		let  hrsString = duree.slice(3 , 5);
		let minString = duree.slice(6,8);
		let secString = duree.slice(9,12);
		setDayInt(prev => parseInt(dayString));
		setHrsInt(prev => parseInt(hrsString));
		setMinInt(prev => parseInt(minString));
		
	}
    // const intervalId = setInterval(() => setCount((prev) => prev + 1), 1000);
    // return () => clearInterval(intervalId);
	
    // const intervalId = setInterval(() => tick(), 1000);
    // return () => clearInterval(intervalId);
  }, [data,duree]);

		// console.log(`${dayInt}:${hrsInt}:${minInt}:${secInt}`);
 
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
              <ListItem>Time Elapsed : {/*hrsInt*/} </ListItem>
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
