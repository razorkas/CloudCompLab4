import { combineReducers } from 'redux';
import lab3Reducer from './lab3Reducer';
import lab4Reducer from './lab4Reducer';
import errorReducer from './errorReducer';

export default combineReducers({
  lab3: lab3Reducer,
  lab4: lab4Reducer,
  errors: errorReducer
});
