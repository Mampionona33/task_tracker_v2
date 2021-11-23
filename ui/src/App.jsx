import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import css from './App.css'

// import components
import Page from './Page.jsx';

const element = (
  <Router>
    <Page />
  </Router>
);

ReactDOM.render(element, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
