import React from 'react';
import { Box } from '@mui/material';

import Contents from './Contents.jsx';
import Navbar from './Components/NavBar.jsx';

import { useAuth0 } from '@auth0/auth0-react';
import { Typography } from '@mui/material';

export default function Page() {
  const { isLoading } = useAuth0();

  return (
    <React.Fragment>
      <Box
        height='100vh'
        sx={{
          background:
            'linear-gradient(55deg, rgba(112,128,144,1) 0%, rgba(192,192,192,1) 36%, rgba(192,192,192,1) 62%, rgba(112,128,144,1) 100%)',
        }}
      >
        {isLoading ? (
          <Typography
            variant='h1'
            sx={{ textAlign: 'center', padding: '45vh 0 ' }}
          >
            Loading...
          </Typography>
        ) : (
          <React.Fragment>
            <Navbar />
            <Contents />
          </React.Fragment>
        )}
      </Box>
    </React.Fragment>
  );
}
