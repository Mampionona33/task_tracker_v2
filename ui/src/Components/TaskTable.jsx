import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Badge,
  Box,
  Card,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Grid,
  Paper,
  keyframes,
  Link,
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';

const columns = [
  { field: 'numFiche', headerName: 'Num', minWidth: 100 },
  { field: 'typeTrav', headerName: 'Type Travail' },
  { field: 'statusCom', headerName: 'Status Com', minWidth: 70 },
  { field: 'state', headerName: 'State', minWidth: 100 },
  {
    field: 'link',
    headerName: 'Link',
    minWidth: 100,
    type: 'link',
    align: 'center',
    renderCell: (params) => (
      <Link href={params.value}>
        <LinkIcon />
      </Link>
    ),
  },
  { field: 'actions', headerName: 'Action', minWidth: 100 },
];

const rows = [
  {
    id: 1,
    numFiche: '1500',
    typeTrav: 'MajPrio',
    statusCom: 'Degradée',
    state: 'Normal',
    link: '#',
  },
  {
    id: 1,
    numFiche: '1500',
    typeTrav: 'MajPrio',
    statusCom: 'Degradée',
    state: 'Normal',
    link: '#',
  },
  {
    id: 1,
    numFiche: '1500',
    typeTrav: 'MajPrio',
    statusCom: 'Degradée',
    state: 'Normal',
    link: '#',
  },
  {
    id: 1,
    numFiche: '1500',
    typeTrav: 'MajPrio',
    statusCom: 'Degradée',
    state: 'Normal',
    link: '#',
  },
  {
    id: 1,
    numFiche: '1500',
    typeTrav: 'MajPrio',
    statusCom: 'Degradée',
    state: 'Normal',
    link: '#',
  },
  {
    id: 1,
    numFiche: '1500',
    typeTrav: 'MajPrio',
    statusCom: 'Degradée',
    state: 'Normal',
    link: '#',
  },
  {
    id: 1,
    numFiche: '1500',
    typeTrav: 'MajPrio',
    statusCom: 'Degradée',
    state: 'Normal',
    link: '#',
  },
  {
    id: 1,
    numFiche: '1500',
    typeTrav: 'MajPrio',
    statusCom: 'Degradée',
    state: 'Normal',
    link: '#',
  },
  {
    id: 1,
    numFiche: '1500',
    typeTrav: 'MajPrio',
    statusCom: 'Degradée',
    state: 'Normal',
    link: '#',
  },
  {
    id: 1,
    numFiche: '1500',
    typeTrav: 'MajPrio',
    statusCom: 'Degradée',
    state: 'Normal',
    link: '#',
  },
  {
    id: 1,
    numFiche: '1500',
    typeTrav: 'MajPrio',
    statusCom: 'Degradée',
    state: 'Normal',
    link: '#',
  },
];

export default function TaskTable() {
  const [pageSize, setPageSize] = React.useState(9);
  return (
    <React.Fragment>
      <DataGrid
        columns={columns}
        pageSize={pageSize}
        rows={rows}
        pagination
        sx={{ maxHeight: '90vh' }}
      />
    </React.Fragment>
  );
}
