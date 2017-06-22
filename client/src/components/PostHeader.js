import React, { Component } from 'react';
import jquery from 'jquery';
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
import { mainApp,hideUserPreview,displayUserPreview,setActivePost, clearActivePost, setUserPageId, deletePost, requestAlly,editPrivacy,editPost} from '../actions/index';

class PostHeader extends Component{
  constructor(props){
    super(props);
    this.state={
      userpreview:false,
      toggleStatus:false,
      privacyToggle:false,
      myPost:false,
      postId:'',
      editing:false
    }
  }
  componentDidMount(){
    let user = this.props.user[0];
    let userid = this.props.user[0].userid;
    let currentUserId = this.props.currentId;
    // if(currentUserId == userid){
    //   // console.log('cuid true');
    //   this.setState({
    //     myPost:true
    //   });
    // }else{
    //   // console.log('cuid false');
    //   this.setState({
    //     myPost:false,
    //   });
    // }
  }
  componentWillReceiveProps(nextProps){
    let currentUserId = nextProps.currentId;
    let postId = nextProps.postId;
    let privacy = nextProps.post.privacy;
    console.log('postID: ',postId, 'user: ',currentUserId);
    this.setState({
      postId:postId,
      privacy
    });
    let user = this.props.user[0];
    let userid = this.props.user[0].userid;
    if(currentUserId == userid){
      // console.log('cuid true');
      this.setState({
        myPost:true
      });
    }else{
      // console.log('cuid false');
      this.setState({
        myPost:false,
      });
    }
    let callback = (isFriend)=>{
      // console.log('this person is my friend - ',isFriend);
      this.setState({
        isFriend,
        currentUserId
      });
    }
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
    console.log('toggling');
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
  editPost(e){
    e.preventDefault();
    console.log('editing: ',this.props.id);
    this.props.editPost(this.props.id,true);
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
    this.setState({
      userPageId:userid
    });
  }
  goToUser(userid){
    this.props.push('/user/'+this.state.userPageId);
    console.log('going to user');
  }
  hidePost(){
    console.log('hiding post');
  }
  togglePrivacy(){
    let privacyToggle = !this.state.privacyToggle;
    this.setState({
      privacyToggle
    });
    console.log('changing privacy');
  }
  hidePrivacy(){
    if(this.state.privacyToggle==true){
    this.setState({
      privacyToggle:false
    })
  }
}
  showPrivacy(){
    if(this.state.privacyToggle==false){
    this.setState({
      privacyToggle:true
    })
  }
  }
  setPrivacy(setting){
    console.log('setting message # ',this.props.post._id,' to ',setting);
    let data = {
      setting,
      id:this.props.post._id
    }
    this.props.editPrivacy(data);
  }
  render(){
    let token = (this.props.token !=='') ? this.props.token : '';
    // console.log('user object: ',userObj);
    let friendrequest = (this.state.friendrequest) ? this.state.friendrequest : '';
    let currentUserId = this.props.currentId;
    let postId = (this.state.postId) ? this.state.postId : '';

    let user=this.props.user[0];
    console.log('user in postheader render: ',user);
    let myPost=false;
    if(this.props.post.uid == this.props.user[0].userid) {myPost=true;}
    console.log("it's ",myPost," that ", this.props.post.text, " is my post");
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
      <UserDropdown this_user={user} />
    ):'';

//delete bar:

    let linkBarLinks =  (myPost && token !=='') ?
    //links if it's my post
    (
       <div id={postId}>
         <a id={postId} className="deletebar-item" onClick={this.deletePost.bind(this)} href="#">Delete</a>
         <a id={postId} className="deletebar-item" onClick={this.editPost.bind(this)} href="#">Edit</a>
       </div>
     )
    :
    //links if it's not my post
    (
       <div>
         <a id={postId} className="deletebar-item" onClick={this.hidePost.bind(this)} href="#">Hide Post</a>
       </div>
     );
    let linkbar = (this.state.toggleStatus) ? (
      <div onMouseLeave={this.hideDeleteBar.bind(this)} className="post-header-deletebar">{linkBarLinks}</div>
    ) : '';
    let linktoggle = (<span onClick = {this.toggleDeleteBar.bind(this)} className="fa fa-sort-desc pull-right post-header-deleteicon">{linkbar}</span>);

//privacy bar:
    let privacyBarLinks =  (myPost && token !=='') ?
    //links if it's my post
    (
      <div onMouseEnter={this.showPrivacy.bind(this)} className="privacymenu">
        <div>Who sees this?</div>
        <div onClick={()=>this.setPrivacy('public')} className="privacy-btns">Public</div>
        <div onClick={()=>this.setPrivacy('allies')} className="privacy-btns">Allies</div>
        <div onClick={()=>this.setPrivacy('private')} className="privacy-btns">Only Me</div>
      </div>
     )
    :
    //links if it's not my post
    (
       <div>
         <a id={postId} className="deletebar-item" onClick={this.hidePost.bind(this)} href="#">Hide Post</a>
       </div>
     );
         let privacybar = (this.state.privacyToggle) ? (
           <div onMouseLeave={this.hidePrivacy.bind(this)} className="post-header-deletebar">{privacyBarLinks}</div>
         ) : '';
    let privacyicon;
    switch(this.props.post.privacy){
      case 'public':
        privacyicon = (myPost) ? (
          <span onClick={this.togglePrivacy.bind(this)} className="fa my-privacyicon fa-globe"><span className="fa fa-sort-desc"></span></span>
        ) :
        (
          <span className="fa privacyicon fa-globe"></span>
        )
      break;
      case 'allies':
        privacyicon = (myPost) ? (
          <span onClick={this.togglePrivacy.bind(this)} className="fa my-privacyicon fa-handshake-o">{privacybar}<span className="fa fa-sort-desc"></span></span>
        ) :
        (
          <span className="fa privacyicon fa-handshake-o"></span>
        )
      break;
      case 'private':
        privacyicon = (myPost) ? (
          <span onClick={this.togglePrivacy.bind(this)} className="fa my-privacyicon fa-lock">{privacybar}<span className="fa fa-sort-desc"></span></span>
        ) :
        (
          <span className="fa privacyicon fa-lock"></span>
        )
    }
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
          <div className="post-date">{date}{ privacyicon }</div>
          {privacybar}
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
  let token = state.allReducers.mainApp.token;
  return{
    user,
    users,
    usersObject,
    user_preview_showing,
    activePost,
    token
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
    requestAlly,
    editPrivacy,
    editPost
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(PostHeader);
