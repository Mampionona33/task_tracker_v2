import { useMutation } from '@apollo/client';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  DELETE_STATU_COM,
  DELETE_STATU_IVPN,
  DELETE_TASK_TYPE,
} from '../GraphQL/Mutation';
import {
  LIST_STATUS_COMMERCIALE,
  LIST_STATUS_IVPN,
  LIST_TASK_TYPE,
} from '../GraphQL/Queries';
import { deletedStatIvpn, deletedStatuCom, deletTaskType } from './dataHandler';

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
  const [statIvpnDelete, { error: errorDeleteStatuIvpn }] = useMutation(
    DELETE_STATU_IVPN,
    { refetchQueries: [LIST_STATUS_IVPN], awaitRefetchQueries: true }
  );

  const regExStatCom = /statu Com/gi;
  const regExTaskType = /Task Type/gi;
  const regExStatuIvpn = /statu Ivpn/gi;

  const handleConfirm = async () => {
    if (title.match(regExTaskType)) {
      await deletTaskType(typeTacheDelete, rowId, errorDelete).then(close);
    } else if (title.match(regExStatCom)) {
      await deletedStatuCom(statComDelete, rowId, errorDeleteStatuCom).then(
        close
      );
    } else if (title.match(regExStatuIvpn)) {
      await deletedStatIvpn(statIvpnDelete, rowId, errorDeleteStatuIvpn).then(
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
    } else if (title.match(regExStatuIvpn)) {
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
