import {formatNbr} from './formatNbr.js';
import React,{useState} from 'react';

export const GetStartDateTime = () => {
  const timeElapsed = Date.now();
  const timeNow = new Date(timeElapsed);
  console.log(timeNow);
  return timeNow;
};

// -----------------------------------------



export const chronometer  = () => {
	const [milSec, setMilSec] = useState(0);
	const [sec, setSec] = useState(0);
	const [min, setMin] = useState(0);
	const [hrs, setHrs] = useState(0);
	const [day, setDay] = useState(0);
	const [output, setOutput] = useState(``);
	
	setMilSec(milSec => milSec+1);
	if(milSec >= 1000 ){
		setMilSec(0);
		setSec(sec => sec+1);
		if(sec >= 60){
			setSec(0);
			setMin(min => min+1);
			if(min >= 60){
				setMin(0);
				setHrs(hrs => hrs+1);
				if(hrs >= 24){
					setHours(0);
					setDay(day => day+1);
				}
			}
		}
	}
	setOutput(`${formatNbr(day)}:${formatNbr(hrs)}:${formatNbr(min)}:${formatNbr(sec)}`)
}


/* export const chronometer = () => {
	let time;
	time = setInterval(tick(),1000);
	return time;
} */