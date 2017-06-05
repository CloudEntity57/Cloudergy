import React, { Component } from 'react';
import { requestAlly } from '../actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class UserDropdown extends Component{
  constructor(props){
    super(props);
    this.state={
      dog:'fido'
    }
  }
  offerAllegiance(e){
    e.preventDefault();
    let userid = e.target.id;
    let data = {
      ally_request:userid,
      user:this.props.user.userid
    }
    this.props.requestAlly(data);
  }
  goToUser(userid){
    console.log('going to user ', this.state.userPageId);
    this.props.push('/user/'+userid);
  }
  doNothing(e){
    e.preventDefault();
    console.log('doing nothing');
  }
  render(){
    let user = (this.props.user.hasOwnProperty('userid')) ? this.props.user : {};
    // if(this.props.user
    let postId = this.props.postId;
    let largephoto = user.largephoto;
    let isFriend;
    for(let i=0; i<user.allies.length; i++){
      if(user.allies[i]==user.userid){
        isFriend = true;
      }else{
        let reqsList = user.ally_requests_sent;
        for(let i=0; i<reqsList.length; i++){
          if(user.userid == reqsList[i]){
            isFriend="invited";
          }else if(i==reqsList.length-1){
            isFriend = false;
          }
        }
      }
    }
    let offerAllegiance;
    let ally_status;
    switch (isFriend){
      case true:
        offerAllegiance = this.doNothing.bind(this);
        ally_status = ('Allies');
        break;
      case false:
        offerAllegiance = this.offerAllegiance.bind(this);
        ally_status = ('Become Allies');
        break;
      case 'invited':
        offerAllegiance = this.doNothing.bind(this);
        ally_status = ('Request Sent');
        break;
      case 'beeninvited':
        offerAllegiance = this.doNothing.bind(this);
        ally_status = ('Accept Invitation');
        break;

    }
    let embedded_pic = (<img className="img-responsive user-preview-pic" src={largephoto} alt="user photo" />);
    let userlink = "/user";


// User Dropdown div:
  return (
      <div className="user-preview-box">
        <a href="">
        <div onClick={()=>this.goToUser(user.userid)} className="user-preview-header">
          <div onMouseEnter={()=>this.setUserPageId(user.userid)} className="user-preview-header">
            {/* <div className="user-preview-pointer"></div> */}
            <div className="opaque-connector"></div>
            <a className="user-link"><span>{ user.username }</span></a>
          </div>
        </div>
      </a>

          { embedded_pic }
        <div className="user-preview-footer">
          <a href="#"><div id={user.userid} onClick={offerAllegiance}>{ally_status}</div></a>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state){
  state = state.allReducers.mainApp;
  let users = state.users;
  return{
    users
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    requestAlly,
    push
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(UserDropdown);
