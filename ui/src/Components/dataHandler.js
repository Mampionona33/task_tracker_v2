import { useQuery, useMutation } from '@apollo/client';
import { LOAD_DATA, FILTRED_FICHE } from '../GraphQL/Queries';
import { UPDATE_FICHE } from '../GraphQL/Mutation';
import { useEffect, useState } from 'react';

// FETHING DATA-----------------------------

// fetch global data
function loadAllData() {
  const {
    data: allData,
    loading: allDataLoading,
    error: errorLoadData,
  } = useQuery(LOAD_DATA);
  useEffect(() => {
    if (allData) {
      return allData;
    }
  }, [allData]);
}

// Fetch the current play Task
function loadProcessingPlay() {
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
      return playdata, console.log(playdata);
    }
  }, [playdata]);
  return playdata;
}

// Fetch the current played Task
function loadProcessingPause(params) {
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
      return dataPause;
    }
  }, [dataPause]);
  return dataPause;
}

// Fetching unsubmited task
function loadUnsubmitedTask() {
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
      return dataUnsubmited;
    }
  });
  return dataUnsubmited;
}

export {
  loadProcessingPause,
  loadAllData,
  loadProcessingPlay,
  loadUnsubmitedTask,
};
