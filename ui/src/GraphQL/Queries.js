import { gql } from '@apollo/client';

export const LOAD_TYPE_DATA = gql`
	query Query {
	  listStatIvpn {
		name
		id
	  }
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
	  listTypeTaches {
		name
		objectif
	  }
	}`;