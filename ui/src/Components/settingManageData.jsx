import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Alert, Box, Button, Stack } from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SettingDialogTaskType from './SettingDialogTaskType';
import DialogAdd from './DialogAdd';
import { useMutation } from '@apollo/client';
import { UPDATE_MESSAGE } from '../GraphQL/Mutation';
import { GET_MESSAGE } from '../GraphQL/Queries';
import { fetchMessage, updateMessage } from './dataHandler';

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

  const regExStatCom = /statu Com/gi;
  const regExTaskType = /Task Type/gi;
  const regExStatuIvpn = /statu ivpn/gi;

  const CustomDialog = () => {
    if (props.dataType.match(regExStatCom)) {
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
    } else if (props.dataType.match(regExTaskType)) {
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
    } else if (props.dataType.match(regExStatuIvpn)) {
      return (
        <DialogAdd
          open={dialogTaskOpen}
          close={() => setDialogTaskOpen((prev) => false)}
          title={'Create New Task Statu IVPN'}
          data={objData}
          inputLabel={['Statu IVPN name']}
          dataFilter={['name']}
        />
      );
    }
  };

  // handle prompte Message --------------------------------------------------
  const [setMessage, { error: errorSetMessage }] = useMutation(UPDATE_MESSAGE, {
    refetchQueries: [GET_MESSAGE],
    awaitRefetchQueries: true,
  });
  const message = fetchMessage();
  const [showAlert, setShowAlert] = useState(false);
  // function to clear message and hide alert
  const clearMessage = () => {
    updateMessage(setMessage, '', errorSetMessage);
    setShowAlert(false);
  };
  useEffect(() => {
    if (message) {
      setShowAlert(true);
    }
    const alertTimer = setTimeout(() => clearMessage(), 5000);
    return () => clearTimeout(alertTimer);
  }, [message]);
  //  --------------------------------------------------handle prompte Message

  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'center'}
      gap={'1rem'}
      width={'75vw'}
    >
      <Box
        height={'75vh'}
        bgcolor={'#fff'}
        width={'100vw'}
        display='flex'
        flexDirection='column'
        gap={'1rem'}
        sx={{
          background:
            'linear-gradient(55deg, rgba(112,128,144,0) 0%, rgba(192,192,192,0) 36%, rgba(192,192,192,0) 62%, rgba(112,128,144,0) 100%)',
        }}
      >
        <DataGrid
          columns={props.columns}
          rows={props.rows}
          pageSize={7}
          rowsPerPageOptions={[7]}
          sx={{ background: '#fff' }}
        />
        {showAlert ? (
          <Alert severity='error' onClose={clearMessage}>
            {message}
          </Alert>
        ) : (
          ''
        )}
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
      </Box>
    </Box>
  );
}
