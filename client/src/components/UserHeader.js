import React, { Component } from 'react';
import NavLink from './NavLink';
import { hashHistory } from 'react-router';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { socialApp, toggleAffiliation, fetchUserInfo, acceptAlly,login,cancelAlliance,requestAlly } from '../actions/index';
import { push } from 'react-router-redux';
let newModule = require('./Functions');
let Functions = new newModule();

class UserHeader extends Component{
  constructor(props){
    super(props);
    this.state = {
      allydropdown:false,
      cancelModal:false,
      confirmModal:false
    }
  }
  componentWillReceiveProps(nextProps){
    let user = (nextProps.me.length>0) ? nextProps.me[0] : '';
    console.log('you:',user);
    const userid=nextProps.userid;
    let them = (nextProps.usersObject !== undefined) ? nextProps.usersObject[userid] : '';
    console.log('them:',them);
    let allystatus;
    if(user !== undefined && them !== undefined){
      allystatus = Functions.friendStatus(them,user);
      console.log('allystatus: ',allystatus);
      this.setState({
        allystatus
      });
    }
  }
  editProfile(e){
    e.preventDefault();
    this.props.push('/account');
  }
  offerAllegiance(e){
    e.preventDefault();
    console.log('target: ',e.target);
    let userid = this.props.userid;
    let me = this.props.me[0].userid;
    let data = {
      ally_request:userid,
      user:me
    }
    console.log('allegiance data: ',data);
    this.props.requestAlly(data);
  }
  cancelAllegiance(e){
    e.preventDefault();
    this.setState({
      cancelModal:true
    });
  }
  confirmCancel(e){
    e.preventDefault();
    console.log('cancel userid: ',e.target.id);
    let data = {
      allyid:e.target.id,
      userid:this.props.user[0].userid
    }
    this.props.cancelAlliance(data);
    this.setState({
      cancelModal:false,
      confirmModal:true
    });
  }
  acceptAlly(e){
    e.preventDefault();
  }
  showDropdown(){
    console.log('showing');
    this.setState({
      allydropdown:true
    })
  }
  hideDropdown(){
    this.setState({
      allydropdown:false
    })
  }
  hideCancel(e){
    e.preventDefault();
    this.setState({
      cancelModal:false
    })
  }
  hideConfirm(e){
    e.preventDefault();
    this.setState({
      confirmModal:false
    })
  }
  render(){
    let allystatus = this.state.allystatus;
    const userid=(this.props.userid !==undefined) ? this.props.userid : '';
  let allydropdown = (this.state.allydropdown) ?
  (<a onClick={this.cancelAllegiance.bind(this)} className="allydropdown-cancel" href="#"><li>Cancel</li></a>) : '';
    let allybutton;
    switch(allystatus){
      case true:
        allybutton = (<a onMouseEnter={this.showDropdown.bind(this)} onMouseLeave={this.hideDropdown.bind(this)} href="#"><li className='relative'>Allies{allydropdown}</li></a>);
        break;
      case false:
        allybutton = (<a id={userid} onClick={this.offerAllegiance.bind(this)} href="#"><li className='relative'>Request Ally</li></a>);
        break;
      case 'you_invited_them':
        allybutton = (<a href="#"><li className='relative'>Pending Ally</li></a>);
        break;
      case 'they_invited_you':
        allybutton = (<a onClick={()=>this.acceptAllyRequest.bind(this)} href="#"><li className='relative'>Accept Ally Request{allydropdown}</li></a>);
        break;
      case 'its_you':
        allybutton = ('');
    }


    const me = (this.props.me.length>0) ? this.props.me[0] : {};
    console.log('i am: ',me);
    var route = history.location;
    console.log('header is now: ',route);
    let user = (this.props.user.length>0) ? this.props.user[0] : '';
    let userallies = user.allies;
    // let isally = false;
    // userallies.forEach((val)=>{
    //   if(val === userid){
    //     isally = true;
    //   }
    // });
    // let allybutton = (isally) ?
    // (<a onMouseEnter={this.showDropdown.bind(this)} onMouseLeave={this.hideDropdown.bind(this)} href="#"><li className='relative'>Allies{allydropdown}</li></a>)
    // : (<a href="#"><li>Request Ally</li></a>);


    const username=this.props.username;
    const userpic=this.props.userpic;
    let destination = (route=="/user") ? "/account" : "/user";
    let button = (me.userid==userid) ? (
      <a onClick={this.editProfile.bind(this)} className="profile-edit-btn">Edit Profile</a>
    )
    // : (
    //   <span onClick={this.viewProfile.bind(this)} className="profile-edit-btn">View Profile</span>
    // );
    : '';
    let cancelModal = (this.state.cancelModal) ?
    (<div className="cancel-modal">
      Are you sure you want to cancel allegiance with {username}?
      <div className="modal-buttons">
        <button id={userid} onClick={this.confirmCancel.bind(this)} >Yes</button>
        <button onClick={this.hideCancel.bind(this)}>No</button>
      </div>
    </div>)
      : '';
    let confirmModal = (this.state.confirmModal) ?
    (<div className="cancel-modal">
      Your allegiance with {username} has been cancelled and will be updated.
      <div className="modal-buttons">
        <button id={userid} onClick={this.hideConfirm.bind(this)}>Ok</button>
      </div>
    </div>)
      : '';

    //

    let style = {'background-image': 'url('+userpic+')'};
    return(
      <div className="user-header relative">
        {cancelModal}
        {confirmModal}
        <div className="user-background-photo">
          {/* <NavLink to={destination}> */}
            {/* <a href="#"> */}
              <div>
                <span id="title-username">{username}</span>
                {button}

              </div>
            {/* </a> */}
          {/* </NavLink> */}
        </div>
        <ul className="user-nav">
        <a href="#"><li>Posts</li></a>
        {/* <a href="#"><li>About</li></a> */}
        {/* <a href="#"><li>Allies</li></a> */}
        { allybutton }
        </ul>
          <div className="profile-pic" style={style}>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  let previewingAlly = state.allReducers.mainApp.previewingAlly;
  let affiliation = state.allReducers.mainApp.affiliation;
  let affiliation_display = state.allReducers.mainApp.affiliation_display;
  let auth = state.allReducers.mainApp.auth;
  let profile = state.allReducers.mainApp.profile;
  let user = state.allReducers.mainApp.user;
  let loggedIn = state.allReducers.mainApp.loggedIn;
  let users = state.allReducers.mainApp.users;
  let usersObject = state.allReducers.mainApp.usersObject;
  let token = state.allReducers.mainApp.token;
  return{
    previewingAlly,
    affiliation,
    affiliation_display,
    auth,
    user,
    profile,
    loggedIn,
    users,
    usersObject,
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
    push,
    cancelAlliance,
    requestAlly
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(UserHeader);
