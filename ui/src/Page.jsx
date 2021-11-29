import React from 'react';
import { Box } from '@mui/material';

import Contents from './Contents.jsx';
import Navbar from './navigation/NavBar.jsx';

export default function Page() {
  return (
    <React.Fragment>
      <Box
        sx={{
          background:
            'linear-gradient(55deg, rgba(112,128,144,1) 0%, rgba(192,192,192,1) 36%, rgba(192,192,192,1) 62%, rgba(112,128,144,1) 100%)',
          height: '100vh',
        }}
      >
        <Navbar />
        <Contents />
      </Box>
    </React.Fragment>
  );
}
