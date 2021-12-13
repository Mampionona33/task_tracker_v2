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
      processing
    }
  }
`;

export const UPDATE_FICHE = gql`
  mutation FichesUpdate($filter: FilterById, $update: UpdateFiches) {
    fichesUpdate(filter: $filter, update: $update) {
      processing
    }
  }
`;
