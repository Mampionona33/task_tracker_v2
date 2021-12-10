import { gql } from '@apollo/client';

export const LOAD_DATA = gql`
  query Query {
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
      comment
      processing
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
  }
`;

export const SEARCH_FICHE_BY_ID = gql`
  query SearchFiches($input: SearchFichesInputs) {
    searchFiches(input: $input) {
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
    }
  }
`;
