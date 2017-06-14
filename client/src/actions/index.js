import fetch from 'isomorphic-fetch';
import axios from 'axios';

export const SET_INITIAL_STATE = "SET_INITIAL_STATE";
export const SET_AUTH = "SET_AUTH";
export const GET_PROFILE = "GET_PROFILE";

let apiRoot;
switch(process.env.REACT_APP_ENV){
  case 'dev':
    apiRoot = "http://localhost:8080/";
  break;
  case 'production':
    apiRoot = "https://couchpolitics.herokuapp.com/";
  break;
}
console.log('api root is: ',apiRoot);

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

export const CLEAR_USERPAGE_ID = "CLEAR_USERPAGE_ID";
export const clearUserPageId = () =>({
  type:CLEAR_USERPAGE_ID,
  id:''
})

export const TOGGLE_AFFILIATION = "TOGGLE_AFFILIATION"
export const toggleAffiliation = (affiliation) => ({
  type:TOGGLE_AFFILIATION,
  affiliation
})

export const SET_WALL_STATE = "SET_WALL_STATE"
export const setWallState = (uid) => ({
  type:SET_WALL_STATE,
  uid
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
let postApiCall = (reqType, recType, url1,url2) => {
    const reqFunc = (arg) => ({
        type: reqType,
        arg
    })

    const recFunc = (arg, data) => ({
        type: recType,
        arg,
        results:data,
        receivedAt:Date.now()
    })

    const postFunc = arg => dispatch =>{
      console.log('action creator go: ',arg);
        dispatch(reqFunc(arg,data))
        return axios.post(url1,
        {
          method:'POST',
          payload:arg
        })
        .then(response => response.data)
        .then((data) => {console.log('post data: ',data); dispatch(recFunc(arg,data))})
    }
    return postFunc;
}

//message privacy edit
export const REQUEST_EDIT_PRIVACY = 'REQUEST_EDIT_PRIVACY';
export const RECEIVE_EDIT_PRIVACY = 'RECEIVE_EDIT_PRIVACY';

export const editPrivacy= postApiCall(REQUEST_EDIT_PRIVACY,RECEIVE_EDIT_PRIVACY,apiRoot+"editprivacy/","");


//replies
export const REQUEST_UPDATE_PROFILE = 'REQUEST_UPDATE_PROFILE';
export const RECEIVE_UPDATE_PROFILE = 'RECEIVE_UPDATE_PROFILE';

export const updateProfile= postApiCall(REQUEST_UPDATE_PROFILE,RECEIVE_UPDATE_PROFILE,apiRoot+"updateprofile/","");

//replies
export const REQUEST_REPLY_COMMENT = 'REQUEST_REPLY_COMMENT';
export const RECEIVE_REPLY_COMMENT = 'RECEIVE_REPLY_COMMENT';

export const replyComment= postApiCall(REQUEST_REPLY_COMMENT,RECEIVE_REPLY_COMMENT,apiRoot+"replycomment/","");

//like post
export const REQUEST_LIKE_POST = 'REQUEST_LIKE_POST';
export const RECEIVE_LIKE_POST = 'RECEIVE_LIKE_POST';

export const likePost = postApiCall(REQUEST_LIKE_POST,RECEIVE_LIKE_POST,apiRoot+"likepost/","");

//like comment
export const REQUEST_LIKE_COMMENT = 'REQUEST_LIKE_COMMENT';
export const RECEIVE_LIKE_COMMENT = 'RECEIVE_LIKE_COMMENT';

export const likeComment = postApiCall(REQUEST_LIKE_COMMENT,RECEIVE_LIKE_COMMENT,apiRoot+"likecomment/","");

//cancel alliance
export const REQUEST_CANCEL_ALLIANCE = 'REQUEST_CANCEL_ALLIANCE';
export const RECEIVE_CANCEL_ALLIANCE = 'RECEIVE_CANCEL_ALLIANCE';

export const cancelAlliance= postApiCall(REQUEST_CANCEL_ALLIANCE,RECEIVE_CANCEL_ALLIANCE,apiRoot+"cancelalliance/","");

//send ally request
export const REQUEST_ALLY_REQ = 'REQUEST_ALLY_REQ';
export const RECEIVE_ALLY_REQ = 'RECEIVE_ALLY_REQ';

export const requestAlly= postApiCall(REQUEST_ALLY_REQ,RECEIVE_ALLY_REQ,apiRoot+"allyrequest/","");

//delete comment
export const REQUEST_DELETE_COMMENT = "REQUEST_DELETE_COMMENT"
export const RETRIEVE_DELETE_COMMENT = "RETRIEVE_DELETE_COMMENT"
export const deleteComment = postApiCall(REQUEST_DELETE_COMMENT,RETRIEVE_DELETE_COMMENT,apiRoot+"deletecomment");

export const REQUEST_POST_COMMENT = "REQUEST_POST_COMMENT"
export const RETRIEVE_POST_COMMENT = "RETRIEVE_POST_COMMENT"
export const submitComment = postApiCall(REQUEST_POST_COMMENT,RETRIEVE_POST_COMMENT,apiRoot+"postcomment");

export const REQUEST_DELETE_POST = "REQUEST_DELETE_POST"
export const RETRIEVE_DELETE_POST = "RETRIEVE_DELETE_POST"
export const deletePost = postApiCall(REQUEST_DELETE_POST, RETRIEVE_DELETE_POST,apiRoot+"deletepost");

export const REQUEST_ACCEPT_ALLY = "REQUEST_ACCEPT_ALLY"
export const RETRIEVE_ACCEPT_ALLY = "RETRIEVE_ACCEPT_ALLY"
export const acceptAlly = postApiCall(REQUEST_ACCEPT_ALLY, RETRIEVE_ACCEPT_ALLY,apiRoot+"acceptally");

export const REQUEST_USER_INFO = "REQUEST_USER_INFO";
export const RECEIVE_USER_INFO = "RECEIVE_USER_INFO";

export const fetchUserInfo = apiCall(REQUEST_USER_INFO, RECEIVE_USER_INFO,apiRoot+'user/','');

export const REQUEST_ALL_USERS = "REQUEST_ALL_USERS";
export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";

export const fetchAllUsers = apiCall(REQUEST_ALL_USERS,RECEIVE_ALL_USERS,apiRoot+'user/','');

//get all posts:

export const REQUESTING_POSTS = "REQUESTING_POSTS";
export const RECEIVING_POSTS = "RECEIVING_POSTS";

export const fetchPosts = apiCall(REQUESTING_POSTS, RECEIVING_POSTS,apiRoot+'posts','');

//create user
export const REQUESTING_TO_POST_PROFILE_INFO = "REQUESTING_TO_POST_PROFILE_INFO";
export const RECEIVING_POST_CONFIRMATION = "RECEIVING_POST_CONFIRMATION";

export const createNewUser = postApiCall(REQUESTING_TO_POST_PROFILE_INFO,RECEIVING_POST_CONFIRMATION,apiRoot+'user/','');

//submit post:
export const REQUEST_SUBMIT_POST = 'REQUEST_SUBMIT_POST';
export const SUBMIT_POST_CONFIRMATION = 'SUBMIT_POST_CONFIRMATION';

export const submitPost =
postApiCall(REQUEST_SUBMIT_POST,SUBMIT_POST_CONFIRMATION,apiRoot+"post/","");

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
    token,
    authenticated:true
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
  console.log('doing authentication in actions');
    return dispatch => {
      lock.on("authenticated", function(authResult) {
        console.log('youre authentic');
            lock.getProfile(authResult.idToken, function(error, profile) {
              if (error) {
                // handle error
                // console.log('auth error!');
                return dispatch(lockError(error))
              }
              console.log('redux profile: ',profile, ' redux id token: ',authResult.idToken);
              localStorage.setItem('profile', JSON.stringify(profile))
              localStorage.setItem('id_token', authResult.idToken)
              return dispatch(lockSuccess(profile,authResult.idToken))
            });
      });

      console.log('auth error');
    }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    authenticated: false,
    user:''
  }
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    dispatch(receiveLogout())
  }
}
