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
import { socialApp, toggleAffiliation, fetchUserInfo, acceptAlly,login,doAuthentication } from '../actions/index';

class Header extends Component{
  constructor(props){
    super(props);
    this.props.doAuthentication();
    // this.props.fetchUserInfo();
    this.state={
      affiliation:'',
      previewingAlly:false,
      displaylogin:false,
      previewingGlobal:false
    }
  }
  componentWillMount(){
    console.log('mounting header');
    // let user = Functions.getCurrentUser();
    // console.log('user in header: ',user);
    console.log('affiliation display: ',this.props.affiliation_display);
    let potential_allies = this.getPotentialAllies();
    this.setState({
      affiliation:this.props.affiliation_display,
      potential_allies
    });

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
    ally_invitations_received = user[0].ally_invitations_received;
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
  toggleAllyRequest(e){
    console.log('toggling');
    e.preventDefault();
    let previewingAlly = (this.state.previewingAlly) ? false : true;
    this.setState({
      previewingAlly:previewingAlly
    });
    if(this.state.previewingAlly){
      jquery('.invites').remove();
    }
  }

  toggleAlert(e){
    console.log('toggling');
    e.preventDefault();
    let previewingGlobal = (this.state.previewingGlobal) ? false : true;
    this.setState({
      previewingGlobal:previewingGlobal
    });
    if(this.state.previewingAlly){
      jquery('.invites').remove();
    }
  }
  acceptAlly(e){
    e.preventDefault();
    const allyId = e.target.id;
    const userId = this.state.user[0].userid;
    let invitations_list;
    console.log('ally accepted: ',allyId);
    this.props.acceptAlly({allyId,userId});
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
    console.log('ignoring request');
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
  clearDisplay(){

  }
  render(){
      let token = this.state.token;
      console.log('token in header: ',token);
    // let user = (this.state.user) ? this.state.user : '';
    // if(this.props.user !==''){
      let user, uid, userpic, ally_invitations_received, allyRequestNumber,username, affiliation,allyReqs;
      user = (this.props.user !=='' && this.props.token) ? this.props.user : [{userid:'',ally_invitations_received:[], allyRequestNumber,username, affiliation,allyReqs,potential_allies}];
      ally_invitations_received = user[0].ally_invitations_received;
      allyRequestNumber = (ally_invitations_received.length > 0) ? (<div className="invites">{ally_invitations_received.length}</div>) : '';
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

//ally request dropdown
        if(potential_allies.length>0 && potential_allies[0].hasOwnProperty('userid')){
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
                <a onClick={this.acceptAlly.bind(this)} href="#">
                  <span id={val.userid} className='accept-button'>
                    Accept
                  </span>
                </a>
        {/* Ignore button */}
                <a onClick={this.ignoreRequest.bind(this)} href="#">
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


  // potential_allies = this.props.user[0].potential_allies;
      console.log('potential allies: ',potential_allies);
  //Build individual Ally Request tab HTML:

    console.log('userpic render: ',userpic);

    let previewText = (ally_invitations_received.length>0) ? 'Ally Requests' : 'No New Updates';
    let allyPreview = (this.state.previewingAlly) ?
    (
      <div key="./Header" className="ally-request-dropdown">
        {previewText}
        {allyReqs}
      </div>
    ) : '';
    let globalPreview = (this.state.previewingGlobal) ?
    (
      <div key="./Header" className="ally-request-dropdown">
        {previewText}
        {allyReqs}
      </div>
    ) : '';
    console.log('aff in render: ',affiliation);
    console.log('user pic: ',userpic);
    let userlink = "/user/"+uid;
    // let userimg = (this.props.profile.hasOwnProperty('name')) ? ( <img className="user-pic" src={userpic} alt="user pic" /> ) : '';

    let loginlinks = (this.state.displaylogin) ? (
      <div onMouseLeave={()=>this.toggleLogin()} className="loginlinks">
        <ul>
          <a href="#"><li onClick={()=>this.handleClick()}>Log In</li></a>
          <a href="#"><li onClick={()=>this.handleClick()}>Sign Up</li></a>
        </ul>
      </div>
    ) : '';

    // let usericon = (this.props.profile.hasOwnProperty('name')) ? (
    //   <span>
    //     <NavLink to={userlink}>
    //       <a className="header-navlink" href="#">
    //         <img className="user-pic" src={userpic} alt="user pic" />
    //         {username}&nbsp;
    //       </a>
    //     </NavLink>
    //   </span>
    // ) : (
    //   <span>
    //     <a onClick={this.toggleLogin.bind(this)} className="header-navlink" href="#">
    //       <div className="fa fa-user-o usericon"></div>
    //       { loginlinks }
    //     </a>
    //   </span>
    // );
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

    // let userlogout = (this.props.profile.hasOwnProperty('name')) ? (
    //   <div><a className="log-out" onClick={this.props.logOut} href="#">Logout</a></div>
    // ) : '';
    let userlogout = (this.state.token !==null) ? (
      <div><a className="log-out" onClick={this.props.logOut} href="#">Logout</a></div>
    ) : (
      <div><a className="log-out" onClick={()=>this.handleClick()} href="#">Join/login</a></div>
    );

    // let usercontrols = (this.props.profile.hasOwnProperty('name')) ? (
    //   <span>
    //     <div className="fa fa-globe">
    //     </div>
    //     <div className="ally-request-holder">
    //       <a onClick={this.toggleAllyRequest.bind(this)} href="#" className="fa fa-handshake-o">
    //       </a>
    //       {allyRequestNumber}
    //       {allyPreview}
    //     </div>
    //   </span>
    // ) : '';
    let usercontrols = (
      <span>
        <div className="ally-request-holder">
          <a onClick={this.toggleAllyRequest.bind(this)} href="#" className="fa fa-globe">
          </a>
          {allyRequestNumber}
          {allyPreview}
        </div>
        <div className="ally-request-holder">
          <a onClick={this.toggleAlert.bind(this)} href="#" className="fa fa-handshake-o">
          </a>
          {allyRequestNumber}
          {globalPreview}
        </div>
      </span>
    );
    return(
      <header onClick={()=>this.clearDisplay()} className={this.props.affiliation_display}>

        <div className="outer-nav-wrapper">
          <div className="nav">
            <span className="site-title">CouchPolitics</span> &nbsp;
            {/* <input type="text" name="search" placeholder="Search CouchPolitics" /> */}

            <div className="navbar-nav nav-right">
              {userlogout}
              {/* <div><a className="log-out" onClick={this.props.logOut} href="#">Logout</a></div> */}
              <span>
                <select ref="politics" onChange={this.toggle_affiliation.bind(this)} value={this.props.affiliation_display} className="header-toggle" name="user-affiliation" id="">
                  <optgroup value="Choose">
                    <option value="conservative">Conservative</option>
                    <option value="liberal">Liberal</option>
                    <option value="none">None</option>
                  </optgroup>
                </select>
              </span>

              {/* <NavLink to={userlink}>
                <a className="header-navlink" href="#">
                  {userimg}
                  {username}&nbsp;
                </a>
              </NavLink> */}
              {usericon}
              <NavLink to="/"><a href="#">Home</a></NavLink>&nbsp;

              {/* <div className="fa fa-globe">
              </div>
              <div className="ally-request-holder">
                <a href="#" onClick={this.toggleAllyRequest.bind(this)} className="fa fa-handshake-o">
                </a>
                {allyRequestNumber}
                {allyPreview}
              </div> */}
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
    token
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    socialApp,
    toggleAffiliation,
    fetchUserInfo,
    acceptAlly,
    login,
    doAuthentication,
    push
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
