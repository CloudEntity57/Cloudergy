import React, { Component } from 'react';
import jquery from 'jquery';
// import Functions from './Functions';
import NavLink from './NavLink';
import { hashHistory } from 'react-router';
let functionsModule = require('./Functions');
let Functions = new functionsModule();

class PostHeader extends Component{
  constructor(props){
    super(props);
    this.state={
      userpreview:false,
      user:{}
    }
  }
  componentWillMount(){
    let currentUserId = Functions.getCurrentUserId();
    console.log('cwm currentUserId: ',currentUserId);
    this.setState({
      currentUserId: currentUserId
    });
  }
  componentWillReceiveProps(nextProps){
    let currentUserId = this.state.currentUserId;
    let user = (nextProps.id) ? nextProps.id : '';
    Functions.getUser(user).then((val)=>{
      this.setState({
        user:val[0]
      });
    });
    console.log('other person posting: ',user);
    let callback = (isFriend)=>{
      console.log('this person is my friend - ',isFriend);
      this.setState({
        isFriend:isFriend
      });
    }
    Functions.allyCheck(user,currentUserId,callback);
  }
  displayUser(e){
    // console.log('displaying!');
    // setTimeout(()=>{
      this.setState({
        userpreview:true
      });
    // },700);
  }
  hideUser(e){
    setTimeout(()=>{
      this.setState({
        userpreview:false
      });
    },250);
  }
  offerAllegiance(e){
    e.preventDefault();
    let userid = e.target.id;
    console.log('be my ally, ',userid);
    let callback = ()=>{
      // this.setState({
      //   friendrequest:'hyena'
      // });
    }
    Functions.sendAllyRequest(userid,callback);
  }
  doNothing(e){
    e.preventDefault();
    console.log('doing nothing');
  }
  render(){

    let friendrequest = (this.state.friendrequest) ? this.state.friendrequest : '';
    let currentUserId = (this.state.currentUserId) ? this.state.currentUserId : '';
    // let userpic = this.props.pic;

    let user = (this.state.user.hasOwnProperty('username')) ? this.state.user : {};
    let teamcolor = user.affiliation + " user-stripe";
    let userpic = (
        <div>
          <div className={teamcolor}></div>
          <img id={currentUserId} className='post-header-pic' src={user.photo} alt='pic' />
        </div>
      );
    // console.log('user we are dealing with: ',user);
    let date = this.props.date;
    let allies = (user.hasOwnProperty('username')) ? user.allies : [];
    let friendStatus= (this.state.isFriend=="invited" || this.state.isFriend==true || this.state.isFriend==false) ? this.state.isFriend : '';
    // for(let i=0; i<allies.length; i++){
    //   if(allies[i]===currentUserId){
    //     currentfriend=true;
    //   }
    // }
    let offerAllegiance;
    let ally_status;
    switch (friendStatus){
      case true:
        offerAllegiance = this.doNothing.bind(this);
        ally_status = ('Allies');
        break;
      case false:
        offerAllegiance = this.offerAllegiance.bind(this);
        ally_status = ('Allies');
        break;
      case 'invited':
        offerAllegiance = this.doNothing.bind(this);
        ally_status = ('Request Sent');
        break;
    }
    let embedded_pic = (<img className="img-responsive user-preview-pic" src={user.largephoto} alt="user photo" />);
    let userlink = "/user/"+user.userid;
// User Dropdown div:
    let userinfo = (this.state.userpreview) ? (
      <div onMouseLeave={this.hideUser.bind(this)} className="user-preview-box">
        <div className="user-preview-header">
          <div className="user-preview-pointer"></div>
          <div className="opaque-connector"></div>
          <NavLink to={userlink}><a href="#"><span>{ user.username }</span></a></NavLink>
        </div>
          { embedded_pic }
        <div className="user-preview-footer">
          <a href="#"><div id={user.userid} onClick={offerAllegiance}>{ally_status}</div></a>
        </div>
      </div>
    ) : '';
    return(
      <div href="#" className="post-header">
        <div className="post-pic-col">
          { userpic }
        </div>
        <div className="post-header-text">
          <span className="post-username">
            <NavLink to={userlink}><a href="#" onMouseEnter={this.displayUser.bind(this)}>
              { user.username }
            </a></NavLink>
            {userinfo}
          </span>
          <div className="post-date">{date}</div>
        </div>
      </div>
    )
  }
}

export default PostHeader;
