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
import { DELETE_STATU_COM, DELETE_TASK_TYPE } from '../GraphQL/Mutation';
import { LIST_STATUS_COMMERCIALE, LIST_TASK_TYPE } from '../GraphQL/Queries';
import { deletedStatuCom, deletTaskType } from './dataHandler';

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
  const [statComDelete, { error: errorDeleteStatuCom }] = useMutation(
    DELETE_STATU_COM,
    { refetchQueries: [LIST_STATUS_COMMERCIALE], awaitRefetchQueries: true }
  );

  const regExStatCom = /statu Com/gi;
  const regExTaskType = /Task Type/gi;

  const handleConfirm = async () => {
    if (title.match(regExTaskType)) {
      await deletTaskType(typeTacheDelete, rowId, errorDelete).then(close);
    } else if (title.match(regExStatCom)) {
      await deletedStatuCom(statComDelete, rowId, errorDeleteStatuCom).then(
        close
      );
    }
  };

  const CustomTypography = () => {
    if (title.match(regExTaskType)) {
      return (
        <Typography>
          Do you realy want to delete {data.name} : {data.objectif} from
          database ?
        </Typography>
      );
    } else if (title.match(regExStatCom)) {
      return (
        <Typography>
          Do you realy want to delete {data.name} from database ?
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
