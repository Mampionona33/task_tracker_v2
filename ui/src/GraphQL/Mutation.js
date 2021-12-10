import { gql } from '@apollo/client';

export const ADD_FICHE = gql`
  mutation FichesAdd($fiche: FichesInputs!) {
    fichesAdd(fiche: $fiche) {
      typeTrav
      cat
      numFiche
      statuCom
      statuIvpn
      url
      state
      nbBefor
      nbAft
      startDate
      validDate
      submiteState
      comment
    }
  }
`;
