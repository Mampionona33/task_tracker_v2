import { useMutation } from '@apollo/client';
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
import { UPDATE_TASK_TYPE } from '../GraphQL/Mutation';
import { LIST_TASK_TYPE } from '../GraphQL/Queries';
import { updateTaskTypeGoal, updateTaskTypeName } from './dataHandler';

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
  buttonEvent,
}) {
  const ConditionalDialogComponent = () => {
    const [goal, setGoal] = useState(0);
    const [taskTypeName, setTaskTypeName] = useState('');
    const refGoal = useRef(null);
    const refTaskTypeName = useRef(null);

    useEffect(() => {
      if (selectedRowdata !== undefined) {
        setGoal((prev) => selectedRowdata.objectif);
        setTaskTypeName((prev) => selectedRowdata.name);
      }
    }, [selectedRowdata]);

    return (
      <React.Fragment>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <Divider />
        <DialogContent>
          <Box display={'flex'} flexDirection='column' gap={'1rem'}>
            <Box display={'flex'} gap={'1rem'}>
              <TextField
                label='Task type name'
                type={'text'}
                placeholder='Write here the task type name'
                value={taskTypeName}
              />
              <TextField
                label='Goal'
                type={'number'}
                placeholder='Goal per hours'
                value={goal}
              />
            </Box>

            <Box
              display={'flex'}
              flexDirection={'row'}
              justifyContent='flex-end'
              gap='1rem'
            >
              <Button variant='outlined' onClick={close}>
                Cancel
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </React.Fragment>
    );
  };

  return (
    <Dialog open={open} onClose={close}>
      {ConditionalDialogComponent()}
    </Dialog>
  );
}
