import { gql } from '@apollo/client';

export const ADD_FICHE = gql`
  mutation FichesAdd($fiche: FichesInputs!) {
    fichesAdd(fiche: $fiche) {
      user {
        name
        given_name
        username
        family_name
        nickname
        picture
        locale
        phone_number
        phone_number_verified
        preferred_username
        profile
        sub
        update_at
        website
        zoneinfo
        created_at
        email
        email_verified
        last_password_reset
        user_id
      }
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
      user {
        name
        given_name
        username
        family_name
        nickname
        picture
        locale
        phone_number
        phone_number_verified
        preferred_username
        profile
        sub
        update_at
        website
        zoneinfo
        created_at
        email
        email_verified
        last_password_reset
        user_id
      }
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
