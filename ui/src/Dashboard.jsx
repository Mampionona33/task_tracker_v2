import React, { useEffect, useState } from 'react';
import graphQLFetch from './graphQLFetch.jsx';
import { Grid } from '@mui/material';

// impot components
import SubmitTask from './SubmitTask.jsx';
import InProgress from './InProgress.jsx';

export default function DashBoard() {
  const [data, setData] = useState([]);

  async function loadData() {
    /* const query = `query SearchFiches($input: SearchFichesInputs) {
  searchFiches(input: $input) {
    id
    typeTrav
    cat
    numFiche
    statuCom
    statuIvpn
	submiteState
  }
}`; */
    const vars = {};

    const query = `query listFiches {
    listFiches {
      id
      typeTrav
      cat
      numFiche
      statuCom
      statuIvpn
      url
      state
      submiteState
      nbBefor
      nbAft
      startDate
      validDate
      duree
      productivity
    }
  }`;

    const data = await graphQLFetch(query, vars);

    if (data) {
      setData(data.listFiches);
    }
  }

  // comptage occurence submiteState === true
  // const list = data.filter((item) => item.submiteState === true);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <React.Fragment>
      <Grid container sx={{ padding: 3 }} spacing={2}>
        <SubmitTask data={data} />
        <InProgress />
      </Grid>
    </React.Fragment>
  );
}
