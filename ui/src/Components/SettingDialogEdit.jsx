import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';

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
  // console.log(selectedRowdata);

  const ConditionalDialogComponent = () => {
    if (selectedRowdata.__typename === 'TypeTache') {
      const refTaskTypeName = useRef('');
      const refGoal = useRef(0);
      const [taskTypeName, setTaskTypeName] = useState(selectedRowdata.name);
      const [goal, setGoal] = useState(selectedRowdata.objectif);

      // function to execute on click in save button
      const handleClicksave = () => {
        // Get the current value of task Type name
        console.log(refTaskTypeName.current.children[1].children[0].value);
        // Get the current value of goal input
        console.log(refGoal.current.children[1].children[0].value);
      };

      return (
        <React.Fragment>
          <DialogTitle>Edit {dialogTitle}</DialogTitle>
          <Divider />
          <DialogContent>
            <Box display={'flex'} flexDirection='column' gap={'1rem'}>
              <Box display={'flex'} gap={'1rem'}>
                <TextField
                  label='Task type name'
                  type={'text'}
                  placeholder='Write here the task type name'
                  ref={refTaskTypeName}
                  value={taskTypeName}
                  onChange={(e) => setTaskTypeName((prev) => e.target.value)}
                />
                <TextField
                  label='Goal'
                  type={'number'}
                  placeholder='Goal per hours'
                  ref={refGoal}
                  value={goal}
                  onChange={(e) => setGoal((prev) => e.target.value)}
                />
              </Box>
              <Box
                display={'flex'}
                flexDirection={'row'}
                justifyContent='flex-end'
                gap='1rem'
              >
                <Button variant='outlined' onClick={() => handleClicksave()}>
                  Save
                </Button>
                <Button variant='outlined' onClick={close}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </React.Fragment>
      );
    }
  };

  return (
    <Dialog open={open} onClose={close}>
      {ConditionalDialogComponent()}
    </Dialog>
  );
}
