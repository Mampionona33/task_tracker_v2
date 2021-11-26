import React from 'react';
import { Paper, Box, Card, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';

export default function SubmitTask(prop) {
  const data = prop.data;  
  
  const submitedFiche = data.filter(item => item.submiteState === true);
  const nbrCreaPrio =  submitedFiche.filter(fiche => ( fiche.typeTrav === 'CréaPrio')).length;
  const nbrMajPrio  =  submitedFiche.filter(fiche => ( fiche.typeTrav === 'MAJPrio')).length;
  
  const formateDec = (input)=>{
	  if(input < 10){
		  return (`0${input}`);
	  }
  }
  
  
  const TypeTrav = (prop) => {	  
	  const type = prop.type;
	  const nbr  = prop.nbr;
	  
	  return(
		<ListItem>
			<ListItemText primary={
				<Typography> {type} : {formateDec(nbr)}  </Typography>
			} />
		</ListItem>
	  )
  }
  
  
  return (
    <React.Fragment>
      <Card sx={{ maxWidth:'30vw' }}>
        <Typography variant='h6'>Total submited booth : {formateDec(submitedFiche.length)} </Typography>
        <Divider />
			<List>
				<TypeTrav type='CréaPrio' nbr={nbrCreaPrio} />	
				<TypeTrav type='MAJPrio' nbr={nbrMajPrio} />			
			</List>
      </Card>
    </React.Fragment>
  );
}
