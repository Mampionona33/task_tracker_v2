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
import { CREAT_TASK_TYPE, UPDATE_TASK_TYPE } from '../GraphQL/Mutation';
import { LIST_TASK_TYPE } from '../GraphQL/Queries';
import {
  createTaskType,
  updateTaskTypeGoal,
  updateTaskTypeName,
} from './dataHandler';

/*
    This component is called from SettingTabPanel.jsx
    it get it's props from SettingTabPanel.jsx
    it's called by click on edit button in the table row
*/

export default function SettingDialogTaskType({
  open,
  close,
  dialogTitle,
  selectedRowdata,
  buttonEvent,
}) {
  const [goal, setGoal] = useState(0);
  const [taskTypeName, setTaskTypeName] = useState('');
  const refGoal = useRef(null);
  const refTaskTypeName = useRef(null);
  const [id, setId] = useState(undefined);

  const [typeTacheUpdate, { error: errorUpdate }] = useMutation(
    UPDATE_TASK_TYPE,
    { refetchQueries: [LIST_TASK_TYPE], awaitRefetchQueries: true }
  );

  const [typeTachesAdd, { error: errorCreatTaskType }] = useMutation(
    CREAT_TASK_TYPE,
    { refetchQueries: [LIST_TASK_TYPE], awaitRefetchQueries: true }
  );

  useEffect(() => {
    if (selectedRowdata !== undefined) {
      setGoal((prev) => selectedRowdata.objectif);
      setTaskTypeName((prev) => selectedRowdata.name);
      setId((prev) => selectedRowdata.id);
    }
  }, [selectedRowdata]);

  let title = '';
  const handleClickSave = async () => {
    title = dialogTitle;
    if (title.includes('Edit')) {
      await updateTaskTypeName(
        selectedRowdata.id,
        typeTacheUpdate,
        errorUpdate,
        refTaskTypeName.current.children[1].children[0].value
      )
        .then(
          updateTaskTypeGoal(
            selectedRowdata.id,
            typeTacheUpdate,
            errorUpdate,
            refGoal.current.children[1].children[0].value
          )
        )
        .then(close);
    }
    if (title.includes('Add')) {
      await createTaskType(
        typeTachesAdd,
        refTaskTypeName.current.children[1].children[0].value,
        refGoal.current.children[1].children[0].value,
        errorCreatTaskType
      ).then(close);
    }
  };

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>{dialogTitle}</DialogTitle>
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
            <Button variant='outlined' onClick={handleClickSave}>
              Save
            </Button>
            <Button variant='outlined' onClick={close}>
              Cancel
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
