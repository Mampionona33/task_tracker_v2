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
  FormControl,
} from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';

import loadData from './loadData.jsx';
import graphQLFetch from './graphQLFetch.jsx';
import { useMutation } from '@apollo/client';
import { ADD_FICHE } from './GraphQL/Mutation';

export default function DialogAddNewTask({ open, onClose }) {
  // fetching data from mongodb
  const [typeTache, setTypeTache] = useState([]);
  const [statIvpn, setStatIvpn] = useState([]);
  const [statCom, setStatCom] = useState([]);
  const [value, setValue] = useState('');
  const [userForm, setUserForm] = useState({
    numFiche: '',
    cat: '',
    statCom: '',
    url: '',
    typeTrav: '',
    statIvpn: '',
    nbBefore: '',
    nbAft: '',
  });

  const [fichesAdd, { error }] = useMutation(ADD_FICHE);
  const addFiche = () => {
    fichesAdd({
      variables: {},
    });
    if (error) {
      console.log(error);
    }
  };

  const formRef = useRef();

  const handleValueChange = (e) => {
    e.preventDefault();
    const idElement = e.target.id;
    idElement === 'numFiche' ? setUserForm({ numFiche: e.target.value }) : '';
  };

  async function handleReset(e) {
    const form = document.forms.addNew;
    setValue(form);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.forms.addNew;
    const fiche = {
      numFiche: form.numFiche.value,
      cat: form.cat.value,
      statuCom: form.comboBoxStateCom.value,
      url: form.url.value,
      typeTrav: form.comboboxTypeTrav.value,
      statuIvpn: form.comboBoxStatIvpn.value,
      nbBefor: form.nbBefore.value === '' ? 0 : form.nbBefore.value.parseFloat,
      nbAft: form.nbAft.value === '' ? 0 : form.nbAft.value.parseFloat,
      comment: form.comment.value,
    };
    console.log(fiche);
    setUserForm(fiche);
    console.log(userForm);
    // createFiche(fiche);
  };

  const createFiche = async (fiche) => {
    const query = `mutation FichesAdd($fiche: FichesInputs!) {
	  fichesAdd(fiche: $fiche) {
		typeTrav
		cat
		numFiche
		statuCom
		statuIvpn
		url
		state
		submiteState
		nbBefor
		nbAft
	  }
	}`;
    const data = await graphQLFetch(query, { fiche });
    data ? console.log(data) : '';
  };

  useEffect(() => {
    loadData(setTypeTache, 'listTypeTaches');
    loadData(setStatIvpn, 'listStatIvpn');
    loadData(setStatCom, 'listStatCom');
  }, []);

  const listTaches = typeTache.map((item) => item.name);
  const listStatIvpn = statIvpn.map((item) => item.name);
  const listStatCom = statCom.map((item) => item.name);

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
          <form
            id='formId'
            name='addNew'
            action='/'
            method='POST'
            onSubmit={handleSubmit}
            ref={formRef}
          >
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
                />
              </Box>

              <Box sx={{ paddingBottom: 0 }}>
                <Autocomplete
                  disablePortal
                  options={listStatCom}
                  size={'small'}
                  id='comboBoxStateCom'
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
                />
              </Box>

              <Box sx={{ paddingBottom: 0 }}>
                <Autocomplete
                  disablePortal
                  id='comboboxTypeTrav'
                  options={listTaches}
                  size={'small'}
                  sx={{ marginTop: 1.5 }}
                  PaperComponent={({ children }) => (
                    <Paper sx={{ typography: 'body2' }}>{children}</Paper>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Type de Travail'
                      variant='standard'
                    />
                  )}
                />
              </Box>

              <Box sx={{ paddingBottom: 0 }}>
                <Autocomplete
                  disablePortal
                  id='comboBoxStatIvpn'
                  defaultValue='N'
                  options={listStatIvpn}
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
                  id='nbBefore'
                  margin='dense'
                  type='text'
                  label='Nb BEFORE'
                  variant='standard'
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
              />
            </Box>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={addFiche} autoFocus form='formId'>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
          <Button type='Reset' form='formId'>
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
