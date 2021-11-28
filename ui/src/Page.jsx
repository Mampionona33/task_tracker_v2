import React from 'react';
import { Box } from '@mui/material';

import Contents from './Contents.jsx';
import Navbar from './navigation/NavBar.jsx';

export default function Page() {
  return (
    <React.Fragment>
		<Box sx={{background:'linear-gradient(to bottom right, #01C1FD, #0F9774)' , height:'100vh'}}>
			<Navbar />
			<Contents />
		</Box>
    </React.Fragment>
  );
}
