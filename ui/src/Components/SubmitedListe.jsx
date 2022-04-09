import React, { useState, useEffect } from 'react';
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
  IconButton,
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LOAD_DATA, FILTRED_FICHE } from '../GraphQL/Queries';
import { useQuery, gql, refetchQueries } from '@apollo/client';
import { loadSubmitedTask } from './dataHandler';

const columns = [
  {
    field: 'numFiche',
    headerName: 'Num',
    flex: 1,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'typeTrav',
    headerName: ' Task Type',
    flex: 1,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'statuCom',
    headerName: 'Status Com',
    flex: 1,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'state',
    headerName: 'State',
    flex: 1,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
  },

  {
    field: 'productivity',
    headerName: 'Productivity',
    flex: 1,
    type: 'text',
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
  },
  {
    field: 'url',
    headerName: 'Link',
    type: 'link',
    align: 'center',
    flex: 1,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => (
      <Link href={params.value} target='_blank'>
        <LinkIcon />
      </Link>
    ),
  },
  {
    field: 'lastUpdate',
    headerName: 'Submit Date',
    flex: 1,
    type: 'date',
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => {
      return (
        <Typography>
          {new Date(params.value).toString().slice(0, 15)}
        </Typography>
      );
    },
  },
];

// --------------------------------------
export default function SubmitedListe() {
  const [sortModel, setSortModel] = useState([
    { field: 'lastUpdate', sort: 'desc' },
  ]);
  const [list, setList] = useState([]);

  // load all submited task
  const allSubmitedTask = loadSubmitedTask();

  // loading data on component mount
  useEffect(() => {
    if (allSubmitedTask) {
      setList((prev) => allSubmitedTask);
    }
  }, [allSubmitedTask]);

  const rows = [];
  if (list.length > 0) {
    rows.push(list);
  }
  console.log(rows[0]);
  return (
    <Box
      sx={{
        height: '85vh',
        '& .super-app-theme--header': {},
      }}
    >
      <Card
        sx={{
          justifyContent: 'center',
          display: 'flex',
          backgroundColor: '#FDAD0C',
          color: '#fff',
        }}
      ></Card>
      <DataGrid
        columns={columns}
        pageSize={7}
        pagination
        rowsPerPageOptions={[7]}
        rows={rows.length > 0 ? rows[0] : []}
        sx={{
          maxHeight: '80vh',
          margin: '1rem 5rem',
          color: 'contrastText',
          backgroundColor: '#fff',
          boxShadow: '3px 5px 15px 1px rgba(0, 0, 0, 0.3)',
        }}
        justifyContent='space-between'
        // default sorting to show sby on top of list
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        // default filtering table to show normal state only
        initialState={{
          filter: {
            filterModel: {
              items: [
                {
                  // columnField: 'state',
                  // operatorValue: 'equals',
                  // value: 'Normal',
                },
              ],
            },
          },
        }}
      />
    </Box>
  );
}
