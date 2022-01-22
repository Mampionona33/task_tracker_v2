import React, {
    useEffect,
    useState,
    useRef
}
from 'react';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {
    useMutation
}
from '@apollo/client';
import {
    UPDATE_FICHE
}
from '../GraphQL/Mutation';
import {
    LOAD_DATA
}
from '../GraphQL/Queries';
import {
    loadProcessingPause,
    loadProcessingPlay,
    setProcessToPause,
    setProcessToPlay,
    getLastupdate,
    renderDate,
    updateElastedTime,
    loadElapstedTime,
    modifyLastUpdate,
    intToTimer,
}
from './dataHandler';
import {
    getUtcDateNow
}
from '../Features/getUtcDateNow';
import {
    IconButton,
    Typography,
    Box
}
from '@mui/material';

const PausePlayButton = () => {
    const[currentProcess, setCurrentProcess] = useState('');
    const[prevProcessId, setPrevProcessId] = useState(0);
    const[prevFicheLastUpdate, setPrevFicheLastUpdate] = useState([]);
    const[prevFicheElapstedTime, setPrevFicheElapstedTime] = useState(0);
    const[localTimer, setLocalTimer] = useState(0);
    const[uiTimer, setUiTimer] = useState(0);
    const[timeInFromLocalStorage, setTimeInFromLocalStorage] = useState(0);

    const[tickInc, setTickInc] = useState(0);

    let count = useRef(null);
    let timerCount = useRef(null);

    // load processing task status
    const pauseData = loadProcessingPause();
    const playData = loadProcessingPlay();
    const lastUpdate = getLastupdate();
    const dateNow = getUtcDateNow();

    // execute mutation fichesUpdate with useMutation
    const[fichesUpdate, {
            error: erroUpDate
        }
    ] = useMutation(UPDATE_FICHE, {
        refetchQueries: [LOAD_DATA],
    });

    useEffect(() => {
        if (playData.length > 0) {
            setCurrentProcess((prev) => playData[0].processing);
            setPrevProcessId((prevId) => playData[0].id);
            setPrevFicheLastUpdate((prev) => playData[0].lastUpdate);
            setPrevFicheElapstedTime((prev) => playData[0].elapstedTime);

        }

        if (pauseData.length > 0) {
            setCurrentProcess((prev) => pauseData[0].processing);
            setPrevProcessId((prevId) => pauseData[0].id);
            setPrevFicheLastUpdate((prev) => pauseData[0].lastUpdate);
            setPrevFicheElapstedTime((prev) => pauseData[0].elapstedTime);
        }

        if (currentProcess === 'isPlay') {
            timerCount.current = setInterval(() => tick(), 1000);
        }

        if (currentProcess === 'isPause') {
            clearInterval(timerCount.current);
        }

        if (prevFicheLastUpdate.length > 0) {

            const dateNowGmt = Date.parse(new Date().toUTCString());
            const prevLastUpdateDate = Date.parse(prevFicheLastUpdate);

            let diffDate = (dateNowGmt - prevLastUpdateDate) / 1000;

            console.log(dateNowGmt);
            console.log(new Date().toUTCString());
            console.log('Date.parse(prevFicheLastUpdate)', prevFicheLastUpdate);
            console.log('diffDate', diffDate);
            // console.log(dateNowGmt.getUTCDate());
            // console.log(dateNowGmt.getUTCFullYear());
            // console.log('dateNow', dateNowGmt);
            // console.log('Date.parse(new Date().toUTCString()', Date.parse(new Date().toUTCString()));
            // console.log('diffDate', diffDate);


            localStorage.setItem('localTimerInt', diffDate);
        }

        window.addEventListener('storage', (e) => {
            // console.log(parseInt(localStorage.getItem('localTimerInt')));
            setUiTimer((prev) => parseInt(localStorage.getItem('localTimerInt')));
        });

    }, [pauseData, playData, currentProcess, prevFicheLastUpdate]);

    // const tick = () => {
    // setTickInc((prev) => prev + 1);
    // };

    const tick = () => {
        let prevLocalTime = parseInt(localStorage.getItem('localTimerInt'));
        localStorage.setItem('localTimerInt', ++prevLocalTime)
        window.dispatchEvent(new Event('storage'));
    };

    const stopTick = () => {}

    const handleClickPlay = async(e) => {
        await setProcessToPlay(prevProcessId, fichesUpdate, erroUpDate);
    };

    const handleClickPause = async(e) => {

        const elapstedTime = (Date.parse(new Date()) - Date.parse(prevFicheLastUpdate)) + prevFicheElapstedTime;

        console.log('elapstedTime', elapstedTime);
        console.log('prevProcessId', prevProcessId);

        await setProcessToPause(prevProcessId, fichesUpdate, erroUpDate).then(
            modifyLastUpdate(prevProcessId, fichesUpdate, erroUpDate).then(
                updateElastedTime(prevProcessId, elapstedTime, fichesUpdate, erroUpDate)));
        // clearInterval(timerCount.current);
    };

    const ButtonPlay = () => {
        return (
             < IconButton
            color = 'primary'
                component = 'span'
                label = 'Play button'
                onClick = {
                handleClickPlay
            }
             >
             < PlayCircleIcon /  >
             <  / IconButton > );
    };

    const ButtonPause = () => {
        return (
             < IconButton
            color = 'primary'
                component = 'span'
                label = 'Pause button'
                onClick = {
                handleClickPause
            }
             >
             < PauseCircleIcon /  >
             <  / IconButton > );
    };

    return (
         < Box sx = { {
                margin: 5
            }
        }
         >
         < Typography > elapsted time: {
        intToTimer(uiTimer)
    }
         <  / Typography > {
        currentProcess === 'isPlay' ?  < ButtonPause /  >  :  < ButtonPlay /  >
    }
         <  / Box > );
};

export default PausePlayButton;
