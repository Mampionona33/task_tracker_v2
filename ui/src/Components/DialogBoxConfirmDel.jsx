import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from '@mui/material';
import React from 'react';

export default function DialogBoxConfirmDel({ open, close, title, rowId }) {
  console.log(rowId);
  return (
    <React.Fragment>
      <Dialog open={open} onClose={close}>
        <DialogTitle>{title}</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogActions>
            <Button variant='outlined'>Confirm</Button>
            <Button variant='outlined' onClick={close}>
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
