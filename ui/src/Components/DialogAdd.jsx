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
  Alert,
} from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import {
  CREAT_STATU_COM,
  CREAT_STATU_IVPN,
  CREAT_TASK_TYPE,
  UPDATE_STATU_COM,
  UPDATE_TASK_TYPE,
  UPDATE_MESSAGE,
} from '../GraphQL/Mutation';
import {
  LIST_STATUS_COMMERCIALE,
  LIST_STATUS_IVPN,
  LIST_TASK_TYPE,
  GET_MESSAGE,
} from '../GraphQL/Queries';
import {
  createTaskType,
  creatNewStatuCom,
  updateStatuCom,
  updateTaskTypeGoal,
  updateTaskTypeName,
  createNewStatuIvpn,
  updateMessage,
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

  // change message on error
  const [setMessage, { error: errorSetMessage }] = useMutation(UPDATE_MESSAGE, {
    refetchQueries: [GET_MESSAGE],
    awaitRefetchQueries: true,
  });

  // Mutation for the task type--------------------------------------
  const [typeTachesAdd, { error: errorCreatTaskType }] = useMutation(
    CREAT_TASK_TYPE,
    { 
      refetchQueries: [LIST_TASK_TYPE], 
      awaitRefetchQueries: true ,
      onError : (error) => [
        console.log(error.graphQLErrors[0].extensions.errors[0]),
        updateMessage(setMessage,error.graphQLErrors[0].extensions.errors[0],errorCreatTaskType),
      ]
    }
  );
  const [typeTacheUpdate, { error: errorUpdate }] = useMutation(
    UPDATE_TASK_TYPE,
    { refetchQueries: [LIST_TASK_TYPE], awaitRefetchQueries: true }
  );
  // Mutation for the task type--------------------------------------

  // Mutation for statu com -----------------------------------------
  const [statComUpdate, { error: errorUpdateStatCom }] = useMutation(
    UPDATE_STATU_COM,
    { refetchQueries: [LIST_STATUS_COMMERCIALE], 
      awaitRefetchQueries: true ,
      onError:(error) => [
        console.log(error.graphQLErrors[0].extensions.errors[0]),
        updateMessage(setMessage, error.graphQLErrors[0].extensions.errors[0],errorUpdateStatCom),
      ]
    },
  );
  const [statComAdd, { error: errorCreateStatCom }] = useMutation(
    CREAT_STATU_COM,
    { refetchQueries: [LIST_STATUS_COMMERCIALE], awaitRefetchQueries: true ,
      onError :(error) => [
        console.log(error.graphQLErrors[0].extensions.errors[0]),
        updateMessage(setMessage,error.graphQLErrors[0].extensions.errors[0],errorCreateStatCom),
      ]
    }
  );
  // Mutation for statu com -----------------------------------------

  // Mutation for statu IVPN--------------------------------------------
  const [statIvpnAdd, { error: errorCreateStatIvpn }] = useMutation(
    CREAT_STATU_IVPN,
    {
      refetchQueries: [LIST_STATUS_IVPN],
      awaitRefetchQueries: true,
      onError: (error) =>
        //   console.log(error.graphQLErrors[0].extensions.errors[0]),
        updateMessage(
          setMessage,
          error.graphQLErrors[0].extensions.errors[0],
          errorCreatTaskType
        ),
    }
  );
  // clear error from updating unmounted component after updateMessage on error
  const [didMount, setDidMount] = useState(false);
  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  });

  // --------------------------------------------Mutation for statu IVPN
  //   function to execute on click in button save
  const regExStatCom = /statu Com/gi;
  const regExTaskType = /Task Type/gi;
  const regExStatuIvpn = /statu IVPN/gi;
  const regExEdit = /edit/gi;
  const regExCreate = /creat/gi;

  const handleClickSave = async () => {
    // test if the edit button is clicked
    if (title.match(regExEdit)) {
      // test if the table title include Task
      if (title.match(regExTaskType)) {
        await updateTaskTypeName(id, typeTacheUpdate, errorUpdate, inputVal[0])
          .then(
            updateTaskTypeGoal(id, typeTacheUpdate, errorUpdate, inputVal[1])
          )
          .then(close);
      }
      if (title.match(regExStatCom)) {
        await updateStatuCom(
          id,
          inputVal[0],
          statComUpdate,
          errorUpdateStatCom
        ).then(close);
      }
      if (title.match(regExStatuIvpn)) {
        console.log('Edit statu Ivpn');
      }
      // test if Create button is clicked
    } else if (title.match(regExCreate)) {
      if (title.match(regExTaskType)) {
        console.log('Creat');
        await createTaskType(
          typeTachesAdd,
          inputVal[0],
          inputVal[1],
          errorCreatTaskType
        ).then(close);
      } else if (title.match(regExStatCom)) {
        await creatNewStatuCom(
          statComAdd,
          inputVal[0],
          errorCreateStatCom
        ).then(close);
      } else if (title.match(regExStatuIvpn)) {
        await createNewStatuIvpn(
          statIvpnAdd,
          inputVal[0],
          errorCreateStatIvpn
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
    <Box>
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
    </Box>
  );
}
