import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Link, IconButton, Card, Typography, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SettingManageTaskTypeTable(params) {
  const columns = [
    { field: 'id', headerName: 'Id', headerAlign: 'center' },
    { field: 'name', headerName: 'Name', headerAlign: 'center' },
    { field: 'objectif', headerName: 'Goal', headerAlign: 'center' },
  ];
  const rows = [{ id: 0, name: 'test', objectif: 6 }];
  return (
    <Box height={'85vh'} bgcolor={'#fff'}>
      <DataGrid columns={columns} rows={rows} />
    </Box>
  );
}
