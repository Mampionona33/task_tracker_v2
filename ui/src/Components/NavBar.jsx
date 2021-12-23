import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Tooltip from '@mui/material/Tooltip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CachedIcon from '@mui/icons-material/Cached';
import { useState } from 'react';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { styled, withStyles } from '@mui/material/styles';
import { Button, Avatar, keyframes } from '@mui/material';

// import components
import DrawerListItem from './DrawerListItem.jsx';
import DialogAddNewTask from './DialogAddNewTask.jsx';
import { useAuth0 } from '@auth0/auth0-react';

export default function Navbar() {
  // animation key for loading icons
  const rotateIcon = keyframes`
  100%{transform: rotate(360deg)}
`;
  // get the loged user
  const { logout, user, isLoading } = useAuth0();

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

  const handelClickLoghout = () => {
    console.log('logout');
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
                  marginRight: '1rem',
                  color: 'inherit',
                  backgroundColor: 'primary.dark',
                }}
                onClick={handleClickOpenDialAddNewTask}
              >
                <AddIcon />
                Add New Task
              </Button>
              <React.Fragment>
                {!isLoading && !user && (
                  <Box
                    display='flex'
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                    columnGap='5px'
                  >
                    <CachedIcon
                      sx={{
                        animation: `${rotateIcon} 1s linear infinite`,
                      }}
                    />
                  </Box>
                )}
                {!isLoading && user && (
                  <Box
                    display='flex'
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                    columnGap='5px'
                  >
                    <Tooltip title='Log Out' arrow>
                      <Button
                        variant='outlined'
                        sx={{
                          color: 'inherit',
                          backgroundColor: 'primary.dark',
                        }}
                        onClick={() => logout()}
                      >
                        <Box
                          display='flex'
                          justifyContent='space-between'
                          columnGap='0.5rem'
                        >
                          <Avatar
                            alt={user.name}
                            src={user.picture}
                            sx={{ width: 25, height: 25 }}
                          />
                          {user.given_name}
                          <PowerSettingsNewIcon />
                        </Box>
                      </Button>
                    </Tooltip>
                  </Box>
                )}
              </React.Fragment>
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
        <DialogAddNewTask
          open={dialOpen}
          onClose={handleClickCloseDialAddNewTask}
        />
      </React.Fragment>
    </React.Fragment>
  );
}
