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
  Link,
  Divider,
} from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_FICHE, UPDATE_FICHE } from '../GraphQL/Mutation';

import { useQuery, gql, refetchQueries } from '@apollo/client';
import { LOAD_DATA, FILTRED_FICHE } from '../GraphQL/Queries';

import { GetStartDateTime } from '../Features/time';
import { useAuth0 } from '@auth0/auth0-react';
import {
  loadProcessingPause,
  loadAllData,
  loadProcessingPlay,
  setPrevProcessIsOff,
  updateTaskLastUpdate,
} from './dataHandler';
import { getUtcDateNow } from '../Features/getUtcDateNow';

export default function DialogAddNewTask({ open, onClose }) {
  const [typeTache, setTypeTache] = useState([]);
  const [listStatIvpn, setListStatIvpn] = useState([]);
  const [comboStatCom, setComboStatCom] = useState([]);
  const [listFicheFromData, setListFichesFromData] = useState([]);
  const [idCounter, setIdCounter] = useState([]);
  const [prevProcessId, setPrevProcessId] = useState(0);
  const [currentTask, setCurrentTask] = useState([]);

  const [numFiche, setNumFiche] = useState('');
  const [cat, setCat] = useState('');
  const [statuCom, setStatuCom] = useState(' --- ');
  const [url, setUrl] = useState('');
  const [typeTrav, setTypeTrav] = useState(undefined);
  const [statuIvpn, setStatuIvpn] = useState('');
  const [nbBefor, setNbBefor] = useState(0);
  const [nbAft, setNbAft] = useState(0);
  const [comment, setComment] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  const refNumFiche = useRef(null);
  const refCat = useRef(null);
  const refStatCom = useRef(null);
  const refUrl = useRef(null);
  const refTaskType = useRef(null);
  const refStatuIvpn = useRef(null);
  const refNbBefore = useRef(null);
  const refNbAfter = useRef(null);
  const refComment = useRef(null);

  // get the user
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();

  // execute mutation ficheAdd and refetch query to load changes
  const [fichesAdd, { error: errorCreatFiche }] = useMutation(ADD_FICHE, {
    refetchQueries: [{ query: LOAD_DATA }],
    refetchQueries: [
      FILTRED_FICHE,
      { variables: { input: { submiteState: 'isSubmited' } } },
    ],
    refetchQueries: [
      FILTRED_FICHE,
      { variables: { input: { submiteState: 'isUnsubmited' } } },
    ],
    // ! execut refetch query after executing the mutation ADD_FICHE
    awaitRefetchQueries: true,
  });

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
    awaitRefetchQueries: true,
  });

  const dateNow = getUtcDateNow();

  // Function to add new task in data base
  const addFiche = async () => {
    fichesAdd({
      variables: {
        fiche: {
          user: {
            name: user.name,
            email: user.email,
            given_name: user.given_name,
            username: user.username,
            picture: user.picture,
            family_name: user.family_name,
            locale: user.locale,
            phone_number: user.phone_number,
            profile: user.profile,
          },
          numFiche: refNumFiche.current.children[1].children[0].value,
          cat: refCat.current.children[1].children[0].value,
          typeTrav:
            refTaskType.current.children[0].children[1].children[0].value != ''
              ? refTaskType.current.children[0].children[1].children[0].value
              : 'Empty Type',
          statuCom:
            refStatCom.current.children[0].children[1].children[0].value,
          statuIvpn:
            refStatuIvpn.current.children[0].children[1].children[0].value,
          url: refUrl.current.children[1].children[0].value,
          nbBefor: parseInt(refNbBefore.current.children[1].children[0].value),
          nbAft: parseInt(refNbAfter.current.children[1].children[0].value),
          comment: refComment.current.value,
          startDate: startDate,
          processing: 'isPlay',
          lastUpdate: new Date().toUTCString(),
          productivity: 0,
        },
      },
    });
    if (errorCreatFiche) {
      console.log('errorCreatFiche', errorCreatFiche);
    }
  };

  // fetching data
  const dataPause = loadProcessingPause();
  const dataPlay = loadProcessingPlay();
  const allData = loadAllData();

  useEffect(() => {
    if (allData.length != 0) {
      setTypeTache(allData.listTypeTaches);
      setListStatIvpn(allData.listStatIvpn);
      setComboStatCom(allData.listStatCom);
      setListFichesFromData(allData.listFiches);
      setIdCounter(allData.idCounter);
    }
    if (dataPlay.length > 0) {
      setPrevProcessId(dataPlay[0].id);
    }
    if (dataPause.length > 0) {
      setPrevProcessId(dataPause[0].id);
    }
  }, [allData, dataPlay, dataPause]);

  async function handleSave(e) {
    await setPrevProcessIsOff(prevProcessId, fichesUpdate, erroUpDate)
      .then(updateTaskLastUpdate(prevProcessId, fichesUpdate, erroUpDate))
      .then(addFiche())
      .then((window.location.href = '#/dashboard'));
  }

  const listTaches = typeTache.map((item) => item.name);
  const comboListStatIvpn = listStatIvpn.map((item) => item.name);
  const listStatCom = comboStatCom.map((item) => item.name);

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        PaperProps={{ sx: { height: '80vh' } }}
        fullWidth
      >
        <DialogTitle id='alert-dialog-title'>Add New Task</DialogTitle>
        <Divider />

        <DialogContent>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2,1fr)',
              gap: 1,
            }}
          >
            <Box>
              <TextField
                autoFocus
                margin='dense'
                id='numFiche'
                label='Num fiche'
                type='text'
                variant='standard'
                name='numFiche'
                ref={refNumFiche}
              />
            </Box>

            <Box>
              <TextField
                autoFocus
                id='cat'
                margin='dense'
                type='text'
                label='Category'
                variant='standard'
                ref={refCat}
              />
            </Box>

            <Box sx={{ paddingBottom: 0 }}>
              <Autocomplete
                disablePortal
                options={listStatCom}
                size={'small'}
                id='comboBoxStateCom'
                ref={refStatCom}
                defaultValue='---'
                sx={{ marginTop: 1.5 }}
                PaperComponent={({ children }) => (
                  <Paper sx={{ typography: 'body2' }}>{children}</Paper>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Status Commercial'
                    variant='standard'
                  />
                )}
              />
            </Box>

            <Box>
              <TextField
                autoFocus
                id='url'
                margin='dense'
                type='text'
                label='Url'
                variant='standard'
                ref={refUrl}
              />
            </Box>

            <Box sx={{ paddingBottom: 0 }}>
              <Autocomplete
                disablePortal
                id='comboboxTypeTrav'
                options={listTaches}
                size={'small'}
                ref={refTaskType}
                sx={{ marginTop: 1.5 }}
                PaperComponent={({ children }) => (
                  <Paper sx={{ typography: 'body2' }}>{children}</Paper>
                )}
                renderInput={(params) => (
                  <TextField {...params} label='Work Type' variant='standard' />
                )}
              />
            </Box>

            <Box sx={{ paddingBottom: 0 }}>
              <Autocomplete
                disablePortal
                id='comboBoxStatIvpn'
                options={comboListStatIvpn}
                ref={refStatuIvpn}
                size={'small'}
                sx={{ marginTop: 1.5 }}
                PaperComponent={({ children }) => (
                  <Paper sx={{ typography: 'body2' }}>{children}</Paper>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Status IVPN'
                    variant='standard'
                  />
                )}
              />
            </Box>

            <Box>
              <TextField
                autoFocus
                id='nbBefor'
                margin='dense'
                type='text'
                label='Nb BEFORE'
                variant='standard'
                value={nbBefor}
                ref={refNbBefore}
                onChange={(e) => {
                  e.target.value === ''
                    ? setNbBefor(0)
                    : setNbBefor(parseInt(e.target.value));
                }}
              />
            </Box>

            <Box>
              <TextField
                autoFocus
                id='nbAft'
                margin='dense'
                type='text'
                label='Nb AFTER'
                variant='standard'
                ref={refNbAfter}
                value={nbAft}
                onChange={(e) => {
                  e.target.value === ''
                    ? setNbAft(0)
                    : setNbAft(parseInt(e.target.value));
                }}
              />
            </Box>
          </Box>
          <Box sx={{ marginTop: '1rem' }}>
            <Typography fontFamily='sans-serif' color='GrayText'>
              COMMENT
            </Typography>
            <TextareaAutosize
              id='comment'
              style={{ width: '100%', minHeight: '4rem' }}
              ref={refComment}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            type='submit'
            onClick={(e) => {
              onClose();
              handleSave();
              setStartDate(GetStartDateTime());
            }}
            component={Link}
            // href={`#/dashboard/${currentCounter.id}`}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
