import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';

export default function DialogAddOrEdit({
  title,
  open,
  close,
  data,
  inputLabel,
}) {
  //   if (data) {
  //     const arrayData = Array.from(Object.keys(data));
  //     // console.log(`${Object.keys(data)}: ${Object.values(data)}`);
  //     console.log(arrayData);
  //   }

  const [label, setLabel] = useState([]);
  useEffect(() => {
    if (inputLabel) {
      setLabel((prev) => inputLabel);
    }
  }, [inputLabel]);

  const CustomDialogContent = label.map((item, key) => {
    return (
      <Box>
        <TextField key={key} label={item} />
      </Box>
    );
  });

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>{title}</DialogTitle>
      <Divider />
      <DialogContent>
        <Box display={'flex'} flexDirection='row' gap={'1rem'}>
          {CustomDialogContent}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button>Save</Button>
        <Button onClick={close}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
