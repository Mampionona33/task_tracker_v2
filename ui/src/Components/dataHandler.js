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
	const [outpoutUnsubmited,setOutpoutUnsubmited] = useState([]);
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
	const [outpoutSubmited,setOutpoutSubmited] = useState([]);
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
const makePrevProcessOff = (prevProcessPlayId) => {	
	
	// const [prevProcessPlayId, setPrevProcessPlayId ] = useState([]);
	
	// const playFiche = loadProcessingPlay();
	
	const [fichesUpdate, { error: erroUpDate }] = useMutation(UPDATE_FICHE, {
    refetchQueries: [LOAD_DATA],
    refetchQueries: [
      FILTRED_FICHE,
      { variables: { input: { submiteState: 'isUnsubmited' } } },
    ],
    refetchQueries: [
      FILTRED_FICHE,
      { variables: { input: { submiteState: 'isSubmited' } } },
    ],
  });   
  
  
	// useEffect(()=>{
		// if(playFiche.length > 0 ){
			// console.log('setPrevProcessIsOff id of prev processing' , playFiche[0].id);
			// setPrevProcessPlayId(playFiche[0].id);
		// }
	
	// },[playFiche]);
	
	 // function to execute the update to set processing : 'isOff'
  const setPrevProcessIsOff =  () => {
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
  };
  console.log('prevProcessPlayId',prevProcessPlayId);
	
	
}

export {
  loadProcessingPause,
  loadAllData,
  loadProcessingPlay,
  loadUnsubmitedTask,
  loadSubmitedTask,
  makePrevProcessOff
};


