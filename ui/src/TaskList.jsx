import React, { useState, useEffect } from 'react';
import {} from 'babel-polyfill';

const dateRegex = '^\\d\\d\\d\\d-\\d\\d-\\d\\d';

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

function TaskList() {
  const [fiches, setFiches] = useState(null);

  /* useEffect((query, variables = {}) => {
    console.log('use effect run');
    fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    }).then((res) => {
      const body = res.json;
      console.log(body, jsonDateReviver);
    });
  }, []); */

  return (
    <React.Fragment>
      <h1>List fiche test</h1>
      <button>click</button>
    </React.Fragment>
  );
}

export default TaskList;
