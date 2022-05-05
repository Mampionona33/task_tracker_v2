import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from '@mui/material';
import React from 'react';
import { deletTaskType } from './dataHandler';

export default function DialogBoxConfirmDel({
  open,
  close,
  title,
  rowId,
  data,
}) {
  const handleConfirm = async () => {
    if (title.includes('Task Type')) {
      console.log('task type data', data);
    }
  };
  return (
    <React.Fragment>
      <Dialog open={open} onClose={close}>
        <DialogTitle>{title}</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogActions>
            <Button variant='outlined' onClick={handleConfirm}>
              Confirm
            </Button>
            <Button variant='outlined' onClick={close}>
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
