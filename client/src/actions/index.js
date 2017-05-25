import fetch from 'isomorphic-fetch';

export const SET_INITIAL_STATE = "SET_INITIAL_STATE";
export const SET_AUTH = "SET_AUTH";
export const GET_PROFILE = "GET_PROFILE";

export const socialApp = (state) => ({
  type:SET_INITIAL_STATE,
  state
})

export const setAuth = (auth) => ({
  type:SET_AUTH,
  auth
})

export const saveProfile = (profile) =>({
  type:GET_PROFILE,
  profile:profile
})
export const SET_ACTIVE_POST = "SET_ACTIVE_POST";
export const setActivePost = (postid) =>({
  type:SET_ACTIVE_POST,
  post:postid
})
export const CLEAR_ACTIVE_POST = "CLEAR_ACTIVE_POST";
export const clearActivePost = () =>({
  type:CLEAR_ACTIVE_POST,
  post:''
})

export const DISPLAY_USER_PREVIEW = "DISPLAY_USER_PREVIEW";
export const displayUserPreview = () =>({
  type:DISPLAY_USER_PREVIEW,
  previewing:true
})
export const HIDE_USER_PREVIEW = "HIDE_USER_PREVIEW";
export const hideUserPreview = () =>({
  type:HIDE_USER_PREVIEW,
  previewing:false
})

export const SET_USERPAGE_ID = "SET_USERPAGE_ID";
export const setUserPageId = (id) =>({
  type:SET_USERPAGE_ID,
  id
})

export const TOGGLE_AFFILIATION = "TOGGLE_AFFILIATION"
export const toggleAffiliation = (affiliation) => ({
  type:TOGGLE_AFFILIATION,
  affiliation
})


//fetch API call to get user info:
let apiCall = (reqType, recType, url1,url2) => {
    const reqFunc = (arg) => ({
        type: reqType,
        arg
    })

    const recFunc = (arg, json) => ({
        type: recType,
        arg,
        results:json,
        receivedAt:Date.now()
    })

    const fetchFunc = arg => dispatch =>{
      console.log('action creator go');
        dispatch(reqFunc(arg))
        return fetch(url1+arg+url2)
        .then(response => response.json())
        .then((json) => {console.log('action creator json: ',json); dispatch(recFunc(arg,json))})
    }
    return fetchFunc;
}
let data;
let postApiCall = (reqType, recType, data, url1,url2) => {
    const reqFunc = (arg) => ({
        type: reqType,
        arg
    })

    const recFunc = (arg, json) => ({
        type: recType,
        arg,
        results:json,
        receivedAt:Date.now()
    })

    const postFunc = arg => dispatch =>{
      console.log('action creator go');
        dispatch(reqFunc(arg))
        return fetch(url1+arg+url2,
        {
          method:'POST',
          data:data
        })
        .then(response => response.json())
        .then((json) => {console.log('post json: ',json); dispatch(recFunc(arg,json))})
    }
    return postFunc;
}
export const REQUEST_USER_INFO = "REQUEST_USER_INFO";
export const RECEIVE_USER_INFO = "RECEIVE_USER_INFO";

export const fetchUserInfo = apiCall(REQUEST_USER_INFO, RECEIVE_USER_INFO,'http://localhost:3001/user/','');

export const REQUEST_ALL_USERS = "REQUEST_ALL_USERS";
export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";

export const fetchAllUsers = apiCall(REQUEST_ALL_USERS,RECEIVE_ALL_USERS,'http://localhost:3001/user/','');

export const REQUESTING_T0_POST_PROFILE_INFO = "REQUESTING_T0_POST_PROFILE_INFO";
export const RECEIVING_POST_CONFIRMATION = "RECEIVING_POST_CONFIRMATION";

//get all posts:

export const REQUESTING_POSTS = "REQUESTING_POSTS";
export const RECEIVING_POSTS = "RECEIVING_POSTS";

export const fetchPosts = apiCall(REQUESTING_POSTS, RECEIVING_POSTS,'http://localhost:3001/posts','');

//create user
export const createNewUser = postApiCall(REQUESTING_T0_POST_PROFILE_INFO,RECEIVING_POST_CONFIRMATION,data=null,'http://localhost:3001/user/','');

//auth0 actions:
export const SHOW_LOCK = 'SHOW_LOCK'
export const LOCK_SUCCESS = 'LOCK_SUCCESS'
export const LOCK_ERROR = 'LOCK_ERROR'
function showLock() {
  return {
    type: SHOW_LOCK
  }
}

function lockSuccess(profile, token) {
  return {
    type: LOCK_SUCCESS,
    profile,
    token
  }
}

function lockError(err) {
  return {
    type: LOCK_ERROR,
    err
  }
}

const authid = process.env.REACT_APP_AUTH0_CLIENT_ID;
const authdomain = process.env.REACT_APP_AUTH0_DOMAIN;
import Auth0Lock from 'auth0-lock'
const lock = new Auth0Lock(authid, authdomain);

export function login() {
  // display lock widget
  return dispatch => {
    lock.show();
  }
}

// Listen to authenticated event and get the profile of the user
export function doAuthentication() {
  console.log('doing auth');
    return dispatch => {
      lock.on("authenticated", function(authResult) {
            lock.getProfile(authResult.idToken, function(error, profile) {

              if (error) {
                // handle error
                return dispatch(lockError(error))
              }
              console.log('redux profile: ',profile, ' redux id token: ',authResult.idToken);
              localStorage.setItem('profile', JSON.stringify(profile))
              localStorage.setItem('id_token', authResult.idToken)
              return dispatch(lockSuccess(profile,authResult.idToken))
            });
      });
    }
}
