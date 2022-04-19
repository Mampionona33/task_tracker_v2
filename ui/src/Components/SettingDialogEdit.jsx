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
    let initGoal = 0;
    let initTastTypeName = '';

    if (buttonEvent.target !== undefined) {
      // console.log(buttonEvent.target);
      if (buttonEvent.target.tagName === 'svg') {
        initGoal = selectedRowdata.objectif;
        initTastTypeName = selectedRowdata.name;
      } else if (buttonEvent.target.tagName === 'button') {
        initGoal = 0;
        initTastTypeName = '';
      }

      const ButtonSave = () => {
        return (
          <React.Fragment>
            <Button variant='outlined' onClick={handleClicksave}>
              Save
            </Button>
          </React.Fragment>
        );
      };

      const ButtonAdd = () => {
        return (
          <React.Fragment>
            <Button onClick={handleClickAdd}>Add</Button>
          </React.Fragment>
        );
      };
      const refTaskTypeName = useRef('');
      const refGoal = useRef(0);
      const [taskTypeName, setTaskTypeName] = useState(initTastTypeName);
      const [goal, setGoal] = useState(initGoal);

      const [typeTacheUpdate, { error: errorUpdate }] = useMutation(
        UPDATE_TASK_TYPE,
        { refetchQueries: [LIST_TASK_TYPE], awaitRefetchQueries: true }
      );

      // function to execute on click in save button
      const handleClicksave = async () => {
        // Get the current value of task Type name
        console.log(refTaskTypeName.current.children[1].children[0].value);
        // Get the current value of goal input
        console.log(refGoal.current.children[1].children[0].value);
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
      };

      // function to execute on Click in add button
      const handleClickAdd = async () => {
        console.log('test');
      };

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
                {buttonEvent.target.tagName === 'svg' ? (
                  <ButtonSave />
                ) : (
                  <ButtonAdd />
                )}
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
