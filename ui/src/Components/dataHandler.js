import { useQuery } from '@apollo/client';
import { LOAD_DATA, FILTRED_FICHE } from '../GraphQL/Queries';
import { useEffect, useState } from 'react';

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
      data;
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
      dataPause;
    }
  }, [dataPause]);
}

export { loadProcessingPause, loadAllData, loadProcessingPlay };
