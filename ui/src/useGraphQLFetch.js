import React, { useState, useEffect } from 'react';
const dateRegex = '^\\d\\d\\d\\d-\\d\\d-\\d\\d';

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

export default function useGraphQLFetch() {
  const [count, setCount] = useState(0);

  return (
    <React.Fragment>
      <h1>Test {count}</h1>
      <button onClick={() => setCount(count + 1)}>click me</button>
    </React.Fragment>
  );
}
