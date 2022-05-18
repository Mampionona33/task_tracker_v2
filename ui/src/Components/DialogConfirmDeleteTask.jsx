import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider, Typography, Button, Box } from '@mui/material';
import { UPDATE_FICHE } from '../GraphQL/Mutation';
import { useMutation } from '@apollo/client';
import { FILTRED_FICHE } from '../GraphQL/Queries';
import WarningIcon from '@mui/icons-material/Warning';
import {
  setSubmitStateToDelete,
  updateTaskLastUpdate,
  setPrevProcessIsOff,
} from './dataHandler';

const DialogConfirmDeleteTask = (props) => {
  // function to execute to make data update
  const [fichesUpdate, { error: erroUpDate }] = useMutation(UPDATE_FICHE, {
    refetchQueries: [
      FILTRED_FICHE,
      { variables: { input: { submiteState: 'isSubmited' } } },
    ],
    refetchQueries: [
      FILTRED_FICHE,
      { variables: { input: { submiteState: 'isDelete' } } },
    ],
    awaitRefetchQueries: true,
  });

  // function to execute to set submiteState to isDelete on click in Agree button
  const confirmDelete = async () => {
    await setSubmitStateToDelete(
      props.selectedRowData.id,
      fichesUpdate,
      erroUpDate
    )
      .then(setPrevProcessIsOff(selectedRowData.id, fichesUpdate, erroUpDate))
      .then(updateTaskLastUpdate(selectedRowData.id, fichesUpdate, erroUpDate))
      .then(props.onClose);
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle id='alert-dialog-delet-task'>
        Delete task : {props.selectedRowData.numFiche}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box
          display={'flex'}
          flexDirection='row'
          gap={'1rem'}
          alignItems='center'
        >
          <WarningIcon sx={{ fontSize: '2rem', color: 'warning.light' }} />
          <Typography>Do you realy want to DELETE this task</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={confirmDelete}>
          Agree
        </Button>
        <Button variant='outlined' onClick={props.onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DialogConfirmDeleteTask;
