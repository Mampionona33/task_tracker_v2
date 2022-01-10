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
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { field: 'numFiche', headerName: 'Num', minWidth: 100, flex: 1 },
  { field: 'typeTrav', headerName: 'Type Travail', flex: 1 },
  { field: 'statusCom', headerName: 'Status Com', minWidth: 70, flex: 1 },
  { field: 'state', headerName: 'State', minWidth: 100, flex: 1 },
  {
    field: 'link',
    headerName: 'Link',
    minWidth: 100,
    type: 'link',
    align: 'center',
    flex: 1,
    renderCell: (params) => (
      <Link href={params.value}>
        <LinkIcon />
      </Link>
    ),
  },
  {
    field: 'actions',
    headerName: 'Action',
    minWidth: 100,
    align: 'center',
    type: 'link',
    justifyContent: 'space-between',
    flex: 1,
    renderCell: (params) => (
      <Box display='flex' sx={{ gap: '1.5rem' }}>
        <Link href={params.value}>
          <PlayCircleIcon />
        </Link>
        <Link href={params.value}>
          <EditIcon />
        </Link>
        <Link href={params.value}>
          <DeleteIcon />
        </Link>
      </Box>
    ),
  },
];

const rows = [
  {
    id: 1,
    numFiche: '1500',
    typeTrav: 'MajPrio',
    statusCom: 'Degradée',
    state: 'Normal',
    link: 'test',
    actions: 'idOfFiche',
  },
  {
    id: 2,
    numFiche: '145',
    typeTrav: 'MajPrio',
    statusCom: 'Degradée',
    state: 'Normal',
    link: '#',
  },
  {
    id: 3,
    numFiche: '4654',
    typeTrav: 'MajPrio',
    statusCom: 'Degradée',
    state: 'Normal',
    link: '#',
  },
  {
    id: 4,
    numFiche: '354',
    typeTrav: 'MajPrio',
    statusCom: 'Degradée',
    state: 'Normal',
    link: '#',
  },
  {
    id: 5,
    numFiche: '1500',
    typeTrav: 'MajPrio',
    statusCom: 'Degradée',
    state: 'Sby',
    link: '#',
  },
  {
    id: 6,
    numFiche: '1345',
    typeTrav: 'MajPrio',
    statusCom: 'Degradée',
    state: 'Normal',
    link: '#',
  },
  {
    id: 7,
    numFiche: '987',
    typeTrav: 'MajPrio',
    statusCom: 'Degradée',
    state: 'Normal',
    link: '#',
  },
  {
    id: 8,
    numFiche: '4646',
    typeTrav: 'MajPrio',
    statusCom: 'Degradée',
    state: 'Normal',
    link: '#',
  },
  {
    id: 9,
    numFiche: '3485',
    typeTrav: 'MajPrio',
    statusCom: 'Degradée',
    state: 'Normal',
    link: '#',
  },
  {
    id: 10,
    numFiche: '9765',
    typeTrav: 'MajPrio',
    statusCom: 'Degradée',
    state: 'Normal',
    link: '#',
  },
  {
    id: 11,
    numFiche: '4528',
    typeTrav: 'MajPrio',
    statusCom: 'Degradée',
    state: 'Sby',
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
        justifyContent='space-between'
        flexWrap
        // default filtering table to show normal state only
        initialState={{
          filter: {
            filterModel: {
              items: [
                {
                  columnField: 'state',
                  operatorValue: 'equals',
                  value: 'Normal',
                },
              ],
            },
          },
        }}
      />
    </React.Fragment>
  );
}
