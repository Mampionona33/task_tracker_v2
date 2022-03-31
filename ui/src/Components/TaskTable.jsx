import React, { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Link, IconButton, Card, Typography, Paper } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LOAD_DATA, FILTRED_FICHE } from '../GraphQL/Queries';
import { useQuery, gql, refetchQueries, useMutation } from '@apollo/client';
import { UPDATE_FICHE } from '../GraphQL/Mutation';
import DialogEditTask from './DialogEditTask.jsx';

import {
  loadUnsubmitedTask,
  setPrevProcessIsOff,
  setProcessToPlay,
  modifyLastUpdate,
  updateElastedTime,
  dateFormater,
  setProcessToPause,
  updateProductivity,
  fetchTaskType,
  loadProcessingPlay,
} from './dataHandler';

export default function TaskTable() {
  const [sortModel, setSortModel] = useState([
    { field: 'lastUpdate', sort: 'desc' },
  ]);
  const [dialogEditOpen, setDialogEditOpen] = useState(false);
  const [elapstedTime, setElapstedTime] = useState(0);
  const [productivity, setProductivity] = useState(0);

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
    // to execute refetch
    awaitRefetchQueries: true,
  });

  // function to execute on play button click
  const handleClickPlay = async (param, event) => {
    let currentId = event.id;
    const elapstedTime =
      (Date.parse(new Date()) - Date.parse(event.row.lastUpdate)) / 1000 +
      event.row.elapstedTime;

    if (event.row.processing === 'isOff') {
      // console.log(elapstedTime);
      // console.log(prevTaskElapstedTime[0]);
      await modifyLastUpdate(prevTaskId[0], fichesUpdate, erroUpDate)
        .then(setPrevProcessIsOff(prevTaskId[0], fichesUpdate, erroUpDate))
        .then(
          updateElastedTime(
            prevTaskId[0],
            prevTaskElapstedTime[0],
            fichesUpdate,
            erroUpDate
          )
        )
        .then(
          updateProductivity(
            prevTaskId[0],
            fichesUpdate,
            erroUpDate,
            productivity
          )
        )
        .then(setProcessToPlay(currentId, fichesUpdate, erroUpDate))
        .then(modifyLastUpdate(currentId, fichesUpdate, erroUpDate))
        .then(() => {
          if (event.row.processing === 'isPlay') {
            return;
          }
          if (event.row.processing === 'isOff') {
            window.location.href = '#/dashboard';
          }
        });
    }
    if (event.row.processing === 'isPlay') {
      await setProcessToPause(event.id, fichesUpdate, erroUpDate)
        .then(modifyLastUpdate(currentId, fichesUpdate, erroUpDate))
        .then(
          updateElastedTime(currentId, elapstedTime, fichesUpdate, erroUpDate)
        );
    }
    if (event.row.processing === 'isPause') {
      await setProcessToPlay(currentId, fichesUpdate, erroUpDate)
        .then(modifyLastUpdate(currentId, fichesUpdate, erroUpDate))
        .then((window.location.href = '#/dashboard'));
    }
  };

  // function to execute on click edit buton
  const [taskIdToEdit, setTaskIdToEdit] = useState(0);
  const [selectedRowData, setSelectedRowData] = useState([]);
  const handleClickEdit = async (param, event) => {
    setTaskIdToEdit(event.id);
    setSelectedRowData(event.row);
    setDialogEditOpen(true);
  };

  // function to execute to close DialogEditTask
  const handleClickDialogEditClose = () => {
    setDialogEditOpen(false);
  };

  // fetching datas
  const dataUnsubmited = loadUnsubmitedTask();
  let taskPlay = [];
  let taskPause = [];
  let prevTask = [];
  const allTask = loadUnsubmitedTask();
  if (allTask.length > 0) {
    taskPlay = allTask.filter((task) => task.processing === 'isPlay');
    taskPause = allTask.filter((task) => task.processing === 'isPause');
  }
  if (taskPlay.length > 0) {
    prevTask = taskPlay;
  }
  if (taskPause.length > 0) {
    prevTask = taskPause;
  }
  const prevTaskId = prevTask.map((task) => {
    return task.id;
  });

  const prevTaskElapstedTime = prevTask.map((task) => {
    return task.elapstedTime;
  });

  const prevTaskProd = prevTask.map((task) => {
    return task.productivity;
  });

  // function to execut in useEffect to increment timer every seconds
  const timerIncrement = (elaps, lastUpdate) => {
    setElapstedTime((prev) =>
      Math.round(
        (Date.parse(new Date()) - Date.parse(lastUpdate)) / 1000 + elaps
      )
    );
  };

  // cleaning useEffect
  const [didMount, setDidMount] = useState(false);
  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  }, []);

  // initialisation refs
  const refTimer = useRef(null);
  const refProd = useRef(null);

  // load all task type
  const allTaskType = fetchTaskType();

  // get task with processing isPlay
  const taskProcessIsPlay = loadProcessingPlay();
  const allTaskData = allTask.map((item) => item);

  // initialise rows
  const rows = [];
  // Initialize columns
  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      headerAlign: 'center',
      flex: 1,
      hide: true,
    },
    {
      field: 'statIvpn',
      headerName: 'Status IVPN',
      headerAlign: 'center',
      flex: 1,
      hide: true,
    },
    {
      field: 'comment',
      headerName: 'comment',
      headerAlign: 'center',
      flex: 1,
      hide: true,
    },
    {
      field: 'nbBefor',
      headerName: 'Number Before',
      headerAlign: 'center',
      flex: 1,
      hide: true,
    },
    {
      field: 'nbAft',
      headerName: 'Number After',
      headerAlign: 'center',
      flex: 1,
      hide: true,
    },
    {
      field: 'numFiche',
      headerName: 'Num',
      headerAlign: 'center',
      flex: 1,
      minWidth: 80,
    },
    {
      field: 'typeTrav',
      headerName: ' Task Type',
      headerAlign: 'center',
      valueFormatter: ({ value }) => `${value}`,
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'statuCom',
      headerName: 'Status Com',
      headerAlign: 'center',
      flex: 1,
      minWidth: 100,
    },
    {
      field: 'state',
      headerName: 'State',
      headerAlign: 'center',
      flex: 1,
      minWidth: 75,
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
      flex: 1,
      minWidth: 90,
      renderCell: (param) => {
        // return <Typography variant='body2'>{param.value} %</Typography>;
        if (param.value >= 100) {
          return (
            <Paper sx={{ backgroundColor: 'success.light', padding: 0 }}>
              <Typography
                variant='body2'
                sx={{ color: 'primary.contrastText', margin: '0 0.2rem' }}
              >
                {param.row.processing === 'isPlay'
                  ? `${productivity}%`
                  : `${param.value}%`}
              </Typography>
            </Paper>
          );
        }
        if (param.value >= 95 && param.value < 100) {
          return (
            <Paper sx={{ backgroundColor: 'warning.light', padding: 0 }}>
              <Typography
                variant='body2'
                sx={{ color: 'primary.contrastText', margin: '0 0.2rem' }}
              >
                {param.row.processing === 'isPlay'
                  ? `${productivity}%`
                  : `${param.value}%`}
              </Typography>
            </Paper>
          );
        }
        if (param.value < 95) {
          return (
            <Paper sx={{ backgroundColor: 'error.main', padding: 0 }}>
              <Typography
                variant='body2'
                sx={{ color: 'primary.contrastText', margin: '0 0.2rem' }}
              >
                {param.row.processing === 'isPlay'
                  ? `${productivity}%`
                  : `${param.value}%`}
              </Typography>
            </Paper>
          );
        }
      },
    },
    {
      field: 'cat',
      headerName: 'Categorie',
      type: 'text',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      minWidth: 80,
    },
    {
      field: 'elapstedTime',
      headerName: 'elapstedTime',
      type: 'text',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        if (params.row.processing === 'isPlay') {
          const i = dateFormater(elapstedTime);
          return `${i.day}:${i.hours}:${i.min}:${i.sec}`;
        }
        if (
          params.row.processing === 'isOff' ||
          params.row.processing === 'isPause'
        ) {
          const i = dateFormater(params.row.elapstedTime);
          return `${i.day}:${i.hours}:${i.min}:${i.sec}`;
        }
      },
    },
    {
      field: 'url',
      headerName: 'Link',
      type: 'link',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
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
      justifyContent: 'space-between',
      headerAlign: 'center',
      flexWrap: 'wrap',
      flex: 1,
      minWidth: 200,
      renderCell: (param) => (
        <React.Fragment>
          <IconButton
            color='primary'
            component='span'
            arial-label='Play button'
            // using param and event to get id of the actual fiche
            onClick={(event) => handleClickPlay(event, param)}
            // conditionnal disabling button play on action column
            // disabled={param.row.processing === 'isPlay'}
          >
            {param.row.processing === 'isPlay' ? (
              <PauseCircleIcon />
            ) : (
              <PlayCircleIcon />
            )}
          </IconButton>
          <IconButton
            color='primary'
            component='span'
            arial-label='Play button'
            onClick={(event) => handleClickEdit(event, param)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color='primary'
            component='span'
            arial-label='Edit button'
          >
            <DeleteIcon />
          </IconButton>
        </React.Fragment>
      ),
    },
  ];

  useEffect(() => {
    if (taskProcessIsPlay.length > 0) {
      // calcul incrementation timer
      refTimer.current = 0;
      refTimer.current = setInterval(
        () =>
          timerIncrement(
            taskProcessIsPlay[0].elapstedTime,
            taskProcessIsPlay[0].lastUpdate
          ),
        1000
      );

      // Calcul decrementation prod
      const playTask = dataUnsubmited.filter(
        (item) => item.processing === 'isPlay'
      );

      if (playTask[0].typeTrav !== 'Empty Type' && allTaskType !== undefined) {
        const taskRef = allTaskType.filter(
          (task) => task.name === playTask[0].typeTrav
        );
        const prodGoal = taskRef[0].objectif;

        let elaps_inc = Math.round(
          (Date.parse(new Date()) - Date.parse(playTask[0].lastUpdate)) / 1000 +
            playTask[0].elapstedTime
        );
        refProd.current = 0;
        refProd.current = setInterval(() => {
          elaps_inc++;
          const returnGoal = prodGoal / 3600;
          const return_ = playTask[0].nbAft / elaps_inc;
          const prod = Math.round((return_ / returnGoal) * 100);
          setProductivity((prev) => prod);
        }, 1000);
        return () => {
          clearInterval(refProd.current);
          refProd.current = 0;
        };
      }
      return () => {
        clearInterval(refTimer.current);
        refTimer.current = 0;
      };
    }
  }, [taskProcessIsPlay]);

  if (allTaskData.length > 0) {
    rows.push(allTaskData);
  }

  // final render ------------------
  return (
    <Box
      sx={{
        width: '100%',
        height: '85vh',
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
      <Box sx={{ width: '100%', height: '100%' }}>
        <DataGrid
          columns={columns}
          pageSize={7}
          rows={rows[0] !== undefined ? rows[0] : []}
          // rows={taskRows[0] !== undefined ? taskRows[0] : []}
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
      {/* DialogBox Edit Task */}
      <React.Fragment>
        <DialogEditTask
          taskId={taskIdToEdit}
          open={dialogEditOpen}
          selectedRowData={selectedRowData}
          onClose={handleClickDialogEditClose}
        />
      </React.Fragment>
    </Box>
  );
}
