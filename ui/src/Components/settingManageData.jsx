import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SettingDialogTaskType from './SettingDialogTaskType';
import DialogAdd from './DialogAdd';

export default function SettingManageData(props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [buttonEvent, setButtonEvent] = useState([]);

  const handleClickAddNew = (event) => {
    // console.log('event: ', event.target);
    setDialogOpen((prve) => true);
    setButtonEvent((prev) => event);
  };
  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'center'}
      gap={'1rem'}
      width={'75vw'}
    >
      <Box height={'75vh'} bgcolor={'#fff'} width={'100vw'}>
        <DataGrid
          columns={props.columns}
          rows={props.rows}
          pageSize={7}
          rowsPerPageOptions={[7]}
        />
      </Box>
      <Box>
        <Button
          size='small'
          variant='contained'
          onClick={(event) => handleClickAddNew(event)}
        >
          <LibraryAddIcon />
          Creat New {props.dataType}
        </Button>
        <DialogAdd
          open={dialogOpen}
          close={() => setDialogOpen((prev) => false)}
          title={'Create New Task'}
          data={{ name: '', objectif: 0 }}
          inputLabel={['Task Type name', 'Task Goal']}
        />
        {/* <SettingDialogTaskType
          open={dialogOpen}
          close={() => setDialogOpen((prev) => false)}
          dialogTitle={'Add New Task Type'}
          buttonEvent={buttonEvent}
        /> */}
      </Box>
    </Box>
  );
}
