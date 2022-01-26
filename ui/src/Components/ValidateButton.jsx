import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IconButton, Typography, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';

const ValidateButton = () => {
  return (
    <IconButton color='primary' component='span' label='Pause button'>
      <CheckCircleIcon sx={{ fontSize: '30px' }} />
    </IconButton>
  );
};

export default ValidateButton;
