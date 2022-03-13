import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  TextField,
  Autocomplete,
  Box,
  Paper,
  Typography,
  TextareaAutosize,
  Divider,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  fetchListSatusIvpn,
  fetchingStatusCom,
  fetchingListTaskType,
  fetchingListTaskCase,
} from "./dataHandler";

const DialogEditTask = (props) => {
  const open = props.open;
  const onClose = props.onClose;
  const selectedRowData = props.selectedRowData;

  // fetching data from database
  const fetchingListStatIvpn = fetchListSatusIvpn();
  const listStatusComs = fetchingStatusCom();
  const listTaskTypes = fetchingListTaskType();
  const listTaskCases = fetchingListTaskCase();

  // Get status IVPN from fetchingListStatIvpn
  const listStatIvpn = fetchingListStatIvpn.listStatIvpn;
  const listTaskType = listTaskTypes.listTypeTaches;
  const listStatCom = listStatusComs.listStatCom;
  const listTaskCase = listTaskCases.listTaskCase;

  const [autoCompletIvpn, setAutocompletIvpn] = useState([]);
  const [autoCompletTypeTask, setAutocompletTypeTask] = useState([]);
  const [autoCompletStatuCom, setAutocompletStatCom] = useState([]);
  const [autoCompletTaskCase, setAutocompletTaskCase] = useState([]);

  // inputs variables
  const [numFiche, setNumFiche] = useState("");
  const [defaultTaskType, setDefaultTaskType] = useState("");
  const [defaultStatCom, setDefaultStatCom] = useState("");
  const [defaultUrl, setDefaultUrl] = useState("");
  const [cat, setCat] = useState("");
  const [statuIvpn, setStatIvpn] = useState("");

  console.log(selectedRowData);

  useEffect(() => {
    if (listStatIvpn) {
      setAutocompletIvpn((prev) => listStatIvpn.map((item) => item.name));
    }
    if (listTaskType) {
      setAutocompletTypeTask((prev) => listTaskType.map((item) => item.name));
    }
    if (listStatCom) {
      setAutocompletStatCom((prev) => listStatCom.map((item) => item.name));
    }
    if (listTaskCase) {
      setAutocompletTaskCase((prev) => listTaskCase.map((item) => item.state));
    }

    // if data from selected row is ready
    if (selectedRowData) {
      setNumFiche((prev) => selectedRowData.numFiche);
      setDefaultTaskType((prev) => selectedRowData.typeTrav);
      setDefaultStatCom((prev) => selectedRowData.statusCom);
      setDefaultUrl((prev) => selectedRowData.link);
      setCat((prev) => selectedRowData.cat);
      setStatIvpn((prev) => selectedRowData.statIvpn);
    }
  }, [listStatIvpn, listTaskTypes, listStatCom, listTaskCase, selectedRowData]);

  // input styles
  const textFieldInputStyle = {
    padding: 7,
    fontSize: "1rem",
    height: 15,
  };
  const TimerTextFieldeStyle = {
    padding: 7,
    fontSize: "1rem",
    width: 40,
    height: 15,
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-edit-task"
      aria-describedby="alert-dialog-describ-edit-task"
      fullWidth
    >
      <DialogTitle id="alert-dialog-edit-task">Edit task</DialogTitle>
      <Divider />
      <DialogContent>
        <Box
          rowGap={1}
          columnGap={2}
          marginBottom="1rem"
          sx={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}
        >
          <Box>
            <TextField
              id="numFiche"
              variant="standard"
              label="numFiche"
              fullWidth
              inputProps={{ style: textFieldInputStyle }}
              value={numFiche}
              onChange={(e) => setNumFiche(e.target.value)}
            />
          </Box>

          <Box>
            <TextField
              id="cat"
              variant="standard"
              label="Categorie"
              fullWidth
              value={cat}
              onChange={(e) => setCat(e.target.value)}
            />
          </Box>

          <Box>
            <TextField
              id="url"
              variant="standard"
              label="url"
              value={defaultUrl}
              onChange={(e) => setDefaultUrl(e.target.value)}
            />
          </Box>

          <Box>
            <Autocomplete
              disablePortal
              id="comboBoxStateCom"
              size="small"
              defaultValue={defaultStatCom}
              options={autoCompletStatuCom}
              PaperComponent={({ children }) => (
                <Paper sx={{ typography: "body2" }}>{children}</Paper>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Commercial Status" fullWidth />
              )}
            />
          </Box>

          <Box>
            <Autocomplete
              disablePortal
              id="comboBoxStatIvpn"
              size="small"
              defaultValue={statuIvpn}
              options={autoCompletIvpn}
              PaperComponent={({ children }) => (
                <Paper sx={{ typography: "body2" }}>{children}</Paper>
              )}
              renderInput={(params) => (
                <TextField {...params} label="IVPN Status" fullWidth />
              )}
            />
          </Box>

          <Box>
            <Autocomplete
              disablePortal
              id="typeTask"
              size="small"
              options={autoCompletTypeTask}
              defaultValue={defaultTaskType}
              PaperComponent={({ children }) => (
                <Paper sx={{ typography: "body2" }}>{children}</Paper>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Task Type" />
              )}
            />
          </Box>

          <Box>
            <Autocomplete
              disablePortal
              id="taskCase"
              size="small"
              // options={['Normal', 'Sby', 'Paf']}
              options={autoCompletTaskCase}
              PaperComponent={({ children }) => (
                <Paper sx={{ typography: "body2" }}>{children}</Paper>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Task Case" />
              )}
            />
          </Box>

          <Box display="flex" justifyContent="space-between" gap={0.5}>
            <Box display="flex" flexDirection="column-reverse">
              <Typography
                sx={{ color: "rgba(0, 0, 0, 0.6)", fontSize: "0.9rem" }}
              >
                Elaptsed Time
              </Typography>
            </Box>
            <Box display="flex">
              <TextField
                id="hrs"
                variant="standard"
                label="Hrs"
                type="number"
                inputProps={{
                  style: TimerTextFieldeStyle,
                  min: "0",
                  max: "23",
                }}
              />
              <TextField
                type="number"
                id="min"
                variant="standard"
                label="min"
                inputProps={{
                  style: TimerTextFieldeStyle,
                  min: "0",
                  max: "23",
                }}
              />
              <TextField
                type="number"
                id="sec"
                variant="standard"
                label="sec"
                inputProps={{
                  style: TimerTextFieldeStyle,
                  min: "0",
                  max: "23",
                }}
              />
            </Box>
          </Box>

          <Box>
            <TextField
              id="nbBefor"
              variant="standard"
              label="Numer Prod Before"
              fullWidth
            />
          </Box>

          <Box>
            <TextField
              id="nbAft"
              variant="standard"
              label="Numer Prod After"
              fullWidth
            />
          </Box>
        </Box>
        <Divider />
        <Box>
          <Typography
            fontFamily="sans-serif"
            color="GrayText"
            sx={{ margin: "0.5rem" }}
          >
            COMMENT
          </Typography>
          <TextareaAutosize
            id="comment"
            style={{ width: "100%", minHeight: "4rem" }}
          />
        </Box>
      </DialogContent>
      {/* Button */}
      <DialogActions>
        <Button>Save</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
export default DialogEditTask;
