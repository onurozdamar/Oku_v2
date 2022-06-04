import {combineReducers} from 'redux';
import bookReducer from '../book/reducers/book.reducer';

const createReducer = () => combineReducers({bookReducer: bookReducer});

export default createReducer;
