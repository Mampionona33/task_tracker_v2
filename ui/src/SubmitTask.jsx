import React from 'react';
import { Paper, Box, Card, Typography, Divider, List, ListItem, ListItemText, Grid } from '@mui/material';
import { styled, withStyles } from '@mui/material/styles';

export default function SubmitTask(prop) {
  const data = prop.data;  
  
  const submitedFiche = data.filter(item => item.submiteState === true);
  
  const creaPrio =  submitedFiche.filter(fiche => ( fiche.typeTrav === 'CréaPrio'));
  const majPrio  =  submitedFiche.filter(fiche => ( fiche.typeTrav === 'MAJPrio'));
  const  contenu =  submitedFiche.filter(fiche => ( fiche.typeTrav === 'Contenu'));
 
  
  const trav = submitedFiche.map(fiche => fiche.typeTrav);
  
  const removDuplicate = (array) => {
	  let a =[];
	  array.map(x => {
		  if(!a.includes(x)){
			  a.push(x)
		  }
	  });
	  return a;
  }; 
  
  
  const formatNbr = (input)=>{
	  if(input < 10){
		  return (`0${input}`);
	  }
  } 
  
  
  const typeTravUnique = removDuplicate(trav);     
    
  
  const ListTrav = (prop) => typeTravUnique.map((type,index) => {
	  let nbr = 0;
	  if(type === 'CréaPrio'){
		  nbr = formatNbr(creaPrio.length);
	  }
	  if(type === 'MAJPrio'){
		  nbr = formatNbr(majPrio.length);
	  }if(type === 'Contenu'){
		  nbr = formatNbr(contenu.length);
	  }
	  return(
		<ListItem key={index}>
			<ListItemText primary={
				<Typography> {type} : {nbr} </Typography>
			} />
		</ListItem>
	  )
  })
  
  
  return (
    <React.Fragment>
		<Grid item>
		  <Card sx={{ maxWidth:'30vw'}} elevation={3}>
			  <Box sx={{backgroundColor:'secondary.main', color:'secondary.contrastText', padding:'0.5em'}}>
				<Typography variant='h6'  >Total submited booth : {formatNbr(submitedFiche.length)} </Typography>
			  </Box>
				<Divider />
				<List>
					<ListTrav/>
				</List>
		  </Card>
		</Grid>
    </React.Fragment>
  );
}
