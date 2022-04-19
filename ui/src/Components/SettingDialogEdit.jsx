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
    return (
      <React.Fragment>
        <DialogTitle>{dialogTitle}</DialogTitle>
      </React.Fragment>
    );
  };

  return (
    <Dialog open={open} onClose={close}>
      {ConditionalDialogComponent()}
    </Dialog>
  );
}
