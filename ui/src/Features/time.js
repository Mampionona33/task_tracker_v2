import {formatNbr} from './formatNbr.js';
import React,{useState} from 'react';

export const GetStartDateTime = () => {
  const timeElapsed = Date.now();
  const timeNow = new Date(timeElapsed);
  // console.log(timeNow);
  return timeNow;
};

// -----------------------------------------



export	const chronometer = (sec,setSec,min, setMin,hrs,setHrs,day,setDay) => {		
	setSec((sec) => sec+1);
	if(sec >= 60){
		setSec(0);
		setMin((min) => min+1);
		if(min >= 60){
			setMin(0);
			setHrs((hrs) => hrs+1);
			if(hrs >= 24){
				setHours(0);
				setDay((day) => day+1);
			}
		}
	}
} 
