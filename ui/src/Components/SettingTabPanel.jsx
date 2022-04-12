import * as React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box, Button } from '@mui/material';

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
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
        }}
      >
        <Tab label='Item One' {...a11yProps(0)} />
        <Tab label='Item Two' {...a11yProps(1)} />
        <Tab label='Item Three' {...a11yProps(2)} />
        <Tab label='Item Four' {...a11yProps(3)} />
        <Tab label='Item Five' {...a11yProps(4)} />
        <Tab label='Item Six' {...a11yProps(5)} />
        <Tab label='Item Seven' {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Item One
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
  );
}
