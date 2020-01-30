import { combineReducers } from 'redux';
import gameInfoReducer from './gameInfo';
import userInfoReducer from './userInfo';
import errorReducer from './error';

const rootReducer = combineReducers({
  gameInfo: gameInfoReducer,
  userInfo: userInfoReducer,
  error: errorReducer
});

export default rootReducer;