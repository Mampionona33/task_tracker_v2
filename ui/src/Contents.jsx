import React from 'react'; 
import {Switch, Route,Redirect} from 'react-router-dom';

import DashBoard from './dashboard/DashBoard.jsx';

const NotFound = ()=> <h1>Page Not Found </h1>;

export default function Contents(){
	return(
		<Switch>
			<Redirect exact from="/" to"/DashBoard" />
			<Route path="/DashBoard" component={DashBoard}/>
		<Switch/>
	)
}