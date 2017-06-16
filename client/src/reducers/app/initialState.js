//auth
import AuthService from '../../utils/AuthService';
const authid = process.env.REACT_APP_AUTH0_CLIENT_ID;
const authdomain = process.env.REACT_APP_AUTH0_DOMAIN;
const auth = new AuthService(authid, authdomain);
let token = localStorage.getItem('id_token');
console.log('user token for app: ',token);
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/' })
  }
}
let rand=Math.random();
const initialState = {
  rand:rand,
  activePost:'',
  userPageId:'',
  postsUpdated:false,
  wall:'public',
  invites_sent:[],
  invites_received:[],
  affiliation_display:'none',
  metadata:'',
  users:[],
  storyLink:'',
  //auth:
  auth:auth,
  token:token,
  //app.js:
  profile:{},
  updated:false,
  //newsfeed:
  test:'',
  stories:[],
  affiliation:'none',
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
  user_preview_showing:false,
  toggleStatus:false,
  myPost:false,
  postId:'',
  notifications:'',
  //posts:
  editing:false,
  user:[{
    "_id": {
        "$oid": "58f66b22a53d2954c9f580fb"
    },
    "first_name": "Joe",
    "last_name": "User",
    "photo": "http://ijmhometutors.com/tutor/server/php/files/51b855e98abd7a5143c4d0176c119c0e/picture/avatar.png",
    "largephoto": "http://ijmhometutors.com/tutor/server/php/files/51b855e98abd7a5143c4d0176c119c0e/picture/avatar.png",
    "userid": "123456",
    "__v": 0,
    "username": "Guest",
    "privacy":"everyone",
    "affiliation": "liberal",
    "education": "Bachelor's",
    "location": "Houston, TX",
    "work": "Artist/Musician/Web Developer",
    "user_story": "I'm an all-around renaissance man, living life to the fullest and doing the best I can. And I have a radical plan.",
    "allies": [
        "54321",
        "J20zp56UZbPRlZ9eB1u41sBs9qXJxBVY",
        "12345"
    ],
    "ally_requests_sent": [],
    "ally_invitations_received": []
}],
  // user:'',
  posts:{},
  //signedin:
  loggedIn:false,
  //landingpage:
  loggedIn:false,
}

export default initialState;
