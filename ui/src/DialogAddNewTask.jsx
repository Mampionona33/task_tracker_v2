import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {TextField,Grid} from '@mui/material';
import React,{useState, useEffect} from 'react'

import graphQLFetch from './graphQLFetch.jsx';



export default function DialogAddNewTask({ open, onClose }) {
	
	// fetching data from mongodb
	const [data, setData] = useState([]);
	
	
	async function loadData(){
		
		const queryTypeTrav = `query ListTypeTaches {
								  listTypeTaches {
									name
									id
								  }
								}`;
	  const vars= {};
	  const data = await graphQLFetch(queryTypeTrav, vars)
	};
	
	
	
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {"Add New Task"}
        </DialogTitle>
        <DialogContent>
			<Grid container>
				<Grid item>
				  <TextField
					autoFocus
					margin="dense"
					id="name"
					label="Num fiche"
					type="Text"
					fullWidth
					variant="standard"
				  />
				</Grid>
			</Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Disagree</Button>
          <Button onClick={onClose} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
