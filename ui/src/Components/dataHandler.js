import { useQuery, useMutation, gql } from '@apollo/client';
import { LOAD_DATA, FILTRED_FICHE } from '../GraphQL/Queries';
import { UPDATE_FICHE } from '../GraphQL/Mutation';
import React, { useEffect, useState } from 'react';

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

// MUTATE DATA-----------------------------
// set prevProcessPlay to off
const makePrevProcessIsOff = (prevProcessPlayId, fichesUpdate, erroUpDate) => {
  // console.log('makePrevProcessIsOff', prevProcessPlayId);
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
  return fichesUpdate;
};

export {
  loadProcessingPause,
  loadAllData,
  loadProcessingPlay,
  loadUnsubmitedTask,
  loadSubmitedTask,
  makePrevProcessIsOff,
};
