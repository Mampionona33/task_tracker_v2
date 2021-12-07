import {ADD_FICHE} from './type.js';
import listTache from '../loadListTache.js'

const initialStateFiche = {
	fiche : {}
}

const reducerFiche = (state= initialStateFiche, action) => {
	switch(action.type){
		case ADD_FICHE:
		{
			return{
				...state,
				fiche: state.fiche
			}
		}
		break;
		default:
			return state;
	}
}

export default reducerFiche;