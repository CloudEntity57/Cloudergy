import React, {Component} from 'react';
import jquery from 'jquery';
import UserHeader from './UserHeader';
import NavLink from './NavLink';
// import PostsUser from './PostsUser';
import Posts from './Posts';
let functionsModule = require('./Functions');
let Functions = new functionsModule();

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mainApp,fetchPosts, fetchAllUsers,
fetchUserInfo,
saveProfile, clearUserPageId, setWallState } from '../actions/index';

class UserPage extends Component{
  constructor(props){
    super(props);
    // const profile = this.props.auth.getProfile();
    this.state={
      updated:false,
      posts:[]
    }
  }
  componentWillMount(){
    //filter user's posts:
    console.log('user page mounting');
    // const profile = this.props.auth.getProfile();
    // this.props.fetchUserInfo(profile.clientID);
    const profile = this.props.profile;
    //save user's third party info to store:
    // this.props.saveProfile(profile);
    // //find and store all users and posts currently in the API database:
    this.props.fetchAllUsers('');
    this.props.fetchUserInfo('');
    this.props.fetchPosts('');

    let user;
    let auth = this.props.auth;
    let userid=this.props.userPageId;

    // let userid=(this.props.params.userid) ? this.props.params.userid.toString() : '';
    console.log('app js auth: ',auth);
    let clientID = (userid !== '') ? userid : profile.clientID;
    this.setState({
      user:this.props.currentUserId
    });
    this.configureUser(clientID,userid);

  }
  updatePosts(){
    let posts=this.props.posts;
    console.log('updating!!!');
    this.props.fetchPosts('');
    // this.forceUpdate();
  }
  componentDidMount(){
    console.log('remounting');
    let user;
    let auth = this.props.auth;
    let userid=this.props.userPageId;
    // let userid=(this.props.params.userid) ? this.props.params.userid.toString() : '';
    console.log('app js auth: ',auth);
    const profile = auth.getProfile();
    let clientID = (userid !== '') ? userid : profile.clientID;
    // this.setState({
    //   user:this.props.currentUserId
    // });
    this.configureUser(clientID,userid);
  }

  componentWillReceiveProps(nextProps) {
    let auth = this.props.auth;
    const profile = auth.getProfile();
    let userPageid=nextProps.userPageId;
    //redux action to change global 'wall' state to this user's id:
    this.props.setWallState(userPageid);
    console.log('userpage uid: ',userPageid);
    console.log('current user in userpage: ',userPageid);
    let targetURL = "http://localhost:3001/user/";
    let nextAccountId = (this.props.user.length > 0) ? this.props.user[0].userid : '';
    this.configureUser(userPageid,nextAccountId);
    //remove currentUserId
}
configureUser(postUserId,currentuser){

  this.setState({
    username:'',
    userpic:'',
    allies:[],
    userid:postUserId
  });

  //replaced jquery user query with user from store:
  let user = (this.props.usersObject !== undefined) ? this.props.usersObject[postUserId] : {allies: [],username:'',userpic:'',user:''};
    console.log('the query is finished!',user);
    let allies=[];
    this.setState({
      username:user.username,
      userpic:user.largephoto,
      user:user
    });
    let allyList = user.allies;
    let len = allyList.length;
    console.log('len: ',len);
    for(let i=0; i<len; i++){
      let ally = this.props.usersObject[allyList[i]];
        console.log('adding ',ally,' to the allies array');
        allies.push(ally);
          console.log('final list of allies: ',allies);
          this.setState({
            allies:allies
          });
    }
  //set up individual user's posts:
    // let querystring = "http://localhost:3001/posts";
    //replace api query for all posts with posts in store:

        let posts = (this.props.posts.length>0) ? this.props.posts : [];
        posts = posts.reverse();
        console.log('userpage posts: ',posts);
        console.log('currentID: ',currentuser);
        posts = posts.filter((user)=>{
          if(user.uid == postUserId){
            return user.postedon == 'NA'
          }else{
            return user.uid == postUserId || user.postedon == postUserId
          }
        });
        let results = [];

        for(let i=0; i<posts.length; i++){
          let uidGlobalPost = posts[i].uid;
          let uidOfWallPoster = posts[i].postedon;
          if((posts[i].uid == postUserId) || (posts[i].postedon == postUserId)){
            console.log('userpage uid: ',postUserId);
            console.log('compared to: ',uidGlobalPost);
            results.push(posts[i]);
            console.log('posts is now: ',results);
            // results = results.reverse()
          }
      }
      // results=results.reverse();
      this.setState({
        posts:results
      });
  }
  render(){
    console.log('wall state: ',this.props.wall);
    console.log('rendering userpage');
    // const profile = this.props.auth.getProfile();
    let posts = (this.state.posts) ? this.state.posts : '';
    console.log('posts in userpage: ',posts);
    const username = (this.state.username) ? this.state.username : '';
    const userpic = (this.state.userpic) ? this.state.userpic : '';
    const currentUser = this.props.user;
    // const user = (this.state.profile) ? (this.state.profile[0]) : '';
    const user = (this.state.user) ? this.state.user : '';
    console.log('user page user: ',user);
    const userid = (this.state.user) ? this.state.user.userid : '';
    const me = (this.props.user.length>0) ? this.props.user : {};
    console.log('me in userpage: ',me);
    console.log('user in userpage: ',user,' userid: ',userid);
    let allies = (this.state.allies) ? this.state.allies.map((ally)=>{
      let allyLink = '/user/'+ally.userid;
      return(
        <NavLink to={allyLink}>
          <a href="#">
            <div className='ally-pic'>
              <img className='img-responsive' src={ally.largephoto} />
              <div className='ally-name'>{ally.username}</div>
            </div>
          </a>
       </NavLink>
      );
    }) : '';
    let allynumber = (this.state.allies) ? this.state.allies.length : '';
    console.log('ally number: ',allynumber);
    console.log('user allies: ',this.state.allies);
    // const userpic = user.picture;
    // console.log('user pic: ',userpic);
    return(
      <div>
      <div className="outer-wrapper">
      </div>
      <div className="wrapper">
        <div className="user-panel">
          <UserHeader me={me} pageuser={user} username={username} userid={userid} userpic={userpic} />
          <div className="user-page-container">
            <div className="panel panel-default friends-panel">
              <div className="friends-panel-header">
                <i className="fa fa-child"></i>
                <i className="fa fa-child"></i> Allies&nbsp;&middot;&nbsp;<span>{ allynumber }</span>
              </div>
                {allies}
            </div>
            <div className="user-posts-container">
              {/* <PostsUser posts={posts} userid={userid} user={user} currentUser={currentUser}/> */}
              <Posts update={this.updatePosts.bind(this)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state,ownProps){
  console.log('ownProps: ',ownProps.match.params.userid);
  state = state.allReducers.mainApp;
  let user = state.user;
  let posts = state.posts;
  let users = state.users;
  // let userPageId = state.userPageId;
  let usersObject = state.usersObject;
  let wall = state.wall;
  let auth = state.auth;
  let profile = state.profile;
  return{
    user,
    users,
    usersObject,
    posts,
    userPageId:ownProps.match.params.userid,
    auth,
    wall
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    mainApp,fetchPosts, fetchAllUsers,
    fetchUserInfo,
    saveProfile,
    clearUserPageId,
    setWallState
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(UserPage);
