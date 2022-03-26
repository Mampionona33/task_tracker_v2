import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  TextField,
  Autocomplete,
  Box,
  Paper,
  Typography,
  TextareaAutosize,
  Divider,
} from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';

const DialogTaskEdit_2 = (props) => {
  const open = props.open;
  const close = props.onClose;
  const refNumFiche = useRef(null);

  
  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby='alert-dialog-edit-task'
      aria-describedby='alert-dialog-describ-edit-task'
      fullWidth
    >
      <DialogTitle>Task Edit</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            id='numFiche'
            variant='standard'
            label='Task Number'
            fullWidth
            ref={refNumFiche}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DialogTaskEdit_2;