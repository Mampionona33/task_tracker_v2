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
import { styled, withStyles } from '@mui/material/styles';
import { Button } from '@mui/material';

// import components
import DrawerListItem from './DrawerListItem.jsx';
import DialogAddNewTask from './DialogAddNewTask.jsx';

export default function Navbar() {
  // Gestion d'affichage de Drawer
  const [isOpen, setIsOpen] = useState(false);
  const [dialOpen, setDialIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setIsOpen(open);
  };

  const handleClickOpenDialAddNewTask = () => {
    setDialIsOpen(true);
  };
  const handleClickCloseDialAddNewTask = () => {
    setDialIsOpen(false);
  };

  // creat custom drawer with custom paper
  const CustomDrawer = styled(Drawer)(({ theme }) => ({
    '& > .MuiDrawer-paper ': {
      backgroundColor: theme.palette.primary.main,
    },
  }));

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
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                Task Tracker
              </Typography>
              <Button
                variant='outlined'
                sx={{
                  color: 'inherit',
                  backgroundColor: 'primary.dark',
                }}
                onClick={handleClickOpenDialAddNewTask}
              >
                Add New Task
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </React.Fragment>
      {/* Drawer */}
      <React.Fragment>
        <Box>
          <CustomDrawer open={isOpen} onClose={toggleDrawer(false)}>
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
          </CustomDrawer>
        </Box>
      </React.Fragment>
      <React.Fragment>
        <DialogAddNewTask open={dialOpen} onClose={handleClickCloseDialAddNewTask} />
      </React.Fragment>
    </React.Fragment>
  );
}
