import React from 'react';
import {
  Grid,
  Card,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
} from '@mui/material';

import { getTime } from '../Features/time';

export default function processing(params) {
  //   console.log(getTime);
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
