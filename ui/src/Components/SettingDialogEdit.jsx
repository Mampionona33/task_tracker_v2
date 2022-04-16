import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

/*
    This component is called from SettingTabPanel.jsx
    it get it's props from SettingTabPanel.jsx
    it's called by click on edit button in the table row
*/
export default function SettingDialogEdit({
  open,
  close,
  dialogTitle,
  selectedRowdata,
}) {
  console.log(selectedRowdata);

  const ConditionalDialogContent = (selectedRowdata) => {
    if (selectedRowdata.__typename === 'TypeTache') {
      return (
        <DialogContent>
          <Box>
            <Box>
              <TextField
                label='Task type name'
                type={'text'}
                placeholder='Write here the task type name'
              />
              <TextField
                label='Goal'
                type={'number'}
                placeholder='Goal per hours'
              />
            </Box>
            <Box>
              <Button>Save</Button>
              <Button>Cancel</Button>
            </Box>
          </Box>
        </DialogContent>
      );
    }
  };

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Edit {dialogTitle}</DialogTitle>
      <Divider />
      {ConditionalDialogContent(selectedRowdata)}
    </Dialog>
  );
}
