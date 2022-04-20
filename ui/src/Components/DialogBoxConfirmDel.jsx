import { Dialog, DialogTitle } from '@mui/material';
import React from 'react';

export default function DialogBoxConfirmDel({ open, close }) {
  return (
    <React.Fragment>
      <Dialog open={open} onClose={close}>
        <DialogTitle>Confirm deletition</DialogTitle>
      </Dialog>
    </React.Fragment>
  );
}
