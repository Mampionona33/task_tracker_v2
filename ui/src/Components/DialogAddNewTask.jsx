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
} from '@mui/material';
import React, { useState, useEffect } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_FICHE, UPDATE_FICHE } from '../GraphQL/Mutation';

import { useQuery, gql, refetchQueries } from '@apollo/client';
import { LOAD_DATA } from '../GraphQL/Queries';

import { GetStartDateTime } from '../Features/time';

export default function DialogAddNewTask({ open, onClose }) {
  const [typeTache, setTypeTache] = useState([]);
  const [listStatIvpn, setListStatIvpn] = useState([]);
  const [comboStatCom, setComboStatCom] = useState([]);
  const [listFicheFromData, setListFichesFromData] = useState([]);

  const [numFiche, setNumFiche] = useState('');
  const [cat, setCat] = useState('');
  const [statuCom, setStatuCom] = useState(' --- ');
  const [url, setUrl] = useState('');
  const [typeTrav, setTypeTrav] = useState('Empty Type');
  const [statuIvpn, setStatuIvpn] = useState('');
  const [nbBefor, setNbBefor] = useState(0);
  const [nbAft, setNbAft] = useState(0);
  const [comment, setComment] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [processing, setProcessing] = useState(true);

  // execute a mutation ADD_FICHE then refetch Queries
  const [fichesAdd, { error: errorCreatFiche }] = useMutation(ADD_FICHE, {
    refetchQueries: [LOAD_DATA],
  });

  // function to execute mutation AddFiche when button save clicked
  const addFiche = () => {
    fichesAdd({
      variables: {
        fiche: {
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
        },
      },
    });
    if (errorCreatFiche) {
      console.log(errorCreatFiche);
    }
  };

  // Make a query to load data from mongodb
  const { data, loading, error: errorLoadData } = useQuery(LOAD_DATA);
  // take the current task in process with processing status true
  const currentProcessing = listFicheFromData.filter(
    (fiche) => fiche.processing === true
  );

  // get the id of the current task in process
  const idCurrent = currentProcessing.map((fiche) => fiche.id);
  const idCurrentNumb = idCurrent[0];
  console.log(idCurrentNumb);
  // execut a mutation to update the current task with processing status true to false
  const [FichesUpdate, { error: errorUpdateCurrentProcessingState }] =
    useMutation(UPDATE_FICHE, {
      refetchQueries: [LOAD_DATA],
    });

  // function to execute inside mutation FichesUpdate to set processing false for the current processing.
  const setCurrentProcessingFalse = async () => {
    // waiting until current task processing set false before add new
    await addFiche();
    FichesUpdate({
      variables: {
        filter: {
          id: idCurrentNumb,
        },
        update: {
          processing: false,
        },
      },
    });
    if (errorUpdateCurrentProcessingState) {
      console.log(errorUpdateCurrentProcessingState);
    }
  };

  useEffect(() => {
    if (data) {
      setTypeTache(data.listTypeTaches);
      setListStatIvpn(data.listStatIvpn);
      setComboStatCom(data.listStatCom);
      setListFichesFromData(data.listFiches);
    }
  }, [data]);

  async function handleReset(e) {
    await setCurrentProcessingFalse();
    setNumFiche('');
    setCat('');
    setStatuCom('');
    setUrl('');
    setTypeTrav('Empty Type');
    setNbBefor(0);
    setNbAft(0);
    setComment('');
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
                defaultValue='Contenu'
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
                defaultValue='N'
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
              setStartDate(GetStartDateTime());
              onClose();
              handleReset();
            }}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
