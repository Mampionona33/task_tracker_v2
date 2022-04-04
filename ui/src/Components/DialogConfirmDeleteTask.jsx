import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider, Typography, Button } from '@mui/material';

const DialogConfirmDeleteTask = (props) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle id='alert-dialog-delet-task'>Delete task</DialogTitle>
      <Divider />
      <DialogContent>
        <Typography>Do you realy want to Delete this task</Typography>
      </DialogContent>
      <DialogActions>
        <Button>Agree</Button>
        <Button onClick={props.onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
export default DialogConfirmDeleteTask;
