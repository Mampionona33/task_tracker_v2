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
