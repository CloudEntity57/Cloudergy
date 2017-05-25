import {REQUEST_ALL_USERS, RECEIVE_ALL_USERS} from '../../actions/index.js';

const getAllUsers = (state={users:{}},action) => {
  switch(action.type) {
    case REQUEST_ALL_USERS:
      return {
        ...state,
        isFetching:true
      }
    case RECEIVE_ALL_USERS:
      let usersObject = {};
      for(let i=0; i<action.results.length; i++){
        let uid = action.results[i].userid;
        console.log('adding ',action.results[i].userid, ' to array');
        usersObject[uid]=action.results[i];
      };
      return {
        ...state,
        isFetching: false,
        users:action.results,
        usersObject
      }
      default:
      return state;
  }
}

export default getAllUsers;
