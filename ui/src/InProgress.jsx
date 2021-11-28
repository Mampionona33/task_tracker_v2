import React from 'react'; 
import { Paper, Box, Card, Typography, Divider, List, ListItem, ListItemText , Grid} from '@mui/material';


export default function InProgress(prop){
	const data = prop.data;
	
	const inProgress = data.filter(fiche => fiche.submiteState === false);
	console.log(inProgress);
	
	 const formatNbr = (input)=>{
	  if(input < 10){
		  return (`0${input}`);
	  }
	 }		 
	
	return(
		<React.Fragment>
			<Grid item>
				<Card elevation={3}>
					<Box sx={{backgroundColor:'#228B22', color:'secondary.contrastText', padding:'0.5em'}}>
						<Typography variant='h6'  > Tasks in Progress : {formatNbr(inProgress.length)} </Typography>
					</Box>
				</Card>
			</Grid>
		</React.Fragment>
	)
}