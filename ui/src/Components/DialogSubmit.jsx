import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
} from '@mui/material';

import MuiAlert from '@mui/material/Alert';

import {
  submitecurrentTask,
  setPrevProcessIsOff,
  loadProcessingPlay,
  userLoggedData,
} from './dataHandler';
import { useMutation } from '@apollo/client';
import { UPDATE_FICHE } from '../GraphQL/Mutation';
import { LOAD_DATA, FILTRED_FICHE } from '../GraphQL/Queries';

const DialogSubmit = ({ open, onClose, prevTaskId }) => {
  const [alertOpen, setAlertOpen] = useState(false);

  // execute mutation fichesUpdate with useMutation
  const [fichesUpdate, { error: erroUpDate }] = useMutation(UPDATE_FICHE, {
    refetchQueries: [{ query: LOAD_DATA }],
  });

  const dataPlay = loadProcessingPlay();
  const refechData = userLoggedData();

  const onClickAgree = async () => {
    await submitecurrentTask(prevTaskId, fichesUpdate, erroUpDate)
      .then(setPrevProcessIsOff(prevTaskId, fichesUpdate, erroUpDate))
      .then(console.log('taskId', prevTaskId))
      .then(console.log('refechData', refechData))
      .then(onClose());
  };

  const handleClose = () => {
    setAlertOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={onClose}
      aria-describedby='alert-dialog-slide-submit-task'
    >
      <DialogTitle>{'Submit Current Task ?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-submit-task'>
          Do you realy want to submit your current task
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickAgree}>Agree</Button>
        <Button onClick={onClose}>Disagree</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogSubmit;
