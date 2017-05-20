import React, { Component } from 'react';
import jquery from 'jquery';
// import Functions from './Functions';
import NavLink from './NavLink';
import { hashHistory } from 'react-router';
let functionsModule = require('./Functions');
let Functions = new functionsModule();

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mainApp,hideUserPreview,displayUserPreview,setActivePost, clearActivePost } from '../actions/index';

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
    // console.log('postID: ',postId, 'user: ',currentUserId);
    this.setState({
      postId:postId
    });
    // let user = (nextProps.id) ? nextProps.id : '';
    let user = nextProps.user[0].userid;
    // console.log(currentUserId,' vs ',user);
    // Functions.getUser(uid).then((val)=>{
    //   this.setState({
    //     user:val[0]
    //   });
    // });
    // console.log('other person posting: ',user);
    if(currentUserId == user){
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
        isFriend:isFriend,
        currentUserId:currentUserId
      });
    }
    Functions.allyCheck(user,currentUserId,callback);
  }
  offerAllegiance(e){
    e.preventDefault();
    let userid = e.target.id;
    // console.log('be my ally, ',userid);
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
  toggleDeleteBar(){
    let toggleStatus = (this.state.toggleStatus==true) ? false : true;
    this.setState({
      toggleStatus:toggleStatus
    });
  }
  deletePost(e){
    e.preventDefault();
    let targetURL = "http://localhost:3001/deletepost";
    console.log('deleting post');
    console.log('post is: ',e.target.id);
    let postId = e.target.id;
    jquery.ajax({
      url:targetURL,
      type:'POST',
      data:{
        post:postId
      },
      success:()=>{
        console.log('success! ');
        this.props.updatePosts();
      }
    });
  }
  displayUser(e){
    // console.log('displaying!');
    // this.props.setActivePost(this.props.id)
    setTimeout(()=>{
      this.setState({
        userpreview:true
      });
    },1000);
  }
  hideUser(e){
    // setTimeout(()=>{
      // this.props.hideUserPreview(this.props.id)
      this.setState({
        userpreview:false
      });
    // },250);
  }
  render(){

    // console.log('user object: ',userObj);
    let friendrequest = (this.state.friendrequest) ? this.state.friendrequest : '';
    let currentUserId = (this.state.currentUserId) ? this.state.currentUserId : '';
    let postId = (this.state.postId) ? this.state.postId : '';
    let user = {
      photo:'',
      affiliation:'',
      allies:'',
      userid:'',
      username:''
    };
    let userpic,teamcolor,largephoto;
    let userObj = this.props.userObject;
    if(this.props.userObject !== undefined ){
      user = userObj[currentUserId];
    }
    largephoto = user.largephoto
    embedded_pic = (<img className="img-responsive user-preview-pic" src={largephoto} alt="user photo" />);
    teamcolor = user.affiliation + " user-stripe";
    userpic = (
        <div>
          <div className={teamcolor}></div>
          <img id={currentUserId} className='post-header-pic' src={user.photo} alt='pic' />
        </div>
      );

    // let userpic = this.props.pic;

    // let user = (this.props.user.hasOwnProperty('username')) ? this.props.user : {};

    // console.log('user in posthedder: ',user);
    // let userpic = (
    //     <div>
    //       <div className={teamcolor}></div>
    //       <img id={currentUserId} className='post-header-pic' src={user.photo} alt='pic' />
    //     </div>
    //   );
    // console.log('user we are dealing with: ',user);
    let date = this.props.date;
    let allies = (user !==undefined) ? user.allies : [];
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
    let embedded_pic = (<img className="img-responsive user-preview-pic" src={largephoto} alt="user photo" />);
    let userlink = "/user/"+user.userid;
// User Dropdown div:
    let userinfo = (postId==this.props.activePost && this.state.userpreview) ? (
      <div onMouseLeave={this.hideUser.bind(this)} className="user-preview-box">
        <NavLink to={userlink}>
        <div className="user-preview-header">
          <div className="user-preview-pointer"></div>
          <div className="opaque-connector"></div>
          <a href="#"><span>{ user.username }</span></a>
        </div>
        </NavLink>
          { embedded_pic }
        <div className="user-preview-footer">
          <a href="#"><div id={user.userid} onClick={offerAllegiance}>{ally_status}</div></a>
        </div>
      </div>
    ) : '';
    let linkBarLinks = (this.state.myPost) ?
    //links if it's my post
    (
       <a id={postId} className="deletebar-item" onClick={this.deletePost.bind(this)} href="#">Delete</a>
     )
    :
    //links if it's not my post
    '';
    let linkbar = (this.state.toggleStatus) ? (
      <div className="post-header-deletebar">{linkBarLinks}</div>
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
        <div onClick={this.toggleDeleteBar.bind(this)} className="fa fa-sort-desc pull-right post-header-deleteicon">{linkbar}</div>

      </div>
    )
  }
}

function mapStateToProps(state){
  let user = state.allReducers.mainApp.user;
  let users = state.allReducers.mainApp.users;
  let userObject = state.allReducers.mainApp.userObject;
  let user_preview_showing = state.allReducers.mainApp.user_preview_showing;
  let activePost = state.allReducers.mainApp.activePost;
  return{
    user,
    users,
    userObject,
    user_preview_showing,
    activePost
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    mainApp,
    hideUserPreview,
    displayUserPreview,
    setActivePost,
    clearActivePost
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(PostHeader);
