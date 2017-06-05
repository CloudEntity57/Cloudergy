import React, { Component } from 'react';
import NavLink from './NavLink';
import { hashHistory } from 'react-router';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { socialApp, toggleAffiliation, fetchUserInfo, acceptAlly,login } from '../actions/index';
import { push } from 'react-router-redux';

class UserHeader extends Component{
  editProfile(e){
    e.preventDefault();
    this.props.push('/account');
  }
  offerAllegiance(e){
    e.preventDefault();
  }
  cancelAllegiance(e){
    e.preventDefault();
  }
  acceptAlly(e){
    e.preventDefault();
  }
  render(){
    const me = (this.props.me.length>0) ? this.props.me[0] : {};
    console.log('i am: ',me);
    var route = history.location;
    console.log('header is now: ',route);
    const username=this.props.username;
    const userid=this.props.userid;
    const userpic=this.props.userpic;
    let destination = (route=="/user") ? "/account" : "/user";
    let button = (me.userid==userid) ? (
      <span onClick={this.editProfile.bind(this)} className="profile-edit-btn">Edit Profile</span>
    )
    // : (
    //   <span onClick={this.viewProfile.bind(this)} className="profile-edit-btn">View Profile</span>
    // );
    : '';


    let style = {'background-image': 'url('+userpic+')'};
    return(
      <div className="user-header">
        <div className="user-background-photo">
          <NavLink to={destination}>
            <a href="#">
              <div>
                <span id="title-username">{username}</span>
                {button}

              </div>
            </a>
          </NavLink>
        </div>
        <ul className="user-nav">
        <a href="#"><li>Posts</li></a>
        <a href="#"><li>About</li></a>
        <a href="#"><li>Allies</li></a>
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
  return{
    previewingAlly,
    affiliation,
    affiliation_display,
    auth,
    user,
    profile,
    loggedIn,
    users
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    socialApp,
    toggleAffiliation,
    fetchUserInfo,
    acceptAlly,
    login,
    push
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(UserHeader);
