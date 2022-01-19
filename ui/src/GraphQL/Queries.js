import { gql } from '@apollo/client';

export const LOAD_DATA = gql`
  query Query {
    listFiches {
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
      elapstedTime
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
      submiteState
      nbBefor
      nbAft
      startDate
      validDate
      elapstedTime
      productivity
      comment
      processing
      id
      lastUpdate
    }
  }
`;
