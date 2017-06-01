import { combineReducers } from 'redux';

//import individual reducers:
import getAllPosts from './app/getAllPosts.js';
import getAllUsers from './app/getAllUsers.js';
import getUser from './app/getUser.js';
import initialState from './app/initialState.js';


//import actions:
import { SET_INITIAL_STATE, REQUEST_USER_INFO, RECEIVE_USER_INFO, GET_PROFILE, REQUEST_ALL_USERS, RECEIVE_ALL_USERS, REQUESTING_POSTS, RECEIVING_POSTS, DISPLAY_USER_PREVIEW, HIDE_USER_PREVIEW, SET_ACTIVE_POST, CLEAR_ACTIVE_POST, SET_USERPAGE_ID, SHOW_LOCK, LOCK_SUCCESS, LOCK_ERROR,TOGGLE_AFFILIATION,REQUEST_SUBMIT_POST,SUBMIT_POST_CONFIRMATION, CLEAR_USERPAGE_ID,REQUEST_ACCEPT_ALLY,RETRIEVE_ACCEPT_ALLY,REQUEST_DELETE_POST, RETRIEVE_DELETE_POST,SET_WALL_STATE} from '../actions/index';

const mainApp = (state = initialState, action) => {
  switch(action.type){
    case SET_INITIAL_STATE:
      return state;
    case REQUEST_USER_INFO:
      return getUser(state,action);
    case SET_USERPAGE_ID:
      return setUserPageId(state,action);
    case CLEAR_USERPAGE_ID:
      return clearUserPageId(state,action);
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
    case SHOW_LOCK:
      return showLock(state,action);
    case LOCK_SUCCESS:
      return lockSuccess(state,action);
    case LOCK_ERROR:
      return lockError(state,action);
    case TOGGLE_AFFILIATION:
      return toggleAffiliation(state,action);
    case REQUEST_SUBMIT_POST:
      return submitPost(state,action);
    case REQUEST_DELETE_POST:
      return deletePost(state,action);
    case RETRIEVE_DELETE_POST:
      return deletePost(state,action);
    case SUBMIT_POST_CONFIRMATION:
      return submitPost(state,action);
    case REQUEST_ACCEPT_ALLY:
      return acceptAlly(state,action);
    case RETRIEVE_ACCEPT_ALLY:
      return acceptAlly(state,action);
    case SET_WALL_STATE:
      return setWallState(state,action);
    default:
      return state;
  }
}

//set wall state:
const setWallState = (state={wall:'public'},action)=>{
  switch(action.type){
    case SET_WALL_STATE:
      return{
        ...state,
        wall:action.uid
      }
    }
}

//delete Post:
const deletePost = (state={posts:{},postsUpdated:false},action) => {
  switch(action.type) {
    case REQUEST_DELETE_POST:
      return {
        ...state,
        isPosting:true
      }
    case RETRIEVE_DELETE_POST:
      // return
        // Object.assign({},state,{
        //   isPosting: false,
        //   postsUpdated:true,
        //   posts:action.results
        // })
      let posts = action.results;
      console.log('returning these posts: ',posts);
      return{
        ...state,
        isPosting: false,
        postsUpdated:true,
        posts
      }
      default:
        return state;
  }
}

//submit post:
const submitPost = (state={posts:{}},action) => {
  switch(action.type) {
    case REQUEST_SUBMIT_POST:
      return {
        ...state,
        isSubmitting:true
      }
    case SUBMIT_POST_CONFIRMATION:
      console.log('reducks');
      let posts = action.results;
      return{
        ...state,
        isSubmitting: false,
        posts
      }
      default:
        return state;
  }
}

//accept Ally:
const acceptAlly = (state={user:''},action) => {
  switch(action.type) {
    case REQUEST_ACCEPT_ALLY:
      return {
        ...state,
        isPosting:true
      }
    case RETRIEVE_ACCEPT_ALLY:
      return
        Object.assign({},state,{
          isPosting: false,
          user:action.results
        })
        // ...state,
        // isPosting: false,
        // user:action.results
      default:
        return state;
  }
}



//toggle affiliation:
const toggleAffiliation = (state={
  affiliation:''
},action)=>{
  switch(action.type){
    case TOGGLE_AFFILIATION:
      return{
        ...state,
        affiliation:action.affiliation
      }
    default:
      return state;
  }
};

//auth0-lock
const showLock = (state={lockShowing:false},action) =>{
  switch(action.type){
    case SHOW_LOCK:
    return{
      ...state,
      lockShowing:true
    }
  }
};

const lockSuccess = (state={profile:{}},action) =>{
  switch(action.type){
    case LOCK_SUCCESS:
      console.log('the token is:: ',action.token);
    return{
      ...state,
      profile:action.profile,
      token:action.token
    }
  }
};

const lockError = (state={profile:{},token:''},action) =>{
  switch(action.type){
    case LOCK_ERROR:
    return{
      ...state,
      lockError:action.err
    }
  }
};

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
        activePost:''
      }
    default:
      return state;
  }
};

//set user page id:
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

//clear user page id:
const clearUserPageId = (state={userPageId:''},action) => {
  switch(action.type) {
    case CLEAR_USERPAGE_ID:
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
