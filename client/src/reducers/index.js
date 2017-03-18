import { combineReducers } from 'redux';
// import SiteReducer from './reducer-website';
import UserReducer from './reducer-users';

const allReducers = combineReducers({
  user:UserReducer
});

export default allReducers
