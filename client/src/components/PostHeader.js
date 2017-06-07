import React, { Component } from 'react';
import jquery from 'jquery';
// import Functions from './Functions';
import NavLink from './NavLink';
import FilterLink from './FilterLink';
import UserDropdown from './UserDropdown';
import { hashHistory } from 'react-router';
let functionsModule = require('./Functions');
let Functions = new functionsModule();
import { push } from 'connected-react-router';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mainApp,hideUserPreview,displayUserPreview,setActivePost, clearActivePost, setUserPageId, deletePost, requestAlly } from '../actions/index';

class PostHeader extends Component{
  constructor(props){
    super(props);
    this.state={
      userpreview:false,
      toggleStatus:false,
      myPost:false,
      postId:''
    }
  }
  componentWillMount(){
    // let currentUserId = Functions.getCurrentUserId();
    // console.log('cwm currentUserId: ',currentUserId);
    // this.setState({
    //   currentUserId: currentUserId
    // });
  }
  componentWillReceiveProps(nextProps){
    // let currentUserId = this.state.currentUserId;
    let currentUserId = nextProps.currentId;
    let postId = nextProps.postId;
    console.log('postID: ',postId, 'user: ',currentUserId);
    this.setState({
      postId:postId
    });
    // let user = (nextProps.id) ? nextProps.id : '';
    let user = this.props.user[0];
    // console.log('mystery user: ',user);
    let userid = this.props.user[0].userid;
    // console.log(currentUserId,' vs ',user);
    // Functions.getUser(uid).then((val)=>{
    //   this.setState({
    //     user:val[0]
    //   });
    // });
    // console.log('other person posting: ',user);
    if(currentUserId == userid){
      // console.log('cuid true');
      this.setState({
        myPost:true
      });
    }else{
      // console.log('cuid false');
      this.setState({
        myPost:false
      });
    }
    let callback = (isFriend)=>{
      // console.log('this person is my friend - ',isFriend);
      this.setState({
        isFriend,
        currentUserId
      });
    }
    // Functions.allyCheck(userid,currentUserId,callback);
    // let user = this.props.user;
    let friends = user.allies;
    let isFriend = false;
    // console.log('current friends: ',friends);
    for(let i=0; i<friends.length; i++){
      if(friends[i]==userid){
        isFriend = true;
        callback(isFriend);
      }else{
        let reqsList = user.ally_requests_sent;
        for(let i=0; i<reqsList.length; i++){
          if(userid == reqsList[i]){
            isFriend="invited";
            callback(isFriend);
            return;
          }else if(i==reqsList.length-1){
            callback(false);
          }
        }
      }
    }
  }
  doNothing(e){
    e.preventDefault();
    console.log('doing nothing');
  }
  acceptInvitation(e){
    e.preventDefault();
    console.log('accepting invitation');
  }
  toggleDeleteBar(){
    let toggleStatus = (this.state.toggleStatus==true) ? false : true;
    this.setState({
      toggleStatus:toggleStatus
    });
  }
  showDeleteBar(){
    this.setState({
      toggleStatus:true
    });
  }
  hideDeleteBar(){
    this.setState({
      toggleStatus:false
    });
  }
  deletePost(e){
    e.preventDefault();
    // let targetURL = "http://localhost:3001/deletepost";
    console.log('deleting post');
    console.log('post is: ',e.target.id);
    let postId = e.target.id;
    this.props.deletePost(postId);
  }
  displayUser(e){
    console.log('displaying!');
    this.props.setActivePost(this.props.id)
    // setTimeout(()=>{
      this.setState({
        userpreview:true
      });
    // },1000);
  }
  hideUser(e){
    // setTimeout(()=>{
      this.props.hideUserPreview(this.props.id)
      this.setState({
        userpreview:false
      });
    // },250);
  }
  setUserPageId(userid){
    // this.props.setUserPageId(userid)
    this.setState({
      userPageId:userid
    });
  }
  goToUser(userid){
    this.props.push('/user/'+this.state.userPageId);
    console.log('going to user');
  }
  render(){

    // console.log('user object: ',userObj);
    let friendrequest = (this.state.friendrequest) ? this.state.friendrequest : '';
    let currentUserId = this.props.currentId;
    let postId = (this.state.postId) ? this.state.postId : '';

    let user=this.props.user[0];
    // console.log('user in postheader render: ',user);

    let userpic,
    teamcolor,
    embedded_pic,
    largephoto;

    let userObj = this.props.usersObject;
    if(this.props.usersObject !== undefined ){
      user = this.props.usersObject[currentUserId];
    }
    teamcolor = user.affiliation + " user-stripe";
    userpic = (
        <div>
          <div className={teamcolor}></div>
          <img id={currentUserId} className='post-header-pic' src={user.photo} alt='pic' />
        </div>
      );

    let date = this.props.date;
    let allies = (user !==undefined) ? user.allies : [];
    // let friendStatus= (this.state.isFriend=="invited" || this.state.isFriend==true || this.state.isFriend==false) ? this.state.isFriend : '';


    let userdropdown = (postId==this.props.activePost && this.state.userpreview) ? (
      <UserDropdown postId={postId} this_user={user} userPageId={this.state.userPageId}/>
    ):'';


    //delete bar:

    let linkBarLinks = (this.state.myPost) ?
    //links if it's my post
    (
       <a id={postId} className="deletebar-item" onClick={this.deletePost.bind(this)} href="#">Delete</a>
     )
    :
    //links if it's not my post
    '';
    let linkbar = (this.state.toggleStatus && this.state.myPost && this.props.authenticated) ? (
      <div onMouseLeave={this.hideDeleteBar.bind(this)} className="post-header-deletebar">{linkBarLinks}</div>
    ) : '';

    let linktoggle = (this.state.myPost) ? (<div onClick={this.showDeleteBar.bind(this)} className="fa fa-sort-desc pull-right post-header-deleteicon">{linkbar}</div>) : '';


    return(
      <div onMouseLeave={this.hideDeleteBar.bind(this)} className="post-header">
        <div className="post-pic-col">
          { userpic }
        </div>
        <div className="post-header-text">
          <span className="post-username">
            {/* <FilterLink onClick={()=>this.goToUser()} filter={userlink}><a href="#" onMouseEnter={this.displayUser.bind(this)} onMouseLeave={this.hideUser.bind(this)}>
              { user.username }
              {userinfo}
            </a></FilterLink> */}
          <div className="user-link" onMouseEnter={()=>{this.displayUser(); this.setUserPageId(user.userid);}} onMouseLeave={this.hideUser.bind(this)}>
              { user.username }
              {userdropdown}
            </div>

          </span>
          <div className="post-date">{date}</div>
        </div>
        { linktoggle }

      </div>
    )
  }
}

function mapStateToProps(state){
  let user = state.allReducers.mainApp.user;
  let users = state.allReducers.mainApp.users;
  let usersObject = state.allReducers.mainApp.usersObject;
  let user_preview_showing = state.allReducers.mainApp.user_preview_showing;
  let activePost = state.allReducers.mainApp.activePost;
  let authenticated = state.allReducers.mainApp.authenticated;
  return{
    user,
    users,
    usersObject,
    user_preview_showing,
    activePost,
    authenticated
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    mainApp,
    hideUserPreview,
    displayUserPreview,
    setActivePost,
    clearActivePost,
    setUserPageId,
    push,
    deletePost,
    requestAlly
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(PostHeader);
