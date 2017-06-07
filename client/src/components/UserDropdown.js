import React, { Component } from 'react';
import { requestAlly, acceptAlly } from '../actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class UserDropdown extends Component{
  constructor(props){
    super(props);
    this.state={
      dog:'fido',
      user:{},
      usersObject:{}
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

  componentWillReceiveProps(nextProps){
    let user = (nextProps.user.hasOwnProperty('userid')) ? nextProps.user[0] : {};
    let usersObject = (this.state.usersObject.hasOwnProperty(user.userid)) ? this.state.usersObject : {};
    this.setState({
      user:[user],
      usersObject
    });
  }

  acceptInvitation(e){
    e.preventDefault();
    const allyId = e.target.id;
    const userId = this.props.user.userid;
    let invitations_list;
    console.log('ally accepted: ',allyId);
    this.props.acceptAlly({allyId,userId});
    // this.forceUpdate();
  }
  goToUser(userid){
    // console.log('user target: ',e.target);
    console.log('going to user ', this.state.userPageId);
    this.props.push('/user/'+userid);
  }
  doNothing(e){
    e.preventDefault();
    console.log('doing nothing');
  }
  friendStatus(them,you){
    //check if it's you
    if(them.userid == you.userid){
      return 'its_you';
    }
    //check your allies list
    for(let i=0; i<you.allies.length; i++){
      if(you.allies[i]==them.userid){
        return true;
      }
    }
    //check your ally invites received list:
    let reqsList = you.ally_invitations_received;
    for(let i=0; i<reqsList.length; i++){
      if(them.userid == reqsList[i]){
        return "they_invited_you";
      }
    }
    //check your ally requests sent list:
    let invitesList = you.ally_requests_sent;
    for(let i=0; i<invitesList.length; i++){
      if(them.userid == invitesList[i]){
        return "you_invited_them";
      }
    }
    //they are neither friend nor pending ally status:
    return false;
  }
  render(){
    //'user' = this post's user, not you
    let user = (this.props.this_user.hasOwnProperty('userid')) ? this.props.this_user : {};
    let this_user_id = user.userid;
    console.log('their id: ',this_user_id);
    // let usersObject = (this.state.usersObject.hasOwnProperty(this_user_id)) ? this.state.usersObject : [];
    let usersObject = (this.props.usersObject !== {}) ? this.props.usersObject : [];
    console.log('users object: ',usersObject);
    user = usersObject[this_user_id];
    console.log('they are: ',user);
    let you = (this.props.user.hasOwnProperty('userid')) ? this.props.user : {};
    console.log('you are: ',you);
    console.log('the user in dropdown: ',user);
    let postId = this.props.postId;
    let largephoto = user.largephoto;

    let isFriend = this.friendStatus(user,you);

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
      case 'you_invited_them':
        offerAllegiance = this.doNothing.bind(this);
        ally_status = ('Request Sent');
        break;
      case 'they_invited_you':
        offerAllegiance = this.acceptInvitation.bind(this);
        ally_status = ('Accept Invitation');
        break;
      case 'its_you':
        offerAllegiance = this.doNothing.bind(this);
        ally_status = ('');

    }
    let embedded_pic = (<img className="img-responsive user-preview-pic" src={largephoto} alt="user photo" />);
    let userlink = "/user";


// User Dropdown div:
  return (
      <div className="user-preview-box">
        <div onClick={()=>this.goToUser(user.userid)} className="user-preview-header">
          <div className="user-preview-header">
            {/* <div className="user-preview-pointer"></div> */}
            <div className="opaque-connector"></div>
            <div className="user-link"><span>{ user.username }</span></div>
            <div className="user-story">{'"'+user.user_story+'"'}</div>
          </div>
        </div>

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
  let user = state.user[0];
  let usersObject = state.usersObject
  return{
    users,
    user,
    usersObject
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    requestAlly,
    acceptAlly,
    push
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(UserDropdown);
