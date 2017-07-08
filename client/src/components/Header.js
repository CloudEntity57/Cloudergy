import React, {Component} from 'react';
import NavLink from './NavLink';
import UserPic from './UserPic';
import DropButton from './DropButton';
import { hashHistory } from 'react-router';
let functionsModule = require('./Functions');
let Functions = new functionsModule();
import jquery from 'jquery';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { socialApp, toggleAffiliation, fetchUserInfo,fetchPosts, acceptAlly,login,doAuthentication,fetchNotifications,fetchGlobalNotifications,notificationsSeen,globalNotificationsSeen,clearLikeNotify,ignoreAlly, logoutUser } from '../actions/index';

class Header extends Component{
  constructor(props){
    super(props);
    this.props.doAuthentication();
    this.state={
      affiliation:'',
      previewingAlly:false,
      displaylogin:false,
      previewingGlobal:false,
      notifications:'',
      globalNotifications:''
    }
  }
  componentWillMount(){
    console.log('mounting header');
    // let user = Functions.getCurrentUser();
    // console.log('user in header: ',user);
  }
  componentWillReceiveProps(nextProps){
    let token = localStorage.getItem('id_token');
    console.log('user token for app: ',token);
    this.setState({
      token
    });
    let uid= this.props.uid;
    let user = {};
    if(nextProps.user.length>0){
      user = (nextProps.user[0].hasOwnProperty('userid')) ? nextProps.user : {};
    }
    let affiliation = user.affiliation;
    console.log('props affiliation: ',affiliation);
    // let affiliation = nextProps.affiliation;
    this.refs.politics.value = affiliation;
    console.log('uid in header: ',uid);
    // let user;
    let userid = user.userid;

    //put potential allies, invitations received into state
    // let user = this.props.user;
    this.setState({
      user
    });

    //user ally notifications:
    if(nextProps.notifications !==''){
      let notifications = nextProps.notifications[0];
      console.log('header notifications: ',notifications);
      //put all notification data in local state:
      this.setState({
        notifications
      });
    }
    //user global notifications:
    if(nextProps.globalNotifications !==''){
      let globalNotifications = nextProps.globalNotifications[0];
      console.log('header globalNotifications: ',globalNotifications);
      //put all notification data in local state:
      this.setState({
        globalNotifications
      });
    }
    let likeposts = (nextProps.posts) ? nextProps.posts : '';
    console.log('likeposts: ',likeposts);

    //user ally notifications:
    console.log('affiliation display: ',nextProps.affiliation_display);
    let potential_allies = this.getPotentialAllies();
    this.setState({
      affiliation:nextProps.affiliation_display,
      potential_allies
    });

    // let potential_allies = this.getPotentialAllies();
    // this.setState({
    //   affiliation:this.props.affiliation,
    //   potential_allies
    // });
  //   let user = (nextProps.user) ? nextProps.user : {};
  //   console.log('user in header: ',user);
  //   let potential_allies = [];
  //   if(user[0].hasOwnProperty('userid')){user[0].ally_invitations_received.map((ally)=>{
  //     let newally = nextProps.users[ally];
  //     potential_allies.push(newally);
  //   });
  // }
  //   this.setState({
  //     user:user,
  //     potential_allies:potential_allies,
  //     ally_invitations_received:user[0].ally_invitations_received
  //   });

    Functions.getUser(userid).then((val)=>{
      let user = nextProps.user;
      console.log('user in header: ',user);
      let potential_allies = [];
      user[0].ally_invitations_received.map((ally)=>{
        Functions.getUser(ally).then((val)=>{
          potential_allies.push(val);
          if(potential_allies.length==user[0].ally_invitations_received.length){
            this.setState({
              potential_allies:potential_allies
            });
          }
        });
      });
      this.setState({
        user:user,
        ally_invitations_received:user[0].ally_invitations_received
      });
    });
  }
  getPotentialAllies(){
    let user, users, uid, userpic, ally_invitations_received, allyRequestNumber,username, affiliation,allyReqs,potential_allies;
    user = (this.props.user !=='') ? this.props.user : [{userid:'',ally_invitations_received:[], allyRequestNumber,username, affiliation,allyReqs,potential_allies}];
    console.log('user in header: ',user);
    users = (this.props.users.length > 0) ? this.props.users : [];
    uid = user[0].userid;
    userpic = user[0].photo;
    username = user[0].username;
    affiliation = user[0].affiliation;
    // ally_invitations_received = user[0].ally_invitations_received;
    console.log('get potential allies notifications: ',this.state.notifications);
    ally_invitations_received = (this.state.notifications) ? this.state.notifications.ally_invitations : '';
    console.log('invites: ',ally_invitations_received);
    potential_allies = [];
    if (ally_invitations_received.length>0){
      ally_invitations_received.map((ally)=>{
        // this.props.fetchUserInfo(ally).then((val)=>{
        //   potential_allies.push(val);
        // });
        console.log('all their info: ',users);
        let result = users.filter((val)=>{return val.userid==ally})[0]
        console.log('and the answer: ',result);
        potential_allies.push(result);
      });
      return potential_allies;
    }else{
      return [];
    }
  }
  toggle_affiliation(e){
    console.log('working in Header.js!');
    let affiliation = e.target.value;
    console.log('affiliation: ',affiliation);
    this.setState({
      affiliation:affiliation
    });
    this.props.toggleAffiliation(affiliation);
    // this.props.toggle_affiliation(affiliation);
    //create redux for ^^^^

  }


  acceptAlly(e){
    e.preventDefault();
    const allyId = e.target.id;
    const userId = this.state.user[0].userid;
    let invitations_list;
    console.log('ally accepted: ',allyId);
    this.props.acceptAlly({allyId,userId});
    this.setState({
      previewingAlly:false
    });
  }

  updateInvitesList(invitations_list){
    console.log('calling updateInvitesList');
    console.log('invites: ',invitations_list);
    jquery('.invites').remove();
    this.setState({
      ally_invitations_received:invitations_list,
      previewingAlly:false
    });
  }
  ignoreRequest(e){
    e.preventDefault();
    const allyId = e.target.id;
    const userId = this.state.user[0].userid;
    console.log('ignoring request');
    let data = {
      allyId,
      userId
    }
    this.props.ignoreAlly(data);
    this.setState({
      previewingAlly:false
    });
  }
  toggleLogin(e){
    e.preventDefault();
    console.log('toggling');
    let loginstate = this.state.displaylogin;
    this.setState({
      displaylogin:!loginstate
    })
  }
  handleClick(e){
    // e.preventDefault();
    console.log('clickking');
    this.props.login();
    this.props.push('/');
  }
  goToNews(e){
    this.props.push('/');
  }

  toggleAllyRequest(e){
    let user = this.props.user[0].userid
    console.log('toggling',user);
    e.preventDefault();
    let previewingAlly = (this.state.previewingAlly) ? false : true;
    this.setState({
      previewingAlly:previewingAlly,
      previewingGlobal:false
    });
    // if(this.state.previewingAlly){
    //   jquery('.invites').remove();
    // }
    this.props.globalNotificationsSeen(user);
  }

  toggleAlert(e){
    let user = this.props.user[0].userid
    console.log('toggling',user);
    e.preventDefault();
    let previewingGlobal = (this.state.previewingGlobal) ? false : true;
    this.setState({
      previewingGlobal:previewingGlobal,
      previewingAlly:false
    });

    this.props.notificationsSeen(user);
  }

  clearLikeNotify(e){
    e.preventDefault();
    console.log('clearing like notify: ',e.target.id);
    this.setState({
      previewingGlobal:false,
      previewingAlly:false
    });
    let data = {
      liked_id:e.target.id,
      userid:this.props.user[0].userid
    }
    this.props.clearLikeNotify(data);
  }
  checkAuth(){
    if(this.props.token){
      console.log('checking');
    }else{
      this.props.login()
    }
  }
  render(){

    let likeposts = (this.props.posts !==undefined) ? this.props.posts : '';
      let token = this.state.token;
      console.log('token in header: ',token);
    // let user = (this.state.user) ? this.state.user : '';
    // if(this.props.user !==''){
      let user, uid, userpic, ally_invitations_received, allyRequestNumber,globalUpdateNumber,username, affiliation,allyReqs;
      user = (this.props.user !=='' && this.props.token) ? this.props.user : [{userid:'',ally_invitations_received:[], allyRequestNumber,username, affiliation,allyReqs,potential_allies}];
      ally_invitations_received = user[0].ally_invitations_received;
      let likeNotifications;

      uid = '123456';
      userpic = "http://ijmhometutors.com/tutor/server/php/files/51b855e98abd7a5143c4d0176c119c0e/picture/avatar.png";
      username = 'Guest';
      affiliation = 'none';

      if(this.state.token){
        uid = user[0].userid;
        userpic = user[0].photo;
        username = user[0].username;
        affiliation = user[0].affiliation;
      }
      console.log('user in header render: ',user);
      // let potential_allies = this.state.potential_allies;
      let potential_allies = this.getPotentialAllies();
        console.log('potential allies render: ',potential_allies);

        //red user ally notifications icon:

        if(this.state.notifications){
          let notifications = this.state.notifications;
          console.log('notifications in render: ',notifications);
          let n = notifications;
          let ally_invitations_received = n.ally_invitations
          // let invites = (n.ally_invitations.length !==0) ? n.ally_invitations.length : '';
          let invites = n.read;
          // allyRequestNumber = (
          //   n.read ==false
          // ) ? (<div className="invites">{invites}</div>) : '';
          allyRequestNumber = (
            n.read > 0
          ) ? (<div className="invites">{invites}</div>) : '';

        }
        //red user global notifications icon:

        let likenumber=0;
        let replynumber=0;

        let liker_list = [];
        let replier_list = [];
        let likes_list = [];
        if(this.state.globalNotifications && this.props.token){

          let globalNotifications = this.state.globalNotifications;
          console.log('globalNotifications in render: ',globalNotifications);
          let n = globalNotifications;
          let likes = n.likes;
          let replies = n.replies;
          console.log('replies in render',replies);
          console.log('likes in render: ',likes);
          //make a list of liker objects and find number of likes:
          likes.map((val)=>{
            console.log('like val: ',val);
            if(val.read ==false){
              likenumber++;
            }
            console.log('users in header render: ',this.props.users);
            liker_list= this.props.users.filter((user)=>{
              if(user.userid == val.liker){
                user.thing_liked = val.id
                return user;
              }
              // return user.userid == val.liker;
            });
          //get the list of likes instead:
            likes_list = n.likes;
            // console.log('liker in render: ',liker);
          });
          // console.log('liker list in render: ',liker_list);
          for(let val in replies){
            // console.log('like val: ',val);
            replynumber++;
          };
          let updatesnumber = likenumber;
          console.log('updatesnumber: ',updatesnumber);
          globalUpdateNumber = (
            updatesnumber>0
          ) ? (<div className="global-invites">{updatesnumber}</div>) : '';
        }


              console.log('likes_list: ',likes_list);
              if(likes_list.length>0 && this.props.token){
                console.log('likes_listGlobeNotes: ',likes_list);
              likeNotifications = likes_list.map((val)=>{
                let username = this.props.users.filter((user)=>{
                  return user.userid == val.liker;
                });
                console.log('likes_posts: ',this.props.posts);
                let thing_liked = this.props.posts.filter((foo)=>{
                  console.log('thing_list: ',foo);
                  if(foo._id == val.post){
                    // console.log('thinglist match',foo);
                     return foo;
                   }
                });
                thing_liked = thing_liked[0];
                if(!thing_liked){
                  return null;
                }
                console.log('thing_liked: ',thing_liked);
                console.log('username_header: ',username);
                console.log('like val: ',val);
                if(!val) return '';
                  return (
                    <div id={val.liker} className="ally-invitation-tab clearfix">
                    <div className="col-xs-3"></div>
                      <div className="like-notification col-xs-12">
                        {username[0].username} likes {thing_liked.text}
                      </div>
                      <div className="col-xs-12">
                      <a onClick={this.clearLikeNotify.bind(this)} href="#">
                        <span id={val.id} className='ok-button'>
                          Ok
                        </span>
                      </a>
                      <UserPic userid={val.liker} />
                    </div>
                  </div>
                  );
              });
              console.log('likeNotifications: ',likeNotifications);
            }

        //ally request dropdown
                if(potential_allies !==undefined && potential_allies.length>0 && potential_allies[0].hasOwnProperty('userid') && this.props.token){
                allyReqs = potential_allies.map((val)=>{
                  console.log('user val: ',val);
                  if(!val) return '';
                    return (
                      <div id={val.userid} className="ally-invitation-tab clearfix">
                        <div className="col-xs-12">
                          {val.username} would like to be your ally!
                        </div>
                        <div className="col-xs-12">
                {/* Accept button */}
                        <a id={val.userid} onClick={this.acceptAlly.bind(this)} href="#">
                          <span id={val.userid} className='accept-button'>
                            Accept
                          </span>
                        </a>
                {/* Ignore button */}
                        <a id={val.userid} onClick={this.ignoreRequest.bind(this)} href="#">
                          <span id={val.userid} className='accept-button'>
                            Ignore
                          </span>
                        </a>
                        <UserPic userid={val.userid} />
                      </div>
                    </div>
                    );
                });
              }
                console.log('allyreqs: ',allyReqs);


        let allyPreviewText = (ally_invitations_received.length>0) ? 'Ally Requests' : 'No New Ally Requests';
        let globalPreviewText = (likenumber>0) ? 'Latest Activity' : 'All caught up!';
        let globalPreview = (this.state.previewingAlly) ?
        (
          <div key="./Header" className="ally-request-dropdown">
            {globalPreviewText}
            {likeNotifications}
          </div>
        ) : '';
        let allyPreview = (this.state.previewingGlobal) ?
        (
          <div key="./Header" className="ally-request-dropdown">
            {allyPreviewText}
            {allyReqs}
          </div>
        ) : '';
        console.log('aff in render: ',affiliation);
        console.log('user pic: ',userpic);
        let userlink = "/user/"+uid;





  // potential_allies = this.props.user[0].potential_allies;
      console.log('potential allies: ',potential_allies);
  //Build individual Ally Request tab HTML:

    console.log('userpic render: ',userpic);


    // let userimg = (this.props.profile.hasOwnProperty('name')) ? ( <img className="user-pic" src={userpic} alt="user pic" /> ) : '';

    let loginlinks = (this.state.displaylogin) ? (
      <div onMouseLeave={()=>this.toggleLogin()} className="loginlinks">
        <ul>
          <a href="#"><li onClick={()=>this.handleClick()}>Log In</li></a>
          <a href="#"><li onClick={()=>this.handleClick()}>Sign Up</li></a>
        </ul>
      </div>
    ) : '';

    let usericon =(
      <span>
        <NavLink to={userlink}>
          <a className="header-navlink" href="#">
            <img className="user-pic" src={userpic} alt="user pic" />
            {username}&nbsp;
          </a>
        </NavLink>
      </span>
    );

    let userlogout = (this.state.token !==null) ? (
      <div><a className="log-out" onClick={this.props.logoutUser} href="#">Logout</a></div>
    ) : (
      <div><a className="log-out" onClick={()=>this.handleClick()} href="#">Join/login</a></div>
    );

    let usercontrols = (
      <span>
        <div className="ally-request-holder">
          <a onClick={this.toggleAllyRequest.bind(this)} href="#" className="fa fa-globe">
          </a>
          {globalUpdateNumber}
          {globalPreview}
        </div>
        <div className="ally-request-holder">
          <a onClick={this.toggleAlert.bind(this)} href="#" className="fa fa-handshake-o">
          </a>
          {allyRequestNumber}
          {allyPreview}
        </div>
      </span>
    );
    return(
      <header /*onClick={()=>this.clearDisplay()}*/ className={this.props.affiliation_display}>

        <div className="outer-nav-wrapper">
          <div className="nav">
            <span onClick={this.goToNews.bind(this)} className="site-title">CouchPolitics</span> &nbsp;
            <div className="navbar-nav nav-right">
              {userlogout}
              <span>
                <select ref="politics" onChange={this.toggle_affiliation.bind(this)} value={this.props.affiliation_display} className="header-toggle" name="user-affiliation" id="">
                  <optgroup value="Choose">
                    <option value="conservative">Conservative</option>
                    <option value="liberal">Liberal</option>
                    <option value="none">None</option>
                  </optgroup>
                </select>
              </span>
              {usericon}
              <NavLink to="/"><a href="#">Home</a></NavLink>&nbsp;
              { usercontrols }
            </div>
          </div>
        </div>
        <div className="nav-buffer">
        </div>
      </header>
    );
  }
}

function mapStateToProps(state){
  console.log('header state: ',state);
  let previewingAlly = state.allReducers.mainApp.previewingAlly;
  let affiliation = state.allReducers.mainApp.affiliation;
  let affiliation_display = state.allReducers.mainApp.affiliation_display;
  let auth = state.allReducers.mainApp.auth;
  let profile = state.allReducers.mainApp.profile;
  let user = state.allReducers.mainApp.user;
  let loggedIn = state.allReducers.mainApp.loggedIn;
  let users = state.allReducers.mainApp.users;
  let authenticated = state.allReducers.mainApp.authenticated;
  let token = state.allReducers.mainApp.token;
  let notifications = state.allReducers.mainApp.notifications;
  let globalNotifications = state.allReducers.mainApp.globalNotifications;
  let posts = state.allReducers.mainApp.posts;
  return{
    previewingAlly,
    affiliation,
    affiliation_display,
    authenticated,
    auth,
    user,
    profile,
    loggedIn,
    users,
    token,
    notifications,
    globalNotifications,
    posts
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    socialApp,
    toggleAffiliation,
    fetchPosts,
    fetchUserInfo,
    acceptAlly,
    login,
    doAuthentication,
    push,
    fetchNotifications,
    fetchGlobalNotifications,
    notificationsSeen,
    globalNotificationsSeen,
    clearLikeNotify,
    ignoreAlly,
    logoutUser
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
