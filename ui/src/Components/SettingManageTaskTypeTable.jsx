import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Link,
  IconButton,
  Card,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SettingManageTaskTypeTable(params) {
  const columns = [
    { field: 'id', headerName: 'Id', headerAlign: 'center', hide: 'true' },
    { field: 'name', headerName: 'Name', headerAlign: 'center', flex: 1 },
    { field: 'objectif', headerName: 'Goal', headerAlign: 'center', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      headerAlign: 'center',
      renderCell: (params) => (
        <React.Fragment>
          <IconButton color='primary' aria-label='Edit'>
            <EditIcon />
          </IconButton>
          <IconButton color='primary' aria-label='Delete'>
            <DeleteIcon />
          </IconButton>
        </React.Fragment>
      ),
    },
  ];
  const rows = [{ id: 0, name: 'test', objectif: 6 }];
  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'space-between'}
      width={'75vw'}
    >
      <Box height={'75vh'} bgcolor={'#fff'}>
        <DataGrid columns={columns} rows={rows} />
      </Box>
      <Box>
        <Button variant='contained'>Add new</Button>
      </Box>
    </Box>
  );
}
