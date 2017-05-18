import { combineReducers } from 'redux';

//auth
import AuthService from '../utils/AuthService';
const authid = process.env.REACT_APP_AUTH0_CLIENT_ID;
const authdomain = process.env.REACT_APP_AUTH0_DOMAIN;
const auth = new AuthService(authid, authdomain);
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/' })
  }
}

const initialState = {
  //auth:
  auth:auth,
  //app.js:
  profile:{},
  updated:false,
  affiliation:'',
  //newsfeed:
  test:'',
  stories:[],
  affiliation:'none',
  editing:false,
  //userpage:
  usrpg_updated:false,
  usrpg_posts:[],
  //userpanel:
  expanded:false,
  //userPic:
  up_user:{},
  //header:
  affiliation:'',
  previewingAlly:false,
  //account:
  updated:false,
  //postheader:
  ph_userpreview:false,
  toggleStatus:false,
  myPost:false,
  postId:'',
  //post:
  pst_user:{},
  //posts:
  editing:false,
  user:{},
  posts:{},
  //postheaderuser:
  phu_userpreview:false,
  phu_user:{},
  //signedin:
  loggedIn:false,
  //landingpage:
  loggedIn:false,
}

//import actions:
import { SET_INITIAL_STATE, REQUEST_USER_INFO, RECEIVE_USER_INFO } from '../actions/index';

const mainApp = (state = initialState, action) => {
  switch(action.type){
    case SET_INITIAL_STATE:
      return state;
    case REQUEST_USER_INFO:
      return getUser(state,action);
    case RECEIVE_USER_INFO:
      return getUser(state,action);
    default:
      return state;
  }
}

//get user info API call reducer:
const getUser = (state={user:{},isFetching:false,lastUpdated:''},action) => {
  console.log('userSubmitted run');
  switch(action.type) {
    case REQUEST_USER_INFO:
      return {
        ...state,
        isFetching:true
  }
    case RECEIVE_USER_INFO:
      return {
        ...state,
        isFetching:false,
        user:action.results,
        lastUpdated:action.receivedAt
      }
    default:
      return state;
  }
}

const allReducers = combineReducers({
  mainApp
});

export default allReducers;
