import React from 'react';
import { Paper, Box, Card, Typography, Divider } from '@mui/material';

export default function SubmitTask(props) {
  const total = props.totalSubmit;

  return (
    <React.Fragment>
      <Card sx={{ minWidth: 100, maxWidth: '10%', height: '10vh' }}>
        <Typography variant='h6'>Submited</Typography>
        <Divider />
      </Card>
    </React.Fragment>
  );
}
