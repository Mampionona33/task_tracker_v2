import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import css from './App.css';
import {Provider} from 'react-redux';
import store from './redux/store.js';

// import components
import Page from './Page.jsx';

const element = (
	<Provider store={store}>
	  <Router>
		<Page />
	  </Router>
	</Provider>
);

ReactDOM.render(element, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
