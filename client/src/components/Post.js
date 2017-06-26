import React, { Component } from 'react';
import UserPic from './UserPic';
import PostHeader from './PostHeader';
import Comment from './Comment';
import Linkify from 'react-linkify';
import jquery from 'jquery';
import Metascraper from 'metascraper';
let functionsModule = require('./Functions');
let Functions = new functionsModule();

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mainApp, displayUserPreview, hideUserPreview,setActivePost,clearActivePost,fetchPosts,likePost,likeComment,submitComment,deleteComment,login } from '../actions/index';

class Post extends Component{
  constructor(props){
    super(props);
    this.state={
      user:{},
      displayedit:false
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
    let user = (this.props.user.length>0) ? this.props.user : [];
    this.setState({
      user:user
    });
  }
  componentWillReceiveProps(){
  }
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
    let postId = Math.random();
    let data = {
      comment:{
        id:postId,
        text:this.refs.comment.value,
        userid:userid,
        likes:0,
        likers:["12345"]
      },
      id:this.refs.comment.id
    }
    this.refs.comment.value='';
    if(this.props.token){
      this.props.submitComment(data);
    }else{
      this.props.login();
    }

  }
  goToUser(e){
    e.preventDefault();
  }
  displayEdit(){
    console.log('displaying');
    this.setState({
      displayedit:true
    })
  }
  hideEdit(){
    console.log('hiding');
    this.setState({
      displayedit:false
    })
  }
  deleteComment(e){
    e.preventDefault();
    let commentid = e.target.id;
    console.log('deleting! ',e.target);
    let post = this.props.post;
    console.log('post deleted: ',post);
    let data={
      id:commentid,
      post
    }
    this.props.deleteComment(data);
  }
  // likePost(e){
  //   e.preventDefault();
  //   console.log('liking ',e.target.id);
  //   let post = e.target.id;
  //   let data = {
  //     post,
  //     liker:this.props.user[0].userid
  //   }
  //   this.props.likePost(post);
  // }
  likePost(e){
    e.preventDefault();
    console.log('liking ',e.target.id);
    let post = e.target.id;
    let data = {
      post,
      liker:this.props.user[0].userid
    }
    this.props.likePost(data);
  }
  likeComment(e){
    e.preventDefault();
    let comment = e.target;
    let data = {
      comment,
      liker:this.props.user[0].userid
    }
    // this.props.likeComment(data);
  }
  replyComment(name){
    // e.preventDefault();
    // let comment = e.target;
    console.log('replying - target in post: ',name);
    this.refs.comment.value='@'+name+' ';
    // this.refs.comment.focus();
    console.log('props: ',this.props);
    // let input = document.getElementById(this.props.post);
    // input.value='@'+comment.id+' ';
    // let refs = this.refs.bind(this);
    this.refs.comment.focus();
  }
  comment(e){
    e.preventDefault();
    this.refs.comment.focus();
  }
  sharePost(e){
    e.preventDefault();
    console.log('sharing post: ',e.target.id);
    this.props.sharePost(e.target.id);
  }
  sizeInput(e){
    e.preventDefault();
    console.log('id = ',e.target.id);
    let target = '#'+e.target.id;
    var size = parseInt(jquery(target).attr('size'));
    var chars = jquery(target).val().length;
    console.log('chars: ',chars);
    if(chars >= size){
      console.log('greater');
      jquery(target).attr('size', chars);
    }
  }
  render(){
    let user = (this.state.user) ? this.state.user : '';
    let myId = (this.state.myId) ? this.state.myId : '';
    // myId = (this.props.token) ? myId : 'none';
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
      return val._id == x;
    }) : '';
    console.log('Post post: ',post[0]);
    post = post[0];
    let boolean = post.hasOwnProperty('text');
    let text = (boolean) ? post.text : '';
    let date = (boolean) ? post.date : '';
    let id = (boolean) ? post._id : '';
    let postId = (boolean) ? post._id : '';
    console.log('post id: ',postId);
    let currentId = (boolean) ? post.uid : '';
    let postImg = (post.hasOwnProperty('metadata')) ? (
      <div>
        <a href={post.metadata.url} alt={post.metadata.title}>
          <img className="weblink_image image-responsive" src={post.metadata.image} alt={post.metadata.title} />
        </a>
      </div>

    ) : '';
    let postTitle = (post.hasOwnProperty('metadata')) ? (
      <div className="weblink_title">
        <a href={post.metadata.url} alt={post.metadata.title}>
          <h4>{post.metadata.title}</h4>
        </a>
      </div>
    ) : '';
    let postDescription = (post.hasOwnProperty('metadata')) ? (
      <div className="weblink_description">
        <a href={post.metadata.url} alt={post.metadata.title}>
          <div>{post.metadata.description}</div>
        </a>
      </div>
    ) : '';


//create comments:
    let comments = (boolean) ? post.comments:'';
    let post_userid = (boolean) ? post.userid:'';
    let users = (this.props.usersObject) ? this.props.usersObject : [];
    let displayededit = this.state.displayededit;
    console.log('users in post: ',users);
    console.log('this posts comments are: ',comments);

    let commentSection = (post.hasOwnProperty('comments')) ?

    comments.slice(1,comments.length).map((val)=>{
      let props = {
        comments,
        post_userid,
        users,
        user:user[0],
        displayededit,
        post:this.props.post,
        post_id:postId,
        comment:val,
        deleteComment:this.props.deleteComment.bind(this),
        replyComment:this.replyComment.bind(this)
      }
      // let username = users[val.userid].username;
      let editOption = (<a id={val.id} onClick={this.deleteComment.bind(this)} href="#">x</a>);
      let edit = (this.state.displayedit) ? editOption : '';
      return(
        <Comment {...props} />

      );
    })
    : '';

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

    // let likes = (post.hasOwnProperty('likes') && post.likes > 0) ? (<div className="like-panel"><div><span className='post-likes fa fa-thumbs-o-up'></span>{post.likes}</div></div>) : '';

    let likes = (post.hasOwnProperty('likers') && post.likers.length > 1) ? (<div className="like-panel"><div><span className='post-likes fa fa-thumbs-o-up'></span>{post.likers.length-1}</div></div>) : '';
    let sticky = (this.props.posts.indexOf(post)==this.props.posts.length-1) ? "user-post sticky" : "user-post";
    if(!this.props.token){
      myId=null;
    }
    let random = Math.random();
    return(
      <div className="user-post">
      <div id={id} className="post-panel">
        <PostHeader {...props} />

        <div className="post-text">
          <Linkify properties={{target:'_blank'}}>
            {text}
            {postImg}
            {postTitle}
            {postDescription}
          </Linkify>
        </div>
        {/* <div className="like-panel">{likes}</div> */}
        <div className="like-bar">
          <a id={id} href="#">
            <span id={id} className="fa fa-thumbs-up"></span>
            <span id={id} onClick={this.likePost.bind(this)}>Like</span>
          </a>
          <a href="#" onClick = {this.comment.bind(this)}>
            <span className="fa fa-comment"></span>
            <span>Comment</span>
          </a>
          <a id={id} onClick={this.sharePost.bind(this)} href="#">
            <span id={id} className="fa fa-share"></span>
            <span id={id} >Share</span>
          </a>
        </div>
      </div>
      <div className="comment-panel">
        {likes}
        {commentSection}
        <UserPic userid={myId} />
        <form info={postId} onSubmit={this.postComment.bind(this)}>
          <input ref="comment" size="20" id={postId} onKeyUp={this.sizeInput.bind(this)} placeholder=" Comment here..." />
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
  let token = state.allReducers.mainApp.token;
  return{
    user,
    user_preview_showing,
    posts,
    usersObject,
    token
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
    likePost,
    likeComment,
    submitComment,
    deleteComment,
    login
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Post);
