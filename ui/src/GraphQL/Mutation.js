import { gql } from '@apollo/client';

export const ADD_FICHE = gql`
  mutation FichesAdd($fiche: FichesInputs!) {
    fichesAdd(fiche: $fiche) {
      user
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
      lastUpdate
      processing
    }
  }
`;

export const UPDATE_FICHE = gql`
  mutation FichesUpdate($filter: FilterById, $update: UpdateFiches) {
    fichesUpdate(filter: $filter, update: $update) {
      user
      processing
      comment
      productivity
      nbAft
      startDate
      validDate
      duree
      submiteState
      nbBefor
      state
      url
      statuIvpn
      numFiche
      statuCom
      typeTrav
      cat
      lastUpdate
    }
  }
`;
