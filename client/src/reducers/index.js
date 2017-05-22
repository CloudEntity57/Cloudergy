import { combineReducers } from 'redux';

//import individual reducers:
import getAllPosts from './app/getAllPosts.js';
import getAllUsers from './app/getAllUsers.js';
import getUser from './app/getUser.js';
import initialState from './app/initialState.js';


//import actions:
import { SET_INITIAL_STATE, REQUEST_USER_INFO, RECEIVE_USER_INFO, GET_PROFILE, REQUEST_ALL_USERS, RECEIVE_ALL_USERS, REQUESTING_POSTS, RECEIVING_POSTS, DISPLAY_USER_PREVIEW, HIDE_USER_PREVIEW, SET_ACTIVE_POST, CLEAR_ACTIVE_POST, SET_USERPAGE_ID} from '../actions/index';

const mainApp = (state = initialState, action) => {
  switch(action.type){
    case SET_INITIAL_STATE:
      return state;
    case REQUEST_USER_INFO:
      return getUser(state,action);
    case SET_USERPAGE_ID:
      return setUserPageId(state,action);
    case RECEIVE_USER_INFO:
      return getUser(state,action);
    case GET_PROFILE:
      return getProfile(state,action);
    case REQUEST_ALL_USERS:
      return getAllUsers(state,action);
    case RECEIVE_ALL_USERS:
      return getAllUsers(state,action);
    case REQUESTING_POSTS:
      return getAllPosts(state,action);
    case RECEIVING_POSTS:
      return getAllPosts(state,action);
    case DISPLAY_USER_PREVIEW:
      return displayUserPreview(state,action);
    case HIDE_USER_PREVIEW:
      return hideUserPreview(state,action);
      case SET_ACTIVE_POST:
        return setActivePost(state,action);
      case CLEAR_ACTIVE_POST:
        return clearActivePost(state,action);
    default:
      return state;
  }
}

//toggle user preview:
const displayUserPreview = (state={
  user_preview_showing:false
},action)=>{
  switch(action.type){
    case DISPLAY_USER_PREVIEW:
      return{
        ...state,
        user_preview_showing:action.previewing
      }
    default:
      return state;
  }
};

const hideUserPreview = (state={
  user_preview_showing:false
},action)=>{
  switch(action.type){
    case HIDE_USER_PREVIEW:
      return{
        ...state,
        user_preview_showing:action.previewing
      }
    default:
      return state;
  }
};

const setActivePost = (state={
  activePost:false
},action)=>{
  switch(action.type){
    case SET_ACTIVE_POST:
      return{
        ...state,
        activePost:action.post
      }
    default:
      return state;
  }
};

const clearActivePost = (state={
  activePost:false
},action)=>{
  switch(action.type){
    case CLEAR_ACTIVE_POST:
      return{
        ...state,
        activePost:action.post
      }
    default:
      return state;
  }
};

//get user profile info from third party account:
const setUserPageId = (state={userPageId:''},action) => {
  switch(action.type) {
    case SET_USERPAGE_ID:
      return {
        ...state,
        userPageId:action.id
      }
    default:
      return state;
  }
}

//get user profile info from third party account:
const getProfile = (state={profile:{}},action) => {
  switch(action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile:action.profile
      }
    default:
      return state;
  }
}



const allReducers = combineReducers({
  mainApp
});

export default allReducers;
