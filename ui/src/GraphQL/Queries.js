import { gql } from '@apollo/client';

export const LOAD_DATA = gql`
  query Query {
    listFiches {
      user
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
      comment
      processing
      lastUpdate
    }
    listTypeTaches {
      id
      name
      objectif
    }
    listStatCom {
      id
      name
    }
    listStatIvpn {
      id
      name
    }
    idCounter {
      _id
      current
    }
  }
`;

export const FILTRED_FICHE = gql`
  query SearchFiches($input: SearchFichesInputs) {
    searchFiches(input: $input) {
      user
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
      comment
      processing
      id
      lastUpdate
    }
  }
`;
