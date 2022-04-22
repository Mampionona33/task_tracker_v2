import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  ListItem,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState, useRef } from 'react';

export default function DialogAddOrEdit({
  title,
  open,
  close,
  data,
  inputs,
}) {
  const labelInputRefs = useRef([]);

  const addToRefs = (elem) => {
    if (elem && !labelInputRefs.current.includes(elem)) {
      labelInputRefs.current.push(elem);
    }
  };

  const CustomDialogContent = inputs.map((item, key) => {
    const [val, setVal] = useState(0);
    useEffect(() => {
      if (item) {
        setVal((prev) => Object.values(item));
      }
    }, [item]);
    return (
      <TextField
        key={key}
        label={Object.keys(item)}
        value={val}
        ref={addToRefs}
        onChange={(e) => setVal((prev) => e.target.value)}
      />
    );
  });

  const handleClickSave = () => {
    for (let i = 0; i < labelInputRefs.current.length; i++) {
      console.log(labelInputRefs.current[i].children[1].children[0].value);
    }
  };

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>{title}</DialogTitle>
      <Divider />
      <DialogContent>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2,1fr)',
            gap: 1,
          }}
        >
          {CustomDialogContent}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickSave}>Save</Button>
        <Button onClick={close}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
