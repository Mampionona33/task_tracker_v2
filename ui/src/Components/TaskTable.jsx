import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Link, IconButton, Card, Typography } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LOAD_DATA, FILTRED_FICHE } from '../GraphQL/Queries';
import { useQuery, gql, refetchQueries, useMutation } from '@apollo/client';
import { UPDATE_FICHE } from '../GraphQL/Mutation';
import {
  loadProcessingPause,
  loadProcessingPlay,
  loadUnsubmitedTask,
  setPrevProcessIsOff,
  setProcessToPlay,
  modifyLastUpdate,
  updateElastedTime,
} from './dataHandler';

export default function TaskTable() {
  const [sortModel, setSortModel] = useState([
    { field: 'lastUpdate', sort: 'desc' },
  ]);
  const [list, setList] = useState([]);

  const [prevFiche, setPrevFiche] = useState([]);
  const [prevFicheId, setPrevFicheId] = useState(0);
  const [prevFicheLastUpdate, setPrevFicheLastUpdate] = useState([]);
  const [prevFicheElapstedTime, setPrevFicheElapstedTime] = useState(0);

  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      headerAlign: 'center',
      flex:1,
    },
    {
      field: 'numFiche',
      headerName: 'Num',
      headerAlign: 'center',
      flex:1,
      minWidth:150,
    },
    {
      field: 'typeTrav',
      headerName: ' Task Type',
      headerAlign: 'center',
      valueFormatter: ({ value }) => `${value}`,
    },
    {
      field: 'statusCom',
      headerName: 'Status Com',
      headerAlign: 'center',
      flex:1,
      minWidth:150
    },
    {
      field: 'state',
      headerName: 'State',
      headerAlign: 'center',
    },
    {
      field: 'lastUpdate',
      headerName: 'Last Update',
      type: 'date',
      align: 'center',
      headerAlign: 'center',
      hide: 'true',
    },
    {
      field: 'productivity',
      headerName: 'Productivity',
      type: 'text',
      align: 'center',
      headerAlign: 'center',
      flex:1,
      minWidth:150,
    }, 
    {
      field: 'elapstedTime',
      headerName: 'elapstedTime',
      type: 'text',
      align: 'center',
      headerAlign: 'center',
      flex:1,
      minWidth:150,
    },
    {
      field: 'link',
      headerName: 'Link',
      type: 'link',
      align: 'center',
      headerAlign: 'center',
      flex:1,
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
      headerAlign: 'center',
      flexWrap: 'wrap',
      flex: 1,
      minWidth:200,
      renderCell: (param) => (
        <React.Fragment>
          <IconButton
            color='primary'
            component='span'
            arial-label='Pause button'
            // using param and event to get id of the actual fiche
            onClick={(event) => handleClickPlay(event, param)}
          >
            <PlayCircleIcon />
          </IconButton>
          <IconButton
            color='primary'
            component='span'
            arial-label='Pause button'
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color='primary'
            component='span'
            arial-label='Pause button'
          >
            <DeleteIcon />
          </IconButton>
        </React.Fragment>
      ),
    },
  ];

  // execute mutation fichesUpdate with useMutation
  const [fichesUpdate, { error: erroUpDate }] = useMutation(UPDATE_FICHE, {
    refetchQueries: [LOAD_DATA],
    refetchQueries: [
      FILTRED_FICHE,
      { variables: { input: { submiteState: 'isUnsubmited' } } },
    ],
    refetchQueries: [
      FILTRED_FICHE,
      { variables: { input: { submiteState: 'isSubmited' } } },
    ],
  });

  

  const handleClickPlay = async (param, event) => {
    let currentId = event.id;

    const elapstedTime =
      (Date.parse(new Date()) - Date.parse(prevFicheLastUpdate)) / 1000 +
      prevFicheElapstedTime;

    await modifyLastUpdate(prevFicheId, fichesUpdate, erroUpDate)
      .then(setPrevProcessIsOff(prevFicheId, fichesUpdate, erroUpDate))
      .then(
        updateElastedTime(prevFicheId, elapstedTime, fichesUpdate, erroUpDate)
      )
      .then(setProcessToPlay(currentId, fichesUpdate, erroUpDate))
      .then(modifyLastUpdate(currentId, fichesUpdate, erroUpDate))
      .then((window.location.href = '#/dashboard')).the;
  };

  // fetching data
  const dataPlay = loadProcessingPlay();
  const dataPause = loadProcessingPause();
  const dataUnsubmited = loadUnsubmitedTask();

  // loading data on component mount
  useEffect(() => {
    if (dataUnsubmited) {
      setList(dataUnsubmited);
    }
    if (dataPlay.length > 0) {
      setPrevFiche(dataPlay);
      setPrevFicheId((prev) => dataPlay[0].id);
      setPrevFicheLastUpdate((perv) => dataPlay[0].lastUpdate);
      console.log('dataPlay', dataPlay);
    }
    if (dataPause.length > 0) {
      setPrevFiche(dataPause);
      setPrevFicheId((prev) => dataPause[0].id);
      console.log('dataPause', dataPause);
    }
  }, [prevFiche, dataPlay, dataPause, dataUnsubmited, prevFicheLastUpdate]);

  console.log('prevFicheLastUpdate', prevFicheLastUpdate);

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
      link: item.url != '' ? item.url : 'https://www.google.mg/',
    };

    rows.push(arrayRows);
  });

  return (
    <Box
      sx={{
      width:'100%',
        height: '90vh',
        '& .emptyType': {
          backgroundColor: 'warning.light',
          color: 'warning.contrastText',
        },
        '& .sby': {
          backgroundColor: 'error.main',
          color: 'error.contrastText',
        },
      }}
    >
      <Card
        sx={{
          justifyContent: 'center',
          display: 'flex',
          backgroundColor: '#28B463',
          color: '#fff',
        }}
      >
        <Typography variant='h4'>Tasks List</Typography>
      </Card>
      <Box sx={{width:'100%', height:'100%'}}>
      <DataGrid

        columns={columns}
        pageSize={7}
        rows={rows}
        rowsPerPageOptions={[7]}
        pagination
        sx={{
          maxHeight: '80vh',
          margin: '1rem 5rem',
          color: 'contrastText',
          backgroundColor: '#fff',
          boxShadow: '3px 5px 15px 1px rgba(0, 0, 0, 0.3)',
        }}
        // Styling cell depanding on it's value
        getCellClassName={(params) => {
          if (params.value === 'Empty Type') {
            return 'emptyType';
          }
          if (params.value === 'Sby') {
            return 'sby';
          }
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
    </Box>
  );
}
