import graphQLFetch from './graphQLFetch.jsx';

export default loadListTache = async () => {
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
  return data;
};
