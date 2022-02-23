import { useQuery, useMutation, gql } from '@apollo/client';
import { LOAD_DATA, FILTRED_FICHE } from '../GraphQL/Queries';
import { UPDATE_FICHE } from '../GraphQL/Mutation';
import React, { useEffect, useState, useRef } from 'react';
import { formatNbr } from '../Features/formatNbr';
import { useAuth0 } from '@auth0/auth0-react';

// FETHING DATA-----------------------------
// Get user logged data
function userLoggedTasks() {
  const [userTask, setUserTask] = useState([]);
  // Get current User
  const { user } = useAuth0();

  let userLoggedEmail = '';

  if (user) {
    userLoggedEmail = user.email;
  }

  const {
    error: errorPause,
    loading: loadingPause,
    data: fetchedData,
    refetch: refetchData,
  } = useQuery(FILTRED_FICHE, {
    variables: {
      input: {
        submiteState: 'isUnsubmited',
        user: {
          email: userLoggedEmail,
        },
      },
    },
  });

  useEffect(() => {
    // make to refetch data when windows is focused to prevent un updated productivity
    if (fetchedData) {
      setUserTask((prev) => fetchedData.searchFiches);
    }
    
  }, [fetchedData]);
  return userTask;
}

// fetch global data
function loadAllData() {
  const [output, setOutpout] = useState([]);

  const {
    data: allData,
    loading: allDataLoading,
    error: errorLoadData,
    refetch,
  } = useQuery(LOAD_DATA);

  useEffect(() => {
    if (allData) {
      setOutpout(allData);
    }
  }, [allData]);
  return output;
}

// Fetch the current play Task
function loadProcessingPlay() {
  const [outputPlay, setOuputPlay] = useState([]);
  const [userEmail, setUserEmail] = useState(``);

  // Get current User
  const { user, isLoading } = useAuth0();

  const {
    error: errorPause,
    loading: loadingPause,
    data: playdata,
  } = useQuery(FILTRED_FICHE, {
    variables: {
      input: {
        processing: 'isPlay',
        submiteState: 'isUnsubmited',
        user: {
          email: userEmail,
        },
      },
    },
  });

  useEffect(() => {
    if (user) {
      setUserEmail((prev) => user.email);
    }
    if (playdata) {
      setOuputPlay(playdata.searchFiches);
    }
  }, [playdata, user]);
  return outputPlay;
}

// Fetch the current played Task
function loadProcessingPause() {
  const [outputPause, setOuputPause] = useState([]);
  const [userEmail, setUserEmail] = useState(``);
  const { user, isLoading } = useAuth0();

  const {
    error: errorPause,
    loading: loadingPause,
    data: dataPause,
  } = useQuery(FILTRED_FICHE, {
    variables: {
      input: {
        processing: 'isPause',
        submiteState: 'isUnsubmited',
        user: {
          email: userEmail,
        },
      },
    },
  });
  useEffect(() => {
    if (user) {
      setUserEmail((prev) => user.email);
    }
    if (dataPause) {
      setOuputPause(dataPause.searchFiches);
    }
  }, [dataPause, user]);
  return outputPause;
}

// Fetching unsubmited task
function loadUnsubmitedTask() {
  const [outpoutUnsubmited, setOutpoutUnsubmited] = useState([]);
  const { user, isLoading } = useAuth0();
  let userEmail = ``;
  if (user) {
    userEmail = user.email;
  }

  const {
    error: errorUnsubmited,
    loading: loadingUnsumbited,
    data: dataUnsubmited,
  } = useQuery(FILTRED_FICHE, {
    variables: {
      input: {
        submiteState: 'isUnsubmited',
        user: {
          email: userEmail,
        },
      },
    },
  });
  useEffect(() => {
    if (dataUnsubmited) {
      setOutpoutUnsubmited(dataUnsubmited.searchFiches);
    }
  }, [dataUnsubmited]);

  return outpoutUnsubmited;
}

// Fetching submited task
function loadSubmitedTask() {
  const [outpoutSubmited, setOutpoutSubmited] = useState([]);
  const { user, isLoading } = useAuth0();
  let userEmail = ``;
  if (user) {
    userEmail = user.email;
  }
  const {
    error: errorUnsubmited,
    loading: loadingUnsumbited,
    data: dataSubmited,
  } = useQuery(FILTRED_FICHE, {
    variables: {
      input: {
        submiteState: 'isSubmited',
        user: {
          email: userEmail,
        },
      },
    },
  });
  useEffect(() => {
    if (dataSubmited) {
      setOutpoutSubmited(dataSubmited.searchFiches);
    }
  });
  return outpoutSubmited;
}

// Fetching elapstedTime
const loadElapstedTime = () => {
  const [outpoutElapstedTime, setOutpoutElapstedTime] = useState([]);
  const playData = loadProcessingPlay();
  const pauseData = loadProcessingPause();

  useEffect(() => {
    if (playData.length > 0) {
      setOutpoutElapstedTime(playData[0].elapstedTime);
    }
    if (pauseData.length > 0) {
      setOutpoutElapstedTime(pauseData[0].elapstedTime);
    }
  }, [playData, pauseData]);

  return outpoutElapstedTime;
};

// Fetching listTypeTaches
const fetchTaskType = () => {
  const [output, setOutpout] = useState([]);
  const allData = loadAllData();
  useEffect(() => {
    if (allData !== undefined) {
      setOutpout((prev) => allData.listTypeTaches);
    }
  }, [allData]);
  return output;
};

// MUTATE DATA-----------------------------
// set prevProcessPlay to off
const setPrevProcessIsOff = async (
  prevProcessPlayId,
  fichesUpdate,
  erroUpDate
) => {
  fichesUpdate({
    variables: {
      filter: {
        id: prevProcessPlayId,
      },
      update: {
        processing: 'isOff',
      },
    },
  });
  if (erroUpDate) {
    console.log(erroUpDate);
  }
  console.log('prevProcessPlayId', prevProcessPlayId);
  return prevProcessPlayId;
};

// set prevProcessPlay to pause
const setProcessToPause = async (prevProcessId, fichesUpdate, errorUpDate) => {
  fichesUpdate({
    variables: {
      filter: {
        id: prevProcessId,
      },
      update: {
        processing: 'isPause',
      },
    },
  });
  if (errorUpDate) {
    console.log(errorUpDate);
  }
  return prevProcessId;
};
// set prevProcessPause to Play
const setProcessToPlay = async (prevProcessId, fichesUpdate, errorUpDate) => {
  fichesUpdate({
    variables: {
      filter: {
        id: prevProcessId,
      },
      update: {
        processing: 'isPlay',
      },
    },
  });
  if (errorUpDate) {
    console.log(errorUpDate);
  }
  return prevProcessId;
};

const getLastupdate = () => {
  const playProcess = loadProcessingPlay();
  const pauseProcess = loadProcessingPause();
  const [lastUpdate, setLastUpdate] = useState([]);

  useEffect(() => {
    if (playProcess.length > 0) {
      setLastUpdate(playProcess[0].lastUpdate);
    }
    if (pauseProcess.length > 0) {
      setLastUpdate(pauseProcess[0].lastUpdate);
    }
  }, [playProcess, pauseProcess, lastUpdate]);

  return Date.parse(lastUpdate);
};

// use do render date frome string to clock
const renderDate = (value) => {
  console.log(value);
  const [outPut, setOutput] = useState(``);
  const [day, setDay] = useState(0);
  const [hours, setHours] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [milSec, setMilSec] = useState(0);

  useEffect(() => {
    if (value) {
      setDay((prev) =>
        Math.floor((value % 86400) / 36000)
          .toString()
          .padStart(2, '0')
      );
      setHours((prev) =>
        Math.floor((value % 86400) / 3600)
          .toString()
          .padStart(2, '0')
      );
      setMin((prev) =>
        Math.floor((value % 3600) / 60)
          .toString()
          .padStart(2, '0')
      );
      setSec((prev) =>
        Math.floor(value % 60)
          .toString()
          .padStart(2, '0')
      );
    }
  }, [value]);
  return { day, hours, min, sec };
};

const updateElastedTime = async (
  ficheId,
  elapstedTime,
  fichesUpdate,
  errorUpDate
) => {
  fichesUpdate({
    variables: {
      filter: {
        id: ficheId,
      },
      update: {
        elapstedTime: Math.floor(elapstedTime),
      },
    },
  });
  if (errorUpDate) {
    console.log(errorUpDate);
  }
  return ficheId;
};

// set the current time the last update
const modifyLastUpdate = async (currentFicheId, fichesUpdate, errorUpDate) => {
  const dateNow = new Date();

  fichesUpdate({
    variables: {
      filter: {
        id: currentFicheId,
      },
      update: {
        lastUpdate: dateNow,
      },
    },
  });
  if (errorUpDate) {
    console.log(errorUpDate);
  }
  return dateNow;
};

// Set current task submiteState to submited
const submitecurrentTask = async (taskId, fichesUpdate, errorUpDate) => {
  fichesUpdate({
    variables: {
      filter: {
        id: taskId,
      },
      update: {
        submiteState: 'isSubmited',
      },
    },
  });
  if (errorUpDate) {
    console.log(errorUpDate);
  }
  return taskId;
};

const dateFormater = (value) => {
  let day = Math.floor((value % 86400) / 36000)
    .toString()
    .padStart(2, '0');
  let hours = Math.floor((value % 86400) / 3600)
    .toString()
    .padStart(2, '0');
  let min = Math.floor((value % 3600) / 60)
    .toString()
    .padStart(2, '0');
  let sec = Math.floor(value % 60)
    .toString()
    .padStart(2, '0');

  return { day, hours, min, sec };
};

const productivity = (currentTaskType, currentProdBefore, currentProdAfter) => {
  // const taskToCalculate = taskTypes.filter((item)  => item.name === currentTaskType);
  return currentTaskType;
};

export {
  loadProcessingPause,
  loadAllData,
  loadProcessingPlay,
  loadUnsubmitedTask,
  loadSubmitedTask,
  setPrevProcessIsOff,
  setProcessToPause,
  setProcessToPlay,
  getLastupdate,
  renderDate,
  updateElastedTime,
  loadElapstedTime,
  modifyLastUpdate,
  submitecurrentTask,
  userLoggedTasks,
  dateFormater,
  productivity,
  fetchTaskType,
};
