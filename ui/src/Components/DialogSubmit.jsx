import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

const DialogSubmit = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={onClose}
      aria-describedby='alert-dialog-slide-submit-task'
    >
      <DialogTitle>{'Submit Current Task ?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-submit-task'>
          Do you realy want to submit your current task
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Disagree</Button>
        <Button onClick={onClose}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogSubmit;
