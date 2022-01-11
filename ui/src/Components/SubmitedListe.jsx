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
    field: 'statusCom',
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
    field: 'lastUpdate',
    headerName: 'Last Update',
    flex: 1,
    type: 'date',
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    hide: 'true',
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
    field: 'link',
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
    field: 'actions',
    headerName: 'Action',
    align: 'center',
    type: 'link',
    justifyContent: 'space-between',
    flex: 1,
    headerAlign: 'center',
    flexWrap: 'wrap',
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => (
      <React.Fragment>
        <IconButton
          color='primary'
          component='span'
          arial-label='Pause button'
          onClick={handleClickPause}
        >
          <PlayCircleIcon />
        </IconButton>
        <IconButton color='primary' component='span' arial-label='Pause button'>
          <EditIcon />
        </IconButton>
        <IconButton color='primary' component='span' arial-label='Pause button'>
          <DeleteIcon />
        </IconButton>
      </React.Fragment>
    ),
  },
];

const handleClickPause = () => {
  window.location.href = '#/dashboard';
};

// --------------------------------------
export default function SubmitedListe() {
  const [sortModel, setSortModel] = useState([
    { field: 'lastUpdate', sort: 'desc' },
  ]);
  const [list, setList] = useState([]);

  // Loading unsubmited fiches
  const {
    error: errorUnsubmited,
    loading: loadingUnsumbited,
    data: dataUnsubmited,
  } = useQuery(FILTRED_FICHE, {
    variables: {
      input: {
        submiteState: 'isSubmited',
      },
    },
  });

  // loading data on component mount
  useEffect(() => {
    if (dataUnsubmited) {
      setList(dataUnsubmited.searchFiches);
    }
  });

  let rows = [];
  let arrayRows = {};

  const listRows = list.map((item) => {
    arrayRows = {
      id: item.id,
      numFiche: item.numFiche,
      typeTrav: item.typeTrav,
      statusCom: item.statusCom,
      lastUpdate: item.lastUpdate,
      state: item.state,
      link: item.url,
    };

    rows.push(arrayRows);
  });

  return (
    <Box
      sx={{
        height: '90vh',
        '& .super-app-theme--header': {},
      }}
    >
      <DataGrid
        columns={columns}
        pageSize={7}
        rows={rows}
        pagination
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
