// Le plus haut niveau des composantes
import React from 'react';
import ReactDOM from 'react-dom';
import TaskList from './TaskList.jsx';
import 'babel-polyfill';

// Initialisation de l'element tasklist
const element = <TaskList />;

// Rendue de l'elemetent tasklist dans la page index.html en selectionnnant l'id root
ReactDOM.render(element, document.getElementById('root'));
