import {createStore, combineReducers} from 'redux';
import reducerFiche from './fiches/reducerFiche.js';

const rootReducer = combineReducers({
	fiche : reducerFiche,
})

const store = createStore(rootReducer);

export default store;