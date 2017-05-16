import { combineReducers } from 'redux';

const initialState = {
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
import { SET_INITIAL_STATE } from '../actions/index';

const mainApp = (state = initialState, action) => {
  switch(action.type){
    case SET_INITIAL_STATE:
      return state;
      break;
    default:
      return state;
      break;
  }
}

const allReducers = combineReducers({
  mainApp
});

export default allReducers;
