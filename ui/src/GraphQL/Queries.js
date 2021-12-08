import { gql } from '@apollo/client';

export const LOAD_LIST_TACHE = gql`
  query listFiches {
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
  }
`;
