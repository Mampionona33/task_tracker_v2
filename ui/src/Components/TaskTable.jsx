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
  loadProcessingOff,
  loadAllData,
} from './dataHandler';

export default function TaskTable() {
  const [sortModel, setSortModel] = useState([
    { field: 'lastUpdate', sort: 'desc' },
  ]);
  const [dialogEditOpen, setDialogEditOpen] = useState(false);
  // const [list, setList] = useState([]);
  // const [dynamicRow, setDynamicRow] = useState([]);
  // const [staticRows, setStaticRows] = useState([]);
  // control DialogEditTask
  // const [id, setId] = useState(0);
  // const [timePlay, setTimePlay] = useState(0);
  // const [taskType, setTaskType] = useState('');
  // const [numFiche, setNumFiche] = useState('');
  // const [statIvpn, setStatIvpn] = useState('');
  // const [statusCom, setStatusCom] = useState('');
  // const [state, setState] = useState('');
  // const [cat, setCat] = useState('');
  // const [url, setUrl] = useState('');
  // const [elapstedTime, setElapstedTime] = useState(0);
  // const [processing, setProcessing] = useState('');
  // const [productivity, setProductivity] = useState(0);

  // static data
  // const [staticId, setStaticId] = useState(0);
  // const [staticNumFiche, setStaticNumFiche] = useState('');

  // const [showDynamicRows, setShwoDynamicRows] = useState(false);
  // const [showStaticRows, setShowStaticRows] = useState(false);
  // columns to use inside table
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
                {param.value} %
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
                {param.value} %
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
                {param.value} %
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
      (Date.parse(new Date()) - Date.parse(arrayRows.lastUpdate)) / 1000 +
      arrayRows.elapstedTime;
    if (event.row.processing === 'isOff') {
      await modifyLastUpdate(prevTaskId[0], fichesUpdate, erroUpDate)
        .then(setPrevProcessIsOff(prevTaskId[0], fichesUpdate, erroUpDate))
        .then(
          updateElastedTime(
            prevTaskId[0],
            elapstedTime,
            fichesUpdate,
            erroUpDate
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
      await setProcessToPause(event.id, fichesUpdate, erroUpDate).then(
        modifyLastUpdate(currentId, fichesUpdate, erroUpDate)
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
  // fetching data
  // const dataUnsubmited = loadUnsubmitedTask();
  // let taskPlay = [];
  // let taskPause = [];
  // let prevTask = [];
  // if (list.length > 0) {
  //   taskPlay = list.filter((task) => task.processing === 'isPlay');
  //   taskPause = list.filter((task) => task.processing === 'isPause');
  // }
  // if (taskPlay.length > 0) {
  //   prevTask = taskPlay;
  // }
  // if (taskPause.length > 0) {
  //   prevTask = taskPause;
  // }
  // const prevTaskId = prevTask.map((task) => {
  //   return task.id;
  // });
  // const prevTaskProd = prevTask.map((task) => {
  //   return task.productivity;
  // });

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
  // const refTimer = useRef(null);
  // const refProd = useRef(null);

  // load all task type
  const allTaskType = fetchTaskType();

  // useEffect(() => {
  //   if (loadUnsubmitedTask !== undefined) {
  //     const staticOff = dataUnsubmited.filter(
  //       (item) => item.processing === 'isOff'
  //     );
  //     // if task processing isOff
  //     if (staticOff.length > 0) {
  //       // console.log(staticOff);
  //       setShowStaticRows((prev) => true);
  //       for (let i = 0; i < staticOff.length; i++) {
  //         setStaticId((prev) => staticOff[i].id);
  //         setStaticNumFiche((prev) => staticOff[i].numFiche);
  //       }
  //     }
  //   }
  // }, [dataUnsubmited]);

  // loading data on component mount
  // useEffect(() => {
  //   if (loadUnsubmitedTask !== undefined) {
  //     setList(dataUnsubmited);

  //     const playTask = dataUnsubmited.filter(
  //       (item) => item.processing === 'isPlay'
  //     );
  //     const dynamPause = dataUnsubmited.filter(
  //       (item) => item.processing === 'isPause'
  //     );

  //     if (playTask.length > 0 && allTaskType) {
  //       setShwoDynamicRows((prev) => true);
  //       setTimePlay((perv) => playTask[0].elapstedTime);
  //       setId((prev) => playTask[0].id);
  //       setTaskType((prev) => playTask[0].typeTrav);
  //       setNumFiche((prev) => playTask[0].numFiche);
  //       setStatIvpn((prev) => playTask[0].statIvpn);
  //       setStatusCom((prev) => playTask[0].statuCom);
  //       setState((prev) => playTask[0].state);
  //       setCat((prev) => playTask[0].cat);
  //       setUrl((prev) => playTask[0].url);
  //       setProcessing((prev) => playTask[0].processing);

  //       // calcul incrementation timer
  //       refTimer.current = 0;
  //       refTimer.current = setInterval(
  //         () =>
  //           timerIncrement(playTask[0].elapstedTime, playTask[0].lastUpdate),
  //         1000
  //       );
  //       // Calcul decrementation prod
  //       if (playTask[0].typeTrav !== 'Empty Type') {
  //         const taskRef = allTaskType.filter(
  //           (task) => task.name === playTask[0].typeTrav
  //         );
  //         const prodGoal = taskRef[0].objectif;
  //         let elaps_inc = Math.round(
  //           (Date.parse(new Date()) - Date.parse(playTask[0].lastUpdate)) /
  //             1000 +
  //             playTask[0].elapstedTime
  //         );
  //         refProd.current = 0;
  //         refProd.current = setInterval(() => {
  //           elaps_inc++;
  //           setProductivity((prev) =>
  //             Math.round(
  //               (playTask[0].nbAft / elaps_inc / (prodGoal / 3600)) * 100
  //             )
  //           );
  //         }, 1000);
  //         return () => {
  //           clearInterval(refProd.current);
  //           refProd.current = 0;
  //         };
  //       }
  //       return () => {
  //         clearInterval(refTimer.current);
  //         refTimer.current = 0;
  //       };
  //     }

  //     // if task processing isPause
  //     if (dynamPause.length > 0) {
  //       setDynamicRow((prev) => dynamPause);
  //     }
  //   }
  // }, [dataUnsubmited]);

  // let rows = [];
  // let arrayRows = {};
  // const dinamiqRowsData = {};
  // const staticRowsData = {};

  // if (showDynamicRows === true) {
  //   dinamiqRowsData.id = id;
  //   dinamiqRowsData.typeTrav = taskType;
  //   dinamiqRowsData.numFiche = numFiche;
  //   dinamiqRowsData.statIvpn = statIvpn;
  //   dinamiqRowsData.statusCom = statusCom;
  //   dinamiqRowsData.state = state;
  //   dinamiqRowsData.productivity = productivity.toString().padStart(2, '0');
  //   dinamiqRowsData.cat = cat;
  //   dinamiqRowsData.link = url;
  //   dinamiqRowsData.processing = processing;
  //   if (timePlay > 0) {
  //     const formatDate = dateFormater(elapstedTime);
  //     dinamiqRowsData.elapstedTimeRender = `${formatDate.day}:${formatDate.hours}:${formatDate.min}:${formatDate.sec}`;
  //   }
  //   rows.push(dinamiqRowsData);
  // }

  // if (showStaticRows === true) {
  //   staticRowsData.id = staticId;
  //   rows.push(staticRowsData);
  // }

  // const listRows = list.map((item) => {
  //   // format date before showing in table
  //   const elapstedTaskPlay =
  //     (Date.parse(new Date()) - Date.parse(item.lastUpdate)) / 1000 +
  //     item.elapstedTime;
  //   const elapstedTaskPause = item.elapstedTime;
  //   let formatDate;
  //   if (item.processing === 'isPlay') {
  //     formatDate = dateFormater(elapstedTaskPlay);
  //   }
  //   if (item.processing === 'isPause' || item.processing === 'isOff') {
  //     formatDate = dateFormater(elapstedTaskPause);
  //   }
  //   arrayRows = {
  //     id: item.id,
  //     numFiche: item.numFiche,
  //     typeTrav: item.typeTrav,
  //     cat: item.cat,
  //     statIvpn: item.statuIvpn,
  //     statusCom: item.statuCom,
  //     lastUpdate: item.lastUpdate,
  //     nbBefor: item.nbBefor,
  //     state: item.state,
  //     productivity: item.productivity,
  //     nbAft: item.nbAft,
  //     comment: item.comment,
  //     elapstedTime: item.elapstedTime,
  //     elapstedTimeRender: `${formatDate.day}:${formatDate.hours}:${formatDate.min}:${formatDate.sec}`,
  //     link: item.url != '' ? item.url : 'https://www.google.mg/',
  //     processing: item.processing,
  //   };
  //   rows.push(arrayRows);
  //   return arrayRows;
  // });

  // ---------------------------------------------------------------
  // initialise rows

  const [taskRows, setTaskRows] = useState([]);
  const rows = [];
  // get task with processing isPlay
  const taskProcessIsPlay = loadProcessingPlay();
  const taskProcessIsOff = loadProcessingOff();
  const allTask = loadUnsubmitedTask();

  useEffect(() => {
    if (allTask.length > 0) {
      console.log(allTask);
      setTaskRows((prev) => [...prev, allTask]);
    }
  }, [allTask]);

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
          // rows={rows}
          rows={taskRows[0] !== undefined ? taskRows[0] : []}
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
