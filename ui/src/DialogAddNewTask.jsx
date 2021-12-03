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

export default function DialogAddNewTask({ open, onClose }) {
  // fetching data from mongodb
  const [typeTache, setTypeTache] = useState([]);
  const [statIvpn, setStatIvpn] = useState([]);
  const [statCom, setStatCom] = useState([]);
  const [value, setValue] = useState('');
  
  const formRef = useRef();

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };
  
  async function handleReset(e){
	  setValue(e.target.value) ;	  
  }
  
  const handleSubmit = (e) => {
	 e.preventDefault();
	console.log(e.target);
	 setValue('');
	 
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
		<form id='formId' action='/' method='POST' onSubmit={handleSubmit} ref={formRef}>
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
                value={value}
                onChange={handleValueChange}
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
                id='combo-box-list-stat-ivpn'
                options={listStatCom}
                size={'small'}
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
                id='combo-box-list-type-taches'
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
                id='combo-box-list-stat-ivpn'
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
                id='nbAfter'
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
          <Button onClick={onClose} type='Submit' autoFocus form='formId'>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
		  <Button onClick={handleReset} type='reset'>Reset</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
