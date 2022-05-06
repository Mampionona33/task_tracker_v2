import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box, Button, IconButton } from '@mui/material';
import SettingManageData from '../Components/settingManageData.jsx';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchStatucom, fetchTaskTypeData } from './dataHandler.js';
import SettingDialogTaskType from './SettingDialogTaskType.jsx';
import DialogBoxConfirmDel from './DialogBoxConfirmDel.jsx';
import DialogAdd from './DialogAdd.jsx';

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
  const taskTypeList = fetchTaskTypeData();
  const [tastTypeRows, setTastTypeRows] = useState([]);
  //  -----------------------------------------------------------
  // colums for task type table
  const taskTypeColumns = [
    { field: 'id', headerName: 'Id', headerAlign: 'center', hide: 'true' },
    {
      field: 'name',
      headerName: 'Task Type Name',
      headerAlign: 'center',
      flex: 1,
    },
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
          <IconButton
            color='primary'
            aria-label='Edit'
            onClick={(event) => handleClickEdit(event, params)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color='primary'
            aria-label='Delete'
            onClick={(event) => handleClickDel(event, params)}
          >
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

  // function to execut on click in  EditIcon button
  const handleClickEdit = (event, params) => {
    // console.log('event: ', event.target, ' params : ', params);
    setDialogEditOpen((prev) => true);
    setSelectedRowData((prev) => params.row);
    setButtonEvent((prev) => event);
  };

  // ------------
  // Dialog Edit //
  // -------------
  const [dialogEditIsOpen, setDialogEditOpen] = useState(false);
  const [selectedRowdata, setSelectedRowData] = useState([]);
  const [buttonEvent, setButtonEvent] = useState([]);
  const [taskTypeId, setTaskTypeId] = useState(0);
  // -----------------------------------------------------------

  //--------------------
  // Dialog Confirm Del
  //--------------------
  const [dialogDelOpen, setDialogDelOpen] = useState(false);
  const handleClickDel = (event, params) => {
    // console.log(params);
    setTaskTypeId((prev) => params.id);
    setSelectedRowData((prev) => params.row);
    setDialogDelOpen((prev) => true);
  };

  // statu com column
  const statuComColumn = [
    { field: 'id', headerName: 'Id', headerAlign: 'center', hide: 'true' },
    {
      field: 'name',
      headerName: 'Task Type Name',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      headerAlign: 'center',
      align: 'center',

      renderCell: (params) => (
        <React.Fragment>
          <IconButton
            color='primary'
            aria-label='Edit'
            onClick={(event) => handleClickEdit(event, params)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color='primary'
            aria-label='Delete'
            onClick={(event) => handleClickDel(event, params)}
          >
            <DeleteIcon />
          </IconButton>
        </React.Fragment>
      ),
    },
  ];
  const statuComList = fetchStatucom(); // load statu com from data base
  const [statuComRows, setStatuComRows] = useState([]);
  useEffect(() => {
    if (statuComList) {
      // console.log(statuComList);
      setStatuComRows((prev) => statuComList);
    }
  }, [statuComList]);

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
      <Box display={'flex'}>
        <TabPanel value={value} index={0}>
          <SettingManageData
            columns={taskTypeColumns}
            rows={tastTypeRows}
            dataType={'Task Type'}
          />
          {/* <SettingDialogTaskType
            open={dialogEditIsOpen}
            close={() => setDialogEditOpen((prev) => false)}
            dialogTitle={'Edit Task Type'}
            selectedRowdata={selectedRowdata}
            buttonEvent={buttonEvent}
          /> */}
          {/* <DialogAddOrEdit
            open={dialogEditIsOpen}
            close={() => setDialogEditOpen((prev) => false)}
            title={'Edit Task Type'}
            data={selectedRowdat  a}
            inputLabel={['Task Type name', 'Task Goal', 'test']}
          /> */}

          <DialogAdd
            open={dialogEditIsOpen}
            close={() => setDialogEditOpen((prev) => false)}
            title='Edit Task Type'
            inputLabel={['Type Task Name', 'Type Task Goal']}
            data={selectedRowdata}
            dataFilter={['name', 'objectif']}
          />

          <DialogBoxConfirmDel
            open={dialogDelOpen}
            close={() => setDialogDelOpen((prev) => false)}
            title='Delete Task Type'
            data={selectedRowdata}
            rowId={taskTypeId}
            inputLabel={['Task Type name', 'Task Goal']}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SettingManageData
            columns={statuComColumn}
            rows={statuComRows}
            dataType={'statu Com'}
          />
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
