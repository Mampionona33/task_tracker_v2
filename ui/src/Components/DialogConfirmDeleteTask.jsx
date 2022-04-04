import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider, Typography, Button } from '@mui/material';
import { UPDATE_FICHE } from '../GraphQL/Mutation';
import { useMutation, useQuery } from '@apollo/client';
import { LOAD_DATA, FILTRED_FICHE } from '../GraphQL/Queries';
import { setSubmitStateToDelete } from './dataHandler';

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
    ).then(props.onClose);
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle id='alert-dialog-delet-task'>Delete task</DialogTitle>
      <Divider />
      <DialogContent>
        <Typography>Do you realy want to Delete this task</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={confirmDelete}>Agree</Button>
        <Button onClick={props.onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
export default DialogConfirmDeleteTask;
