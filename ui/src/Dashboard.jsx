import React, { useEffect, useState } from 'react';
import graphQLFetch from './graphQLFetch.jsx';

// impot components
import SubmitTask from './SubmitTask.jsx';

export default function DashBoard() {
  const [data, setData] = useState({});
  
  async function loadData(){	  
    const query = `query SearchFiches($input: SearchFichesInputs) {
  searchFiches(input: $input) {
    id
    typeTrav
    cat
    numFiche
    statuCom
    statuIvpn
	submiteState
  }
}`;
    const vars = {
	  "input": {
		
	  }
	};   
	
	const data = await graphQLFetch(query,vars);
	
	if(data){
		setData(data.searchFiches);
	}
  }			
  
  console.log(data);
		
  useEffect(() => {
	  loadData();
  }, []);

  return (
    <React.Fragment>
      <SubmitTask/>
    </React.Fragment>
  );
}
