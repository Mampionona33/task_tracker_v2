import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SettingDialogTaskType from './SettingDialogTaskType';
import DialogAdd from './DialogAdd';

export default function SettingManageData(props) {
  const [dialogTaskOpen, setDialogTaskOpen] = useState(false);
  const [buttonEvent, setButtonEvent] = useState([]);
  const [objData, setObjData] = useState({});

  const handleClickAddNew = (event) => {
    // console.log('event: ', event.target);
    // console.log('event: ', props.dataType);
    setDialogTaskOpen((prve) => true);
    setButtonEvent((prev) => event);
    const objD = { name: '', objectif: 0 };
    setObjData((prev) => objD);
  };

  const CustomDialog = () => {
    if (props.dataType.includes('statu Com')) {
      return (
        <DialogAdd
          open={dialogTaskOpen}
          close={() => setDialogTaskOpen((prev) => false)}
          title={'Create New statu Com'}
          data={objData}
          inputLabel={['Statu Com name']}
          dataFilter={['name']}
        />
      );
    } else if (props.dataType.includes('Task Type')) {
      return (
        <DialogAdd
          open={dialogTaskOpen}
          close={() => setDialogTaskOpen((prev) => false)}
          title={'Create New Task Type'}
          data={objData}
          inputLabel={['Task Type name', 'Task Goal']}
          dataFilter={['name', 'objectif']}
        />
      );
    }
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
        <CustomDialog />

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
