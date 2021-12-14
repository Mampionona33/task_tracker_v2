import React, { useEffect, useState } from 'react';
import { formatNbr } from '../Features/formatNbr';
import {
  Badge,
  Box,
  Card,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Grid,
  Paper,
  keyframes,
} from '@mui/material';
import { useQuery, gql } from '@apollo/client';
import { LOAD_DATA } from '../GraphQL/Queries';

// keyframe for animating text if type = 'Empty Type'
const blink = keyframes`
from{color: red;}
to{color : white;}
`;

function InProgress() {
  const [tache, setTache] = useState([]);

  const { error, loading, data } = useQuery(LOAD_DATA);
  useEffect(() => {
    if (data) {
      setTache(data.listFiches);
    }
  }, [data]);

  const inProgress = tache.filter((fiche) => fiche.submiteState === false);

  const typeTravInprogress = inProgress.map((fiche) => fiche.typeTrav);

  const arrayRemoveDuplicate = (array) => {
    let newArray = [];
    array.map((item) => {
      if (!newArray.includes(item)) {
        newArray.push(item);
      }
    });
    return newArray;
  };
  const typeTravNoDouble = arrayRemoveDuplicate(typeTravInprogress);

  const nbrTypeTrav = (type) =>
    inProgress.filter((fiche) => fiche.typeTrav === type).length;

  const Stdby = inProgress.filter((fiche) => fiche.state === 'Sby');

  // badget show on fiche state = Sby
  const badgeSby = () => {
    let text = `Stdby`;
    let nbr = 0;
    if (Stdby) {
      nbr = Stdby.length;
    }
    return (
      <Badge badgeContent={nbr} color='warning'>
        <Paper
          sx={{
            backgroundColor: '#F81A17',
            color: 'secondary.contrastText',
            borderRadius: 25,
            paddingLeft: '0.2rem',
            paddingRight: '0.2rem',
            fontSize: 12,
          }}
        >
          {text}
        </Paper>
      </Badge>
    );
  };

  const onStdby = (text) => {
    const nbrStdby = Stdby.filter((item) => item.typeTrav === text);
    if (nbrStdby.length > 0) {
      return (
        <React.Fragment>
          <Badge badgeContent={nbrStdby.length} color='warning'>
            <Paper
              sx={{
                backgroundColor: '#F81A17',
                borderRadius: 25,
                padding: '0.02rem 0.3rem',
                color: 'secondary.contrastText',
              }}
            >
              <Typography sx={{ fontSize: 11 }}>Stby</Typography>
            </Paper>
          </Badge>
        </React.Fragment>
      );
    }
  };

  const ListTrav = () =>
    typeTravNoDouble.map((type, index) => {
      let nbr = 0;
      nbr = nbrTypeTrav(type);

      return (
        <ListItem key={index} sx={{ paddingTop: 0, paddingBottom: 0 }}>
          <ListItemText
            primary={
              <Grid
                container
                alignItems='center'
                spacing={1}
                justifyContent='space-between'
                // set the color of text to red if type fiche is 'Empty Type'
                // style={{ color: type === 'Empty Type' ? 'red' : 'black' }}
                sx={{
                  animation:
                    type === 'Empty Type'
                      ? `${blink} 1s infinite cubic-bezier(1,0.3,1,2)`
                      : '',
                }}
              >
                <Grid item>
                  <Typography>{type}</Typography>
                </Grid>
                <Grid item>{onStdby(type)}</Grid>
                <Grid item>{formatNbr(nbr)}</Grid>
              </Grid>
            }
          />
        </ListItem>
      );
    });

  return (
    <React.Fragment>
      <Grid item>
        <Card elevation={3}>
          <Box
            sx={{
              backgroundColor: '#228B22',
              color: 'secondary.contrastText',
              padding: '0.5em',
            }}
          >
            <Grid container justifyContent='space-between' alignItems='center'>
              <Grid>
                <Typography variant='h6'>
                  Tasks in Progress :{formatNbr(inProgress.length)}
                </Typography>
              </Grid>
              <Grid padding='0px 5px 0 20px'>{badgeSby()}</Grid>
            </Grid>
          </Box>
          <Divider />
          <List>{<ListTrav />}</List>
        </Card>
      </Grid>
    </React.Fragment>
  );
}

export default InProgress;
