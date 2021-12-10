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

export default function processing(params) {
  const [taches, setTaches] = useState([]);
  const { error, loading, data } = useQuery(LOAD_DATA);
  useEffect(() => {
    if (data) {
      setTaches(data.listFiches);
    }
  }, [data]);

  const processing = taches.filter((item) => item.processing === true);
  // console.log(processing);

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
            <Typography variant='h6'>Processing Booth : #####</Typography>
          </Box>
          <Divider />
          <Box>
            <List>
              <ListItem>Work Type</ListItem>
              <ListItem>Time Elapsed</ListItem>
              <ListItem>Time Left</ListItem>
              <ListItem>productivity</ListItem>
              <ListItem>Goal</ListItem>
            </List>
          </Box>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
