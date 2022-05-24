import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Tooltip from '@mui/material/Tooltip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { styled, withStyles } from '@mui/material/styles';
import { Button, Avatar, keyframes } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { useLocation } from 'react-router-dom';
import { Paper } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import {
  setPrevProcessIsOff,
  userLoggedTasks,
  updateElastedTime,
} from './dataHandler';

// import components
import DrawerListItem from './DrawerListItem.jsx';
import DialogAddNewTask from './DialogAddNewTask.jsx';
import { useAuth0 } from '@auth0/auth0-react';
import { UPDATE_FICHE } from '../GraphQL/Mutation';
import { LOAD_DATA, FILTRED_FICHE } from '../GraphQL/Queries';
import { useMutation } from '@apollo/client';

export default function Navbar() {
  // animation key for loading icons
  const rotateIcon = keyframes`
  100%{transform: rotate(360deg)}
`;

  // get the loged user
  const { logout, user, isLoading, getIdTokenClaims } = useAuth0();

  // get user role google auth
  const claim = getIdTokenClaims();
  const [userRole, setUserRole] = useState('');
  useEffect(() => {
    if (claim != undefined) {
      claim.then((result) => {
        // console.log(result['http://localhost:8000//roles'][0]);
        setUserRole((prev) => result['http://localhost:8000//roles'][0]);
      });
    }
  }, [claim]);

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

  const [prevProcessId, setPrevProcessId] = useState(0);
  const [elapstedTime, setElapstedTime] = useState(0);
  const [lastUpdate, setLastUpdate] = useState([]);

  // fetching data
  const userData = userLoggedTasks();
  const taskPlay = userData.filter((task) => task.processing === 'isPlay');
  const taskPause = userData.filter((task) => task.processing === 'isPause');

  // get current url
  const location = useLocation();
  const [windTitle, setWindTitle] = useState('');

  useEffect(() => {
    if (userData.length > 0) {
      if (taskPlay.length > 0) {
        setPrevProcessId((prev) => taskPlay[0].id);
        setElapstedTime((prev) => taskPlay[0].elapstedTime);
        setLastUpdate((prev) => taskPlay[0].lastUpdate);
      }
      if (taskPause.length > 0) {
        setPrevProcessId((prev) => taskPause[0].id);
        setElapstedTime((prev) => taskPause[0].elapstedTime);
        setLastUpdate((prev) => taskPause[0].lastUpdate);
      }
    }

    // listen to the location change to set windows title
    if (location.pathname.includes('tasklist')) {
      setWindTitle((prev) => 'Task List');
    } else if (location.pathname.includes('dashboard')) {
      setWindTitle((prev) => 'Dashboard');
    } else if (location.pathname.includes('submitedList')) {
      setWindTitle((prev) => 'Submited Task List');
    } else if (location.pathname.includes('settings')) {
      setWindTitle((prev) => 'Settings');
    } else {
      setWindTitle((prev) => '');
    }
  }, [userData, location]);

  // execute mutation fichesUpdate with useMutation
  const [fichesUpdate, { error: erroUpDate }] = useMutation(UPDATE_FICHE, {
    refetchQueries: [LOAD_DATA],
    awaitRefetchQueries: true,
  });

  const handelClickLoghout = async () => {
    const elapstedTimeToData = Math.round(
      (Date.parse(new Date()) - Date.parse(lastUpdate)) / 1000 + elapstedTime
    );
    const prevProcessIsOff = await setPrevProcessIsOff(
      prevProcessId,
      fichesUpdate,
      erroUpDate
    );
    if (prevProcessIsOff) {
      updateElastedTime(
        prevProcessId,
        elapstedTimeToData,
        fichesUpdate,
        erroUpDate
      )
        .then(
          console.log(
            'prevProcessId',
            prevProcessId,
            ' / ',
            'elapstedTimeToData: ',
            elapstedTimeToData
          )
        )
        .then(logout());
    }
    if (prevProcessId === 0) {
      logout();
    }
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
              <Box
                display={'flex'}
                justifyContent={'flex-start'}
                sx={{ flexGrow: 1 }}
              >
                <Paper sx={{ textAlign: 'center', padding: '0 1rem 0 1rem ' }}>
                  <Typography variant='h5'>{windTitle}</Typography>
                </Paper>
              </Box>

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
                    <AutorenewIcon
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
                        onClick={() => handelClickLoghout()}
                      >
                        <Box
                          display='flex'
                          justifyContent='space-between'
                          columnGap='0.5rem'
                          flexWrap='wrap'
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
                icon={<FormatListBulletedIcon />}
                itemText='Task list'
                href='#/tasklist'
              />
              <DrawerListItem
                drawerOpen={(state) => setIsOpen(state)}
                icon={<PlaylistAddCheckIcon />}
                itemText='Submited Task'
                href='#/submitedList'
              />
              {/* <DrawerListItem
                drawerOpen={(state) => setIsOpen(state)}
                icon={<WorkHistoryIcon />}
                itemText='History'
                href='#/history'
              /> */}
              {userRole === 'admin' ? (
                <DrawerListItem
                  drawerOpen={(state) => setIsOpen(state)}
                  icon={<SettingsIcon />}
                  itemText='Settings'
                  href='#/settings'
                />
              ) : (
                ''
              )}
            </List>
          </CustomDrawer>
        </Box>
      </React.Fragment>

      {/* DialogAddNew */}
      <React.Fragment>
        <DialogAddNewTask
          open={dialOpen}
          onClose={handleClickCloseDialAddNewTask}
        />
      </React.Fragment>
    </React.Fragment>
  );
}
