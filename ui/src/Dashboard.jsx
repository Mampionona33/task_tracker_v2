import React, { useEffect, useState } from 'react';
import graphQLFetch from './graphQLFetch.jsx';

export default function DashBoard() {
  const [data, setData] = useState({ listFiches: [] });

  useEffect(() => {
    const query = `query SearchFiches($input: SearchFichesInputs) {
  searchFiches(input: $input) {
    id
    typeTrav
    cat
    numFiche
    statuCom
    statuIvpn
  }
}`;
    const vars = {
	  "input": {
		"numFiche": "4"
	  }
	};    
    graphQLFetch(query,vars);
  }, []);

  return (
    <React.Fragment>
      <h1>Place holder dashboard test </h1>
    </React.Fragment>
  );
}
