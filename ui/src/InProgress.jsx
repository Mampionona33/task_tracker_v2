import React from 'react';
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
} from '@mui/material';

// au lieu d'utiliser props on fait la destructuration , donc on recupere uniquement data par {data}
export default function InProgress({ data }) {
  const inProgress = data.filter((fiche) => fiche.submiteState === false);

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

  const contenu = inProgress.filter((fiche) => fiche.typeTrav === 'Contenu');
  const autoValidCreaPrio = inProgress.filter(
    (fiche) => fiche.typeTrav === 'AUTOVALIDCREAPrio'
  );

  const formatNbr = (input) => {
    if (input < 10) {
      return `0${input}`;
    }
  };

  const stbyAutoValidCreaPrio = autoValidCreaPrio.filter(
    (fiche) => fiche.state === 'Sby'
  );

  console.log(typeTravNoDouble);

  const ListTrav = () =>
    typeTravNoDouble.map((type, index) => {
      let nbr = 0;
      let badge = ``;
      if (type === 'Contenu') {
        nbr = contenu.length;
      }
      if (type === 'AUTOVALIDCREAPrio') {
        nbr = autoValidCreaPrio.length;
        badge = `stby${stbyAutoValidCreaPrio.length}`;
      }

      return (
        <ListItem key={index}>
          <ListItemText
            primary={
              <Typography>
                  {type}:{formatNbr(nbr)}
              </Typography>
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
            <Typography variant='h6'>
              Tasks in Progress : {formatNbr(inProgress.length)}
            </Typography>
          </Box>
          <Divider />
          <List>
            <ListTrav />
          </List>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
