import React, { useEffect, useState } from 'react';
import axios from 'axios';

// import dotenv from 'dotenv/config'

export default function DashBoard() {
  const [data, setData] = useState({ listFiches: [] });

  useEffect(() => {
    const fetchData = async () => {
      const query = `query listFiches{
        listFiches{
          id typeTrav cat
        }
      }`;
      // call GRAPHQL API
      const queryResult = await axios.post('http://localhost:3000/graphql', {
        query: query,
      });
      // Update component state
      const result = queryResult.data.data;
      setData({ listFiches: result.listFiches });
      console.log(result.listFiches);
      console.log(result.listFiches.length);
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <h1>Place holder dashboard test </h1>
    </React.Fragment>
  );
}
