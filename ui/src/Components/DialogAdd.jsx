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
    inputLabel : type | Array of Object @use to field the inputs label and value

    This component is used in : 
      - SettingTabPanel.jsx;
      - settingManageData.jsx
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
  const [id, setId] = useState(0);
  const refInputVal = useRef([]);

  useEffect(() => {
    if (data.id !== 0 && data !== undefined && data.id !== undefined) {
      console.log(data);
      setId((prev) => data.id);
    }
    if (dataFilter.length > 0) {
      const inp = dataFilter.map((item) => {
        if (data[item] !== undefined) {
          return data[item];
        }
      });
      setInputVal((prev) => inp);
    }
    if (inputLabel) {
      setInputItem((prev) => inputLabel);
    }
  }, [dataFilter, data, inputLabel]);

  // Function to execute to create ref
  const addToRef = (elem) => {
    if (elem && !refInputVal.current.includes(elem)) {
      refInputVal.current.push(elem);
    }
  };

  // reset ref
  const resetRef = async () => {
    refInputVal.current = [];
    return true;
  };

  //   function to execute on click in button save
  const handleClickSave = async () => {
    refInputVal.current.map((item) => {
      let value = item.children[1].children[0].value;
      // console.log(item.children[1].children[0].value);
      console.log(value);
      if (title.includes('Edit')) {
        console.log('Edit');
      } else {
        console.log('Create');
      }
      value = '';
    });
    await resetRef().then(close);
  };

  // Function to execute on input change
  const handleInputChange = (event, index) => {
    const newInputVal = [...inputVal];
    newInputVal[index] = event.target.value;
    setInputVal(newInputVal);
  };

  // Function to populate dialog by inputs
  const CustomInputList = inputVal.map((item, index) => {
    return (
      <TextField
        label={inputItem[index]}
        key={index}
        value={item}
        type={typeof item === 'number' ? 'number' : 'text'}
        onChange={(e) => handleInputChange(e, index)}
        ref={addToRef}
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
