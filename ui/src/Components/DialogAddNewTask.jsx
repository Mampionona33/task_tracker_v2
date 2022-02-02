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
} from '@mui/material';
import React, { useState, useEffect } from 'react';

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
  modifyLastUpdate,
} from './dataHandler';
import {
    getUtcDateNow
    }
from '../Features/getUtcDateNow';

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
  const [processing, setProcessing] = useState('isPlay');
  // const [lastUpdate, setLastUpdate] = useState([]);

  // get the user
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();  

  // execute mutation ficheAdd and refetch query to load changes
  const [fichesAdd, { error: errorCreatFiche }] = useMutation(ADD_FICHE, {
    refetchQueries: [{ query: LOAD_DATA }],
    refetchQueries: [
      FILTRED_FICHE,
      { variables: { input: { submiteState: 'isUnsubmited' } } },
    ],
    refetchQueries: [
      FILTRED_FICHE,
      { variables: { input: { submiteState: 'isSubmited' } } },
    ],
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
          numFiche: numFiche,
          cat: cat,
          typeTrav: typeTrav,
          statuCom: statuCom,
          statuIvpn: statuIvpn,
          url: url,
          nbBefor: nbBefor,
          nbAft: nbAft,
          comment: comment,
          startDate: startDate,
          processing: processing,
          lastUpdate: new Date().toUTCString(),
        },
      },
    });
    if (errorCreatFiche) {
      console.log(errorCreatFiche);
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
  }, [allData, dataPlay, dataPause, currentTask]);

  async function handleReset(e) {
    await setPrevProcessIsOff(prevProcessId, fichesUpdate, erroUpDate)
      .then(modifyLastUpdate(prevProcessId, fichesUpdate, erroUpDate))
      .then(addFiche())
      .then(
        setNumFiche(''),
        setCat(''),
        setStatuCom(''),
        setUrl(''),
        setTypeTrav(undefined),
        setNbBefor(0),
        setNbAft(0),
        setComment('')
      );
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
        <DialogTitle id='alert-dialog-title'>{'Add New Task'}</DialogTitle>

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
                value={numFiche}
                onChange={(e) => setNumFiche(e.target.value)}
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
                value={cat}
                onChange={(e) => setCat(e.target.value)}
              />
            </Box>

            <Box sx={{ paddingBottom: 0 }}>
              <Autocomplete
                disablePortal
                options={listStatCom}
                size={'small'}
                id='comboBoxStateCom'
                defaultValue='---'
                onChange={(e) => setStatuCom(e.target.innerText)}
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
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Box>

            <Box sx={{ paddingBottom: 0 }}>
              <Autocomplete
                disablePortal
                id='comboboxTypeTrav'
                options={listTaches}
                size={'small'}
                sx={{ marginTop: 1.5 }}
                onChange={(e) => setTypeTrav(e.target.innerText)}
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
                size={'small'}
                sx={{ marginTop: 1.5 }}
                onChange={(e) => setStatuIvpn(e.target.innerText)}
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
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={(e) => {
              onClose();
              handleReset();
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
