import React from 'react';
import ReactDOM from 'react-dom';
import css from './App.css'

import TaskList from './TaskList.jsx';

const element = <TaskList />;

ReactDOM.render(element, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
