import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Box,
} from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';

/* 
    title : type | string @title of the dialog
    open : type | function @open the dialog on click on parent button
    close : type | function @close the dialog box on click on button close
    input : type | Array of Object @use to field the inputs label and value
*/

export default function DialogAdd({
  title,
  open,
  close,
  data,
  inputLabel,
  dataFilter,
  filterDown,
}) {
  //   component to show the dialog content input
  // const CustomDialogContent = inputLabel.map((item, key) => {
  //   const [val, setVal] = useState(0);
  //   useEffect(() => {
  //     if (item) {
  //       setVal((prev) => Object.values(item));
  //     }
  //   }, [item]);
  //   return (
  //     <TextField
  //       key={key}
  //       label={Object.keys(item)}
  //       value={val}
  //       ref={addToRefs}
  //       onChange={(e) => setVal((prev) => e.target.value)}
  //     />
  //   );
  // });

  //   function to execute on click in button save
  const handleClickSave = () => {};

  //   root render element
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
        ></Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickSave}>Save</Button>
        <Button onClick={close}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
