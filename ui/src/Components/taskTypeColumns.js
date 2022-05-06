import React, { useState } from 'react';
import { Tabs, Tab, Typography, Box, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const taskTypeColumns = [
  { field: 'id', headerName: 'Id', headerAlign: 'center', hide: 'true' },
  {
    field: 'name',
    headerName: 'Task Type Name',
    headerAlign: 'center',
    flex: 1,
  },
  {
    field: 'objectif',
    headerName: 'Task Goal',
    headerAlign: 'center',
  },
  {
    field: 'actions',
    headerName: 'Actions',
    headerAlign: 'center',
    align: 'center',

    renderCell: (params) => (
      <React.Fragment>
        <IconButton
          color='primary'
          aria-label='Edit'
          onClick={(event) => handleClickEdit(event, params)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color='primary'
          aria-label='Delete'
          onClick={(event) => handleClickDel(event, params)}
        >
          <DeleteIcon />
        </IconButton>
      </React.Fragment>
    ),
  },
];

//--------------------
// Dialog Confirm Del
//--------------------

const [dialogDelOpen, setDialogDelOpen] = useState(false);
const handleClickDel = (event, params) => {
  // console.log(params);
  setTaskTypeId((prev) => params.id);
  setSelectedRowData((prev) => params.row);
  setDialogDelOpen((prev) => true);
};
