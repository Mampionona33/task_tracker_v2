import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Tooltip, IconButton, Typography, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';

const ValidateButton = () => {
  const handleClick = (e) => {
    e.preventDefault;
    alert('validate button clicked');
  };

  return (
    <Tooltip title='Submit Task' arrow>
      <IconButton
        color='primary'
        component='span'
        label='Pause button'
        onClick={handleClick}
      >
        <CheckCircleIcon sx={{ fontSize: '30px' }} />
      </IconButton>
    </Tooltip>
  );
};

export default ValidateButton;
