import { useQuery, useMutation, gql } from '@apollo/client';
import { LOAD_DATA, FILTRED_FICHE } from '../GraphQL/Queries';
import { UPDATE_FICHE } from '../GraphQL/Mutation';
import React, { useEffect, useState, useRef } from 'react';
import { formatNbr } from '../Features/formatNbr';

// FETHING DATA-----------------------------

// fetch global data
function loadAllData() {
  const [output, setOutpout] = useState([]);
  const {
    data: allData,
    loading: allDataLoading,
    error: errorLoadData,
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

  const {
    error: errorPause,
    loading: loadingPause,
    data: playdata,
  } = useQuery(FILTRED_FICHE, {
    variables: {
      input: {
        processing: 'isPlay',
      },
    },
  });
  useEffect(() => {
    if (playdata) {
      setOuputPlay(playdata.searchFiches);
      // console.log(playdata.searchFiches);
    }
  }, [playdata]);
  return outputPlay;
}

// Fetch the current played Task
function loadProcessingPause(params) {
  const [outputPause, setOuputPause] = useState([]);

  const {
    error: errorPause,
    loading: loadingPause,
    data: dataPause,
  } = useQuery(FILTRED_FICHE, {
    variables: {
      input: {
        processing: 'isPause',
      },
    },
  });
  useEffect(() => {
    if (dataPause) {
      setOuputPause(dataPause.searchFiches);
      // console.log('dataPause',dataPause);
    }
  }, [dataPause]);
  return outputPause;
}

// Fetching unsubmited task
function loadUnsubmitedTask() {
  const [outpoutUnsubmited, setOutpoutUnsubmited] = useState([]);
  const {
    error: errorUnsubmited,
    loading: loadingUnsumbited,
    data: dataUnsubmited,
  } = useQuery(FILTRED_FICHE, {
    variables: {
      input: {
        submiteState: 'isUnsubmited',
      },
    },
  });
  useEffect(() => {
    if (dataUnsubmited) {
      setOutpoutUnsubmited(dataUnsubmited.searchFiches);
    }
  });
  return outpoutUnsubmited;
}

// Fetching submited task
function loadSubmitedTask() {
  const [outpoutSubmited, setOutpoutSubmited] = useState([]);
  const {
    error: errorUnsubmited,
    loading: loadingUnsumbited,
    data: dataSubmited,
  } = useQuery(FILTRED_FICHE, {
    variables: {
      input: {
        submiteState: 'isSubmited',
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
  return `${day}:${hours}:${min}:${sec}`;
};

const updateElastedTime = async (
  currentProcessId,
  elapstedTime,
  fichesUpdate,
  errorUpDate
) => {
  fichesUpdate({
    variables: {
      filter: {
        id: currentProcessId,
      },
      update: {
        elapstedTime: elapstedTime,
      },
    },
  });
  if (errorUpDate) {
    console.log(errorUpDate);
  }
  return currentProcessId;
};

// set the current time the last update
const modifyLastUpdate = async (
  currentFicheId,
  fichesUpdate,
  errorUpDate
) => {
  const dateNow = new Date();

  const utcDateNow = new Date(
    dateNow.getTime() - dateNow.getTimezoneOffset() * 60000
  ).toISOString();

  fichesUpdate({
    variables: {
      filter: {
        id: currentFicheId,
      },
      update: {
        lastUpdate: utcDateNow,
      },
    },
  });
  if (errorUpDate) {
    console.log(errorUpDate);
  }
  return date;
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
};
