import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
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
      console.log('task type data', data.name);
    }
  };

  const CustomTypography = () => {
    if (title.includes('Task Type')) {
      return (
        <Typography>
          Do you realy want to delete {data.name} : {data.objectif} from database ?
        </Typography>
      );
    }
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={close}>
        <DialogTitle>{title}</DialogTitle>
        <Divider />
        <DialogContent>
          <CustomTypography />
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleConfirm}>
            Confirm
          </Button>
          <Button variant='outlined' onClick={close}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
