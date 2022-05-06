import { useMutation } from '@apollo/client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DELETE_TASK_TYPE } from '../GraphQL/Mutation';
import { LIST_TASK_TYPE } from '../GraphQL/Queries';
import { deletTaskType } from './dataHandler';

export default function DialogBoxConfirmDel({
  open,
  close,
  title,
  rowId,
  data,
}) {
  const [typeTacheDelete, { error: errorDelete }] = useMutation(
    DELETE_TASK_TYPE,
    { refetchQueries: [LIST_TASK_TYPE], awaitRefetchQueries: true }
  );

  const handleConfirm = async () => {
    if (title.includes('Task Type')) {
      await deletTaskType(typeTacheDelete, rowId, errorDelete).then(close);
    }
  };

  const CustomTypography = () => {
    if (title.includes('Task Type')) {
      return (
        <Typography>
          Do you realy want to delete {data.name} : {data.objectif} from
          database ?
        </Typography>
      );
    }
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={close}>
        <DialogTitle>{title}</DialogTitle>
        <Divider />
        <DialogContent>
          <CustomTypography />
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleConfirm}>
            Confirm
          </Button>
          <Button variant='outlined' onClick={close}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
