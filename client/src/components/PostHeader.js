import React, { Component } from 'react';
import jquery from 'jquery';
// import Functions from './Functions';
import NavLink from './NavLink';
import FilterLink from './FilterLink';
import { hashHistory } from 'react-router';
let functionsModule = require('./Functions');
let Functions = new functionsModule();
import { push } from 'connected-react-router';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mainApp,hideUserPreview,displayUserPreview,setActivePost, clearActivePost, setUserPageId } from '../actions/index';

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
    let user = this.props.user;
    console.log('mystery user: ',user);
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
        isFriend:isFriend,
        currentUserId:currentUserId
      });
    }
    // Functions.allyCheck(userid,currentUserId,callback);
    // let user = this.props.user;
    let friends = user[0].allies;
    let isFriend = false;
    // console.log('current friends: ',friends);
    for(let i=0; i<friends.length; i++){
      if(friends[i]==userid){
        isFriend = true;
        callback(isFriend);
      }else{
        let reqsList = user[0].ally_requests_sent;
        for(let i=0; i<reqsList.length; i++){
          if(userid == reqsList[i]){
            isFriend="invited";
            callback(isFriend);
            return;
          }else{
            callback(false);
          }
        }
      }
    }
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
    console.log('displaying!');
    // this.props.setActivePost(this.props.id)
    // setTimeout(()=>{
      this.setState({
        userpreview:true
      });
    // },1000);
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
      user = this.props.userObject[currentUserId];
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
    let userlink = "/user";
// User Dropdown div:
    let userinfo = (postId==this.props.activePost && this.state.userpreview) ? (
      <div className="user-preview-box">
        <NavLink onClick={()=>this.props.setUserPageId(user.userid)} to={userlink}>
        <div className="user-preview-header">
          <div className="user-preview-pointer"></div>
          <div className="opaque-connector"></div>
          <a href="#"><span>{ user.username }</span></a>
        </div>
        </NavLink>
        {/* <div>
        <div className="user-preview-header">
          <div className="user-preview-pointer"></div>
          <div className="opaque-connector"></div>
          <a onClick={()=>{
            this.props.setUserPageId(user.userid)
            this.props.push('/user')
          }}><span>{ user.username }</span></a>
        </div>
      </div> */}
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
            <FilterLink filter={userlink}><a href="#" onMouseEnter={this.displayUser.bind(this)} onMouseLeave={this.hideUser.bind(this)}>
              { user.username }
              {userinfo}
            </a></FilterLink>
          {/* <a onClick={()=>this.props.push('/user')} onMouseEnter={this.displayUser.bind(this)} onMouseLeave={this.hideUser.bind(this)}>
              { user.username }
              {userinfo}
            </a> */}

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
    clearActivePost,
    setUserPageId,
    push
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(PostHeader);
