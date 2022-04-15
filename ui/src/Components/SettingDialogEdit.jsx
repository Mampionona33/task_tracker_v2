import { Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';
import React from 'react';

/*
    This component is called from SettingTabPanel.jsx
    it get it's props from SettingTabPanel.jsx
    it's called by click on edit button in the table row
*/
export default function SettingDialogEdit({ open, close, dialogTitle }) {
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Edit {dialogTitle}</DialogTitle>
      <Divider />
      <DialogContent></DialogContent>
    </Dialog>
  );
}
