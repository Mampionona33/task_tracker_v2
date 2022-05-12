import { useMutation } from '@apollo/client';
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
import {
  CREAT_STATU_COM,
  CREAT_TASK_TYPE,
  UPDATE_STATU_COM,
  UPDATE_TASK_TYPE,
} from '../GraphQL/Mutation';
import { LIST_STATUS_COMMERCIALE, LIST_TASK_TYPE } from '../GraphQL/Queries';
import {
  createTaskType,
  creatNewStatuCom,
  updateStatuCom,
  updateTaskTypeGoal,
  updateTaskTypeName,
} from './dataHandler';

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
    if (data && data.id !== 0 && data !== undefined && data.id !== undefined) {
      // console.log(data);
      setId((prev) => data.id);
    }
    if (data && dataFilter.length > 0) {
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

  // reset refcd
  const resetRef = async () => {
    refInputVal.current = [];
    return true;
  };

  // Mutation for the task type--------------------------------------
  const [typeTachesAdd, { error: errorCreatTaskType }] = useMutation(
    CREAT_TASK_TYPE,
    { refetchQueries: [LIST_TASK_TYPE], awaitRefetchQueries: true }
  );
  const [typeTacheUpdate, { error: errorUpdate }] = useMutation(
    UPDATE_TASK_TYPE,
    { refetchQueries: [LIST_TASK_TYPE], awaitRefetchQueries: true }
  );
  // Mutation for the task type--------------------------------------

  // Mutation for statu com -----------------------------------------
  const [statComUpdate, { error: errorUpdateStatCom }] = useMutation(
    UPDATE_STATU_COM,
    { refetchQueries: [LIST_STATUS_COMMERCIALE], awaitRefetchQueries: true }
  );
  const [statComAdd, { error: errorCreateStatCom }] = useMutation(
    CREAT_STATU_COM,
    { refetchQueries: [LIST_STATUS_COMMERCIALE], awaitRefetchQueries: true }
  );
  // Mutation for statu com -----------------------------------------

  //   function to execute on click in button save
  const handleClickSave = async () => {
    // test if the edit button is clicked
    if (title.includes('Edit')) {
      // test if the table title include Task
      if (title.includes('Task')) {
        await updateTaskTypeName(id, typeTacheUpdate, errorUpdate, inputVal[0])
          .then(
            updateTaskTypeGoal(id, typeTacheUpdate, errorUpdate, inputVal[1])
          )
          .then(close);
      }
      if (title.includes('statu Com')) {
        await updateStatuCom(
          id,
          inputVal[0],
          statComUpdate,
          errorUpdateStatCom
        ).then(close);
      }
      // test if Create button is clicked
    } else if (title.includes('Creat')) {
      if (title.includes('Task')) {
        console.log('Creat');
        await createTaskType(
          typeTachesAdd,
          inputVal[0],
          inputVal[1],
          errorCreatTaskType
        ).then(close);
      } else if (title.includes('statu Com')) {
        console.log('test');
        await creatNewStatuCom(
          statComAdd,
          inputVal[0],
          errorCreateStatCom
        ).then(close);
      }
    }

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
        type={dataFilter[index].includes('objectif') ? 'number' : 'text'}
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
        <Box sx={{ display: 'flex', gap: '1rem' }}>{CustomInputList}</Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickSave}>Save</Button>
        <Button onClick={close}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
