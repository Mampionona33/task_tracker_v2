import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box, Button, IconButton } from '@mui/material';
import SettingManageData from '../Components/settingManageData.jsx';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchTaskType } from './dataHandler.js';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{}}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function SettingTabPanel(params) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /* 
    Format task Type data
  */
  const taskTypeList = fetchTaskType();
  const [tastTypeRows, setTastTypeRows] = useState([]);
  //  -----------------------------------------------------------
  // colums for task type table
  const taskTypeColumns = [
    { field: 'id', headerName: 'Id', headerAlign: 'center', hide: 'true' },
    { field: 'name', headerName: 'Task Name', headerAlign: 'center', flex: 1 },
    {
      field: 'objectif',
      headerName: 'Task Goal',
      headerAlign: 'center',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      headerAlign: 'center',
      align: 'center',

      renderCell: (params) => (
        <React.Fragment>
          <IconButton color='primary' aria-label='Edit'>
            <EditIcon />
          </IconButton>
          <IconButton color='primary' aria-label='Delete'>
            <DeleteIcon />
          </IconButton>
        </React.Fragment>
      ),
    },
  ];
  React.useEffect(() => {
    if (taskTypeList) {
      setTastTypeRows((prev) => taskTypeList);
    }
  }, [taskTypeList]);
  //  -----------------------------------------------------------

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        justifyContent: 'space-between',
        height: 'calc(100vh - 48px)',
        background:
          'linear-gradient(55deg, rgba(112,128,144,1) 0%, rgba(192,192,192,1) 36%, rgba(192,192,192,1) 62%, rgba(112,128,144,1) 100%)',
      }}
    >
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        aria-label='Vertical tabs example'
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          backgroundColor: 'white',
          '& .MuiTabs-flexContainer': { alignItems: 'flex-start' },
        }}
      >
        <Tab label='Manage Task Type' {...a11yProps(0)} />
        <Tab label='Manage Commertial Status' {...a11yProps(1)} />
        <Tab label='Manage IVPN Status' {...a11yProps(2)} />
        <Tab label='Item Four' {...a11yProps(3)} />
        <Tab label='Item Five' {...a11yProps(4)} />
        <Tab label='Item Six' {...a11yProps(5)} />
        <Tab label='Item Seven' {...a11yProps(6)} />
      </Tabs>
      <Box display={'flex'} marginRight={'5vw'}>
        <TabPanel value={value} index={0}>
          <SettingManageData
            columns={taskTypeColumns}
            rows={tastTypeRows}
            dataType={'Task'}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
      </Box>
    </Box>
  );
}
