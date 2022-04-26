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
  const [inputVal, setInputVal] = useState([]);
  const [inputItem, setInputItem] = useState([]);
  useEffect(() => {
    if (dataFilter.length > 0) {
      dataFilter.map((item) => {
        if (data[item] !== undefined) {
          setInputVal((prev) => [...prev, data[item]]);
        }
      });
    }
    if (inputLabel) {
      setInputItem((prev) => inputLabel);
    }
  }, [dataFilter, data, inputLabel]);

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

  // console.log(inputVal);
  // console.log(inputItem);

  const handleInputChange = (event, index) => {
    const newInputVal = [...inputVal];
    newInputVal[index] = event.target.value;
    setInputVal(newInputVal);
  };

  const CustomInputList = inputVal.map((item, index) => {
    console.log(typeof item);
    return (
      <TextField
        label={inputItem[index]}
        key={index}
        value={item}
        type={typeof item === 'number' ? 'number' : 'text'}
        onChange={(e) => handleInputChange(e, index)}
      />
    );
  });

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
        >
          {CustomInputList}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickSave}>Save</Button>
        <Button onClick={close}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
