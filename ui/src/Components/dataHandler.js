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

// Fetch the current paused Task
function loadProcessingPause() {
  const {
    error: errorPause,
    loading: loadingPause,
    data,
  } = useQuery(FILTRED_FICHE, {
    variables: {
      input: {
        processing: 'isPlay',
      },
    },
  });
  useEffect(() => {
    if (data) {
      return data;
    }
  }, [data]);
}

// Fetch the current played Task
function loadProcessingPlay(params) {
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
      // console.log('load unsubmi', dataUnsubmited.searchFiches);
      return (
        dataUnsubmited,
        console.log('load unsubmi', dataUnsubmited)
      );
    }
  });
}

export {
  loadProcessingPause,
  loadAllData,
  loadProcessingPlay,
  loadUnsubmitedTask,
};
