import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useState } from 'react';
// import { makeStyles } from '@mui/styles';

// import components
import DrawerListItem from './DrawerListItem.jsx';

export default function Navbar() {
  /* // creation style for material ui  components
  const useStyles = makeStyles({
    drawer: {
      color: '#fff',
      backgroundColor: '#1976d2 !important',
    },
  });
  const classes = useStyles(); */

  // Gestion d'affichage de Drawer
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <React.Fragment>
      {/* Navbar */}
      <React.Fragment>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position='static'>
            <Toolbar variant='dense'>
              <IconButton
                edge='start'
                color='inherit'
                aria-label='menu'
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant='h6' color='inherit' component='div'>
                Task Tracker
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      </React.Fragment>
      {/* Drawer */}
      <React.Fragment>
        <Box>
          <Drawer
            // Style={paper:'backgroundColor':'#1976d2 !important'}
            open={isOpen}
            onClose={toggleDrawer(false)}
          >
            <List>
              <DrawerListItem
                drawerOpen={(state) => setIsOpen(state)}
                icon={<DashboardIcon />}
                itemText='Dashboard'
                href='#/dashboard'
              />
              <DrawerListItem
                drawerOpen={(state) => setIsOpen(state)}
                icon={<DashboardIcon />}
                itemText='Task list'
                href='#/tasklist'
              />
            </List>
          </Drawer>
        </Box>
      </React.Fragment>
    </React.Fragment>
  );
}
