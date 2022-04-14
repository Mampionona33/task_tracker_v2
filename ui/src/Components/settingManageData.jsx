import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';

export default function SettingManageData(props) {
  console.log(props);
  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'center'}
      gap={'1rem'}
      width={'75vw'}
    >
      <Box height={'75vh'} bgcolor={'#fff'} width={'100vw'} >
        <DataGrid
          columns={props.columns}
          rows={props.rows}
          pageSize={7}
          rowsPerPageOptions={[7]}
        />
      </Box>
      <Box>
        <Button variant='contained'>Add new {props.dataType}</Button>
      </Box>
    </Box>
  );
}
