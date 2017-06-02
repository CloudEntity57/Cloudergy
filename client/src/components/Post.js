import React, { Component } from 'react';
import UserPic from './UserPic';
import PostHeader from './PostHeader';
// import { comments } from './Comments';
import jquery from 'jquery';
let functionsModule = require('./Functions');
let Functions = new functionsModule();

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mainApp, displayUserPreview, hideUserPreview,setActivePost,clearActivePost,fetchPosts,submitComment } from '../actions/index';

class Post extends Component{
  constructor(props){
    super(props);
    this.state={
      user:{}
    }
  }
  componentWillMount(){
    let uid = (this.props.uid) ? this.props.uid : '';
    let post = (this.props.post) ? this.props.post : '';
    console.log('this post is: ',post._id);
    console.log('post uid: ',uid);
    let myId = Functions.getCurrentUserId();
    Functions.getUser(uid).then((val)=>{
      this.setState({
        user:val[0],
        myId:myId
      });
    });
    let user = this.props.user;
    this.setState({
      user:user
    });
  }
//   componentWillReceiveProps(nextProps) {
//     let user = nextProps.user;
//     this.setState({
//       user:user
//     });
// }
  displayUser(){
    let postid = this.props.post._id
    console.log('displaying');
    setTimeout(
      ()=>{
        // this.props.setActivePost(postid);
      },1000);
  }
  hideUser(){
    console.log('hiding');
    // setTimeout(
      // ()=>{
        // this.props.clearActivePost();
      // },1000);
  }
  updatePosts(){
    this.props.updatePosts();
  }
  postComment(e){
    e.preventDefault();
    console.log('posting comment:',this.refs.comment.value);
    console.log('data: ',this.refs.comment.value);
    let userid = this.props.user[0].userid;
    let data = {
      comment:{
        text:this.refs.comment.value,
        userid:userid
      },
      id:this.refs.comment.id
    }
    this.refs.comment.value='';
    this.props.submitComment(data);

  }
  goToUser(e){
    e.preventDefault();
  }
  render(){
    let user = (this.state.user) ? this.state.user : '';
    let myId = (this.state.myId) ? this.state.myId : '';
    // let user = this.state.user;
    // console.log('user in post render: ',user);
    let teamcolor = user.affiliation + " user-stripe";
    let userpic = (
        <div>
          <div className={teamcolor}></div>
          <img id={user.userid} className='post-header-pic' src={user.photo} alt='pic' />
        </div>
      );
    let x = (this.props.post !=='') ? this.props.post : '';
    let post = (this.props.posts.length>0) ?
    this.props.posts.filter((val)=>{
      return val._id === x;
    }) : '';
    console.log('Post post: ',post[0]);
    post = post[0];
    let text = (post.hasOwnProperty('text')) ? post.text : '';
    let date = (post.hasOwnProperty('text')) ? post.date : '';
    let id = (post.hasOwnProperty('text')) ? post._id : '';
    let postId = (post.hasOwnProperty('text')) ? post._id : '';
    console.log('post id: ',postId);
    let currentId = (post.hasOwnProperty('text')) ? post.uid : '';
    //create comments:
    let comments = (post.hasOwnProperty('text')) ? post.comments:'';
    let userid = (post.hasOwnProperty('text')) ? post.userid:'';
    let users = (this.props.usersObject) ? this.props.usersObject : [];
    console.log('users in post: ',users);
    console.log('this posts comments are: ',comments);
    let commentSection = (post.hasOwnProperty('comments')) ? comments.map((val)=>{
      let username = users[val.userid].username;
      return(
        <div className="comment-container clearfix">
          <span className='userpic-comment-col'><UserPic userid={val.userid} /></span>
          <div className="comment-header-text">
          <div className="user-comment"><span className="comment-username"><a id={userid} href="#" onClick={()=>this.goToUser()}>{username}</a></span><span className="user-comment-text">{val.text}</span></div>
          <div className="user-comment"><a href="#">Like</a> <a href="#">Reply</a></div>
        </div>
        </div>
      );
    }) : '';
    // let commentSection = (post.hasOwnProperty('comments')) ?
    //   comments(post,users,this.goToUser)
    //  : '';

    //to avoid props confusion:
    let thisuser=user;
    const props = {
      post : post,
      // console.log('Post post: ',post);
      text : text,
      date : date,
      id : id,
      postId : id,
      currentId: currentId,
      pic:userpic,
      updatePosts:this.updatePosts.bind(this)
    }
    return(
      <div className="user-post">
      <div id={id} className="post-panel">
        <PostHeader {...props} />

        <div className="post-text">{text}</div>
        <div className="like-bar">
          <a href="#">
            <span className="fa fa-thumbs-up"></span>
            <span>Like</span>
          </a>
          <a href="#">
            <span className="fa fa-comment"></span>
            <span>Comment</span>
          </a>
          <a href="#">
            <span className="fa fa-share"></span>
            <span>Share</span>
          </a>
        </div>
      </div>
      <div className="comment-panel">
        {commentSection}
        <UserPic userid={myId} />
        <form info={postId} onSubmit={this.postComment.bind(this)}>
          <input ref="comment" id={postId} placeholder=" Comment here..." />
        </form>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state){
  let user = state.allReducers.mainApp.user;
  let user_preview_showing = state.allReducers.mainApp.user_preview_showing;
  let posts = state.allReducers.mainApp.posts;
  let usersObject = state.allReducers.mainApp.usersObject;
  return{
    user,
    user_preview_showing,
    posts,
    usersObject
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    mainApp,
    displayUserPreview,
    hideUserPreview,
    setActivePost,
    clearActivePost,
    fetchPosts,
    submitComment
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Post);
