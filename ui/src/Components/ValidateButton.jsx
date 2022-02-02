import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Tooltip, IconButton, Typography, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DialogSubmits from './DialogSubmit';

const ValidateButton = ({ prevTaskId, resetTimer }) => {
  const [dialConfirmOpen, setDialConfirmOpen] = useState(false);

  const handleClickOpenDialConfirmation = () => {
    setDialConfirmOpen(true);
  };

  const handleClickCloseDialConfirmation = () => {
    setDialConfirmOpen(false);
  };

  return (
    <React.Fragment>
      <React.Fragment>
        <Tooltip title='Submit Task' arrow>
          <IconButton
            color='primary'
            component='span'
            label='Pause button'
            onClick={handleClickOpenDialConfirmation}
          >
            <CheckCircleIcon sx={{ fontSize: '30px' }} />
          </IconButton>
        </Tooltip>
      </React.Fragment>

      {/* DialogSubmit confirmation */}
      <React.Fragment>
        <DialogSubmits
          open={dialConfirmOpen}
          onClose={handleClickCloseDialConfirmation}
          prevTaskId={prevTaskId}
          resetTimer={resetTimer}
        />
      </React.Fragment>
    </React.Fragment>
  );
};

export default ValidateButton;
