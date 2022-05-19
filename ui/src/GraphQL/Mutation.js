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
      elapstedTime
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

export const UPDATE_TASK_TYPE = gql`
  mutation TypeTacheUpdate($filter: FilterById, $update: TachesInputs) {
    typeTacheUpdate(filter: $filter, update: $update) {
      id
      name
      objectif
    }
  }
`;

export const CREAT_TASK_TYPE = gql`
  mutation TypeTachesAdd($typeTache: TachesInputs) {
    typeTachesAdd(typeTache: $typeTache) {
      id
      name
      objectif
    }
  }
`;

export const DELETE_TASK_TYPE = gql`
  mutation TypeTacheDelete($filter: FilterById) {
    typeTacheDelete(filter: $filter) {
      acknowledged
      deletedCount
    }
  }
`;

export const UPDATE_STATU_COM = gql`
  mutation StatComUpdate($filter: FilterById, $update: StatComInput) {
    statComUpdate(filter: $filter, update: $update) {
      id
      name
    }
  }
`;

export const CREAT_STATU_COM = gql`
  mutation StatComAdd($statCom: StatComInput) {
    statComAdd(statCom: $statCom) {
      _id
      id
      name
    }
  }
`;

export const DELETE_STATU_COM = gql`
  mutation StatComDelete($filter: FilterById) {
    statComDelete(filter: $filter) {
      acknowledged
      deletedCount
    }
  }
`;

export const CREAT_STATU_IVPN = gql`
  mutation StatIvpnAdd($statIvpn: StatIvpnInput) {
    statIvpnAdd(statIvpn: $statIvpn) {
      id
      name
    }
  }
`;

export const DELETE_STATU_IVPN = gql`
  mutation StatIvpnAdd($filter: FilterById) {
    statIvpnDelete(filter: $filter) {
      acknowledged
      deletedCount
    }
  }
`;

export const UPDATE_MESSAGE = gql`
  mutation SetAboutMessage($message: String) {
    setMessage(message: $message)
  }
`;
