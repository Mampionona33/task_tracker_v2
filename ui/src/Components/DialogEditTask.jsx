import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  TextField,
  Autocomplete,
  Box,
  Paper,
  Typography,
  TextareaAutosize,
  Divider,
} from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import {
  fetchListSatusIvpn,
  fetchingStatusCom,
  fetchingListTaskType,
  fetchingListTaskCase,
  updateTaskNumber,
  updateCat,
  updateUrl,
  updateStatCom,
  updateTaskStatuIvpn,
  updateTaskTaskType,
  updateTaskCase,
  updateTaskNumberBefore,
  updateTaskNumberAfter,
  updateElastedTime,
  modifyLastUpdate,
  dateFormater,
  fetchTaskType,
  updateTaskProductivity,
} from './dataHandler';
import { formatTimer } from '../Features/formatNbr';
import { UPDATE_FICHE } from '../GraphQL/Mutation';
import { useMutation, useQuery } from '@apollo/client';
import { LOAD_DATA, FILTRED_FICHE } from '../GraphQL/Queries';

const DialogEditTask = (props) => {
  /* 
    props.open and props.onClose 
    are get from TaskTable.jsx 
  */
  const open = props.open;
  const onClose = props.onClose;
  const selectedRowData = props.selectedRowData;

  // fetching data from database
  const fetchingListStatIvpn = fetchListSatusIvpn();
  const listStatusComs = fetchingStatusCom();
  const listTaskTypes = fetchingListTaskType();
  const listTaskCases = fetchingListTaskCase();
  const allTaskType = fetchTaskType();

  // Get status IVPN from fetchingListStatIvpn
  const listStatIvpn = fetchingListStatIvpn;
  const listTaskType = listTaskTypes.listTypeTaches;
  const listStatCom = listStatusComs.listStatCom;
  const listTaskCase = listTaskCases.listTaskCase;

  const [autoCompletIvpn, setAutocompletIvpn] = useState([]);
  const [autoCompletTypeTask, setAutocompletTypeTask] = useState([]);
  const [autoCompletStatuCom, setAutocompletStatCom] = useState([]);
  const [autoCompletTaskCase, setAutocompletTaskCase] = useState([]);

  // inputs variables
  const [defaultUrl, setDefaultUrl] = useState('');
  const [defaultStatuIvpn, setDefaultStatuIvpn] = useState('');
  const [defaultTaskType, setDefaultTaskType] = useState('');
  const [defaultStatCom, setDefaultStatCom] = useState('');
  const [defaultTaskCase, setDefaultTaskCase] = useState('');

  const [numFiche, setNumFiche] = useState('');
  const [statuCom, setStatuCom] = useState('');
  const [cat, setCat] = useState('');
  const [taskType, setTaskType] = useState('');
  const [statuIvpn, setStatIvpn] = useState('');
  const [taskCase, setTaskCase] = useState('');
  const [numberBefore, setNumberBefore] = useState(0);
  const [numberAfter, setNumberAfter] = useState(0);
  const [comment, setComment] = useState('');
  const [day, setDay] = useState(0);
  const [hrs, setHrs] = useState(0);
  const [minit, setMinit] = useState(0);
  const [sec, setSec] = useState(0);
  const [lastUpdate, setLastUpdate] = useState('');

  const refNumFiche = useRef(null);
  const refStatuCom = useRef(null);
  const refCat = useRef(null);
  const refTaskType = useRef(null);
  const refTaskCase = useRef(null);
  const refStatuIvpn = useRef(null);
  const refNumberBefore = useRef(null);
  const refNumbrAfter = useRef(null);
  const refComment = useRef(null);
  const refDay = useRef(null);
  const refHrs = useRef(null);
  const refMin = useRef(null);
  const refSec = useRef(null);
  const refUrl = useRef(null);

  // function to limit digit in timer
  const timerDigitHandler = (evenT) => {
    // auto format hours input
    if (evenT.target.id == 'hrs') {
      evenT.target.value > 23 || evenT.target.value < 0
        ? setHrs((prev) => parseInt(prev.toString().substring(0, 1)))
        : setHrs((prev) => evenT.target.value);
    }
    // auto format minit
    if (evenT.target.id == 'min') {
      evenT.target.value > 59 || evenT.target.value < 0
        ? setMinit((prev) => parseInt(prev.toString().substring(0, 1)))
        : setMinit((prev) => evenT.target.value);
    }
    // auto format seconds
    if (evenT.target.id == 'sec') {
      evenT.target.value > 59 || evenT.target.value < 0
        ? setSec((prev) => parseInt(prev.toString().substring(0, 1)))
        : setSec((prev) => evenT.target.value);
    }
  };

  // function to auto change value of input on loose focus
  const handleOnblure = (ev) => {
    switch (ev.target.id) {
      case 'day':
        setDay((prev) => formatTimer(prev));
        break;
      case 'hrs':
        setHrs((prev) => formatTimer(prev));
        break;
      case 'min':
        setMinit((prev) => formatTimer(prev));
        break;
      case 'sec':
        setSec((prev) => formatTimer(prev));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (listStatIvpn) {
      setAutocompletIvpn((prev) => listStatIvpn.map((item) => item.name));
    }
    if (listTaskType) {
      setAutocompletTypeTask((prev) => listTaskType.map((item) => item.name));
    }
    if (listStatCom) {
      setAutocompletStatCom((prev) => listStatCom.map((item) => item.name));
    }
    if (listTaskCase) {
      setAutocompletTaskCase((prev) => listTaskCase.map((item) => item.state));
    }

    // if data from selected row is ready
    if (selectedRowData) {
      setLastUpdate((prev) => selectedRowData.lastUpdate);
      setNumFiche((prev) => selectedRowData.numFiche);
      setDefaultTaskType((prev) => selectedRowData.typeTrav);
      setDefaultStatCom((prev) => selectedRowData.statuCom);
      setDefaultUrl((prev) => selectedRowData.url);
      setCat((prev) => selectedRowData.cat);
      setDefaultStatuIvpn((prev) => selectedRowData.statuIvpn);
      setDefaultTaskCase((prev) => selectedRowData.state);
      setNumberBefore((prev) => selectedRowData.nbBefor);
      setNumberAfter((prev) => selectedRowData.nbAft);
      setComment((prev) => selectedRowData.comment);
      const elapsFormated = dateFormater(selectedRowData.elapstedTime);
      setDay((prev) => elapsFormated.day);
      setHrs((prev) => elapsFormated.hours);
      setMinit((prev) => elapsFormated.min);
      setSec((prev) => elapsFormated.sec);
    }
  }, [
    listStatIvpn,
    listTaskTypes,
    listStatCom,
    listTaskCase,
    selectedRowData,
    allTaskType,
  ]);

  // function to execute to make data update
  const [fichesUpdate, { error: erroUpDate }] = useMutation(UPDATE_FICHE, {
    refetchQueries: () => [
      FILTRED_FICHE,
      { variables: { input: { submiteState: 'isSubmited' } } },
    ],
    awaitRefetchQueries: true,
  });

  // fucntion to calculate productivity
  const calculProd = (taskGoal, elapstedTime, numberAfter) => {
    const goalPerHours = taskGoal / 3600;
    const actualProd = numberAfter / elapstedTime;
    const prod = Math.round((actualProd / goalPerHours) * 100);
    return prod;
  };

  // function to execute on click in save button
  const handleClickSave = async () => {
    const elapstedTime =
      parseInt(refDay.current.children[1].children[0].value) * 86400 +
      parseInt(refHrs.current.children[1].children[0].value) * 3600 +
      parseInt(refMin.current.children[1].children[0].value) * 60 +
      parseInt(refSec.current.children[1].children[0].value);

    // compare current task to the task from database before getting productivity
    let taskRef = [];
    let taskRefGoal = 0;
    if (allTaskType) {
      taskRef = allTaskType.filter(
        (task) =>
          task.name ===
          refTaskType.current.children[0].children[1].children[0].value
      );
      taskRefGoal = taskRef[0].objectif;
    }

    const prodToData = calculProd(
      taskRefGoal,
      elapstedTime,
      refNumbrAfter.current.children[1].children[0].value
    );

    // lines below are commented to isolate the calculation of productivity
    await updateTaskNumber(
      selectedRowData.id,
      fichesUpdate,
      erroUpDate,
      refNumFiche.current.children[1].children[0].value
    )
      .then(
        updateCat(
          selectedRowData.id,
          fichesUpdate,
          erroUpDate,
          refCat.current.children[1].children[0].value
        )
      )
      .then(
        updateElastedTime(
          selectedRowData.id,
          elapstedTime,
          fichesUpdate,
          erroUpDate
        )
      )
      .then(
        updateUrl(
          selectedRowData.id,
          fichesUpdate,
          erroUpDate,
          refUrl.current.children[1].children[0].value
        )
      )
      .then(
        updateTaskNumberBefore(
          selectedRowData.id,
          fichesUpdate,
          erroUpDate,
          refNumberBefore.current.children[1].children[0].value
        )
      )
      .then(
        updateTaskNumberAfter(
          selectedRowData.id,
          fichesUpdate,
          erroUpDate,
          refNumbrAfter.current.children[1].children[0].value
        )
      )
      .then(
        updateTaskCase(
          selectedRowData.id,
          fichesUpdate,
          erroUpDate,
          refTaskCase.current.children[0].children[1].children[0].value
        )
      )
      .then(
        updateTaskTaskType(
          selectedRowData.id,
          fichesUpdate,
          erroUpDate,
          refTaskType.current.children[0].children[1].children[0].value
        )
      )
      .then(
        updateTaskStatuIvpn(
          selectedRowData.id,
          fichesUpdate,
          erroUpDate,
          refStatuIvpn.current.children[0].children[1].children[0].value
        )
      )
      .then(
        updateStatCom(
          selectedRowData.id,
          fichesUpdate,
          erroUpDate,
          refStatuCom.current.children[0].children[1].children[0].value
        )
      )
      .then(
        updateTaskProductivity(
          selectedRowData.id,
          fichesUpdate,
          erroUpDate,
          prodToData
        )
      )
      .then(onClose);
  };

  // input styles
  const textFieldInputStyle = {
    padding: 7,
    fontSize: '1rem',
    height: 15,
  };
  const TimerTextFieldeStyle = {
    padding: 7,
    fontSize: '1rem',
    width: 40,
    height: 15,
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='alert-dialog-edit-task'
      aria-describedby='alert-dialog-describ-edit-task'
      fullWidth
    >
      <DialogTitle id='alert-dialog-edit-task'>Edit task</DialogTitle>
      <Divider />
      <DialogContent>
        <Box
          rowGap={1}
          columnGap={2}
          marginBottom='1rem'
          sx={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)' }}
        >
          <Box>
            <TextField
              id='numFiche'
              variant='standard'
              label='numFiche'
              fullWidth
              ref={refNumFiche}
              inputProps={{ style: textFieldInputStyle }}
              value={numFiche}
              onChange={(e) => setNumFiche(e.target.value)}
            />
          </Box>

          <Box>
            <TextField
              id='cat'
              variant='standard'
              label='Categorie'
              fullWidth
              ref={refCat}
              value={cat}
              onChange={(e) => setCat(e.target.value)}
            />
          </Box>

          <Box>
            <TextField
              id='url'
              variant='standard'
              label='url'
              ref={refUrl}
              value={defaultUrl}
              onChange={(e) => setDefaultUrl(e.target.value)}
            />
          </Box>

          <Box>
            <Autocomplete
              disablePortal
              id='comboBoxStateCom'
              size='small'
              ref={refStatuCom}
              defaultValue={defaultStatCom}
              options={autoCompletStatuCom}
              onChange={(e) => setStatuCom(e.target.innerText)}
              PaperComponent={({ children }) => (
                <Paper sx={{ typography: 'body2' }}>{children}</Paper>
              )}
              renderInput={(params) => (
                <TextField {...params} label='Commercial Status' fullWidth />
              )}
            />
          </Box>

          <Box>
            <Autocomplete
              disablePortal
              id='comboBoxStatIvpn'
              size='small'
              ref={refStatuIvpn}
              defaultValue={defaultStatuIvpn}
              options={autoCompletIvpn}
              onChange={(e) => {
                setStatIvpn(e.target.innerText);
              }}
              PaperComponent={({ children }) => (
                <Paper sx={{ typography: 'body2' }}>{children}</Paper>
              )}
              renderInput={(params) => (
                <TextField {...params} label='IVPN Status' fullWidth />
              )}
            />
          </Box>

          <Box>
            <Autocomplete
              disablePortal
              id='typeTask'
              size='small'
              ref={refTaskType}
              options={autoCompletTypeTask}
              defaultValue={defaultTaskType}
              onChange={(e) => {
                setTaskType((prev) => e.target.innerText);
              }}
              PaperComponent={({ children }) => (
                <Paper sx={{ typography: 'body2' }}>{children}</Paper>
              )}
              renderInput={(params) => (
                <TextField {...params} label='Task Type' />
              )}
            />
          </Box>

          <Box>
            <Autocomplete
              disablePortal
              id='taskCase'
              size='small'
              ref={refTaskCase}
              defaultValue={defaultTaskCase}
              options={autoCompletTaskCase}
              onChange={(e) => {
                setTaskCase((perv) => e.target.innerText);
              }}
              PaperComponent={({ children }) => (
                <Paper sx={{ typography: 'body2' }}>{children}</Paper>
              )}
              renderInput={(params) => (
                <TextField {...params} label='Task Case' />
              )}
            />
          </Box>

          <Box display='flex' justifyContent='space-between' columnGap={1}>
            <Box display='flex' flexDirection='column-reverse'>
              <Typography
                sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '0.9rem' }}
              >
                Elaptsed Time
              </Typography>
            </Box>
            <Box display='flex' columnGap={1}>
              <TextField
                id='day'
                ref={refDay}
                variant='standard'
                label='Day'
                type='number'
                inputProps={{
                  style: TimerTextFieldeStyle,
                  min: '0',
                  max: '365',
                }}
                onBlur={handleOnblure}
                value={day}
                onChange={(e) => setDay((prev) => e.target.value)}
              />
              <TextField
                id='hrs'
                ref={refHrs}
                variant='standard'
                label='Hrs'
                type='number'
                inputProps={{
                  style: TimerTextFieldeStyle,
                  min: '0',
                  max: '23',
                }}
                onBlur={handleOnblure}
                value={hrs}
                onChange={timerDigitHandler}
              />
              <TextField
                type='number'
                id='min'
                ref={refMin}
                variant='standard'
                label='min'
                inputProps={{
                  style: TimerTextFieldeStyle,
                  min: '0',
                  max: '23',
                }}
                onBlur={handleOnblure}
                value={minit}
                onChange={timerDigitHandler}
              />
              <TextField
                type='number'
                id='sec'
                variant='standard'
                label='sec'
                ref={refSec}
                inputProps={{
                  style: TimerTextFieldeStyle,
                  min: '0',
                  max: '23',
                }}
                onBlur={handleOnblure}
                value={sec}
                onChange={timerDigitHandler}
              />
            </Box>
          </Box>

          <Box>
            <TextField
              id='nbBefor'
              variant='standard'
              label='Numer Prod Before'
              fullWidth
              ref={refNumberBefore}
              value={numberBefore}
              onChange={(e) => setNumberBefore(e.target.value)}
            />
          </Box>

          <Box>
            <TextField
              id='nbAft'
              variant='standard'
              label='Numer Prod After'
              fullWidth
              ref={refNumbrAfter}
              value={numberAfter}
              onChange={(e) => setNumberAfter(e.target.value)}
            />
          </Box>
        </Box>
        <Divider />
        <Box>
          <Typography
            fontFamily='sans-serif'
            color='GrayText'
            ref={refComment}
            sx={{ margin: '0.5rem' }}
          >
            COMMENT
          </Typography>
          <TextareaAutosize
            id='comment'
            value={comment}
            onChange={(e) => setComment((prev) => e.target.value)}
            style={{ width: '100%', minHeight: '4rem' }}
          />
        </Box>
      </DialogContent>
      {/* Button */}
      <DialogActions>
        <Button variant='outlined' onClick={handleClickSave}>
          Save
        </Button>
        <Button variant='outlined' onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DialogEditTask;
