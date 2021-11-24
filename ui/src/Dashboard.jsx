import React, { useEffect, useState } from 'react';
import axios from 'axios';
import graphQLFetch from './graphQLFetch.jsx';

// import dotenv from 'dotenv/config'

export default function DashBoard() {
  const [data, setData] = useState({ listFiches: [] });

  useEffect(() => {
    const query = `query listFiches{
      listFiches{
        id typeTrav cat
      }
    }`;
    const vars = {};    
    graphQLFetch(query, vars);
  }, []);

  return (
    <React.Fragment>
      <h1>Place holder dashboard test </h1>
    </React.Fragment>
  );
}
