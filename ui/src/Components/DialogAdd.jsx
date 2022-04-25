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
  columnHeader,
  filterDown,
}) {
  // console.log(Object.keys(data));
  // console.log(columnHeader);
  console.log(filterDown);
  console.log(data);

  const [filter, setFilter] = useState([]);

  const labelInputRefs = useRef([]);
  const [inputLab, setInputLab] = useState([]);

  useEffect(() => {
    if (inputLabel) {
      setInputLab((prev) => inputLabel);
    }
    if (columnHeader && data) {
      const dataFilter = columnHeader.map((item) => item);
      const dataKeyValueFirstFilter = Object.entries(data);

      if (dataKeyValueFirstFilter.length > 0) {
        // console.log(dataFilter[0]);
        // console.log(dataKeyValueFirstFilter[0][0]);
        for (let i = 0; i < dataFilter.length; i++) {
          for (let a = 0; a < dataKeyValueFirstFilter.length; a++) {
            const dataKeyValueSecondFilter = dataKeyValueFirstFilter[a];
            // console.log(dataKeyValueSecondFilter);
            // console.log(dataFilter[i]);
            for (let b = 0; b < dataKeyValueSecondFilter.length; b++) {
              // console.log(dataFilter[i]);
              if (dataFilter[i] === dataKeyValueSecondFilter[b]) {
                // console.log(dataKeyValueSecondFilter[b + 1]);
              }
            }
          }
        }
      }
    }
  }, [inputLabel, columnHeader, data]);

  const initialInputValue = [];

  // filter.map((item) => {
  //   Object.entries(data).map((elem) => {
  //     if (elem[0] === item) {
  //       console.log(elem[1]);
  //       // initialInputValue.push(elem[1]);
  //     }
  //   });
  // });

  // console.log(initialInputValue);

  //   add the element to ref
  const addToRefs = (elem) => {
    if (elem && !labelInputRefs.current.includes(elem)) {
      labelInputRefs.current.push(elem);
    }
  };

  const CustomDialogContent = inputLab.map((item, key) => {
    // console.log(filter);
    return <TextField key={key} label={item} />;
  });

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
  const handleClickSave = () => {
    // for (let i = 0; i < labelInputRefs.current.length; i++) {
    //   console.log(labelInputRefs.current[i].children[1].children[0].value);
    // }
  };

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
