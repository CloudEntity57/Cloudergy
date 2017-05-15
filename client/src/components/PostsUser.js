import React, { Component } from 'react';
import PostUser from './PostUser';
import jquery from 'jquery';
// import { createDate } from './Functions';
let functionsModule = require('./Functions');
let Functions = new functionsModule();

class PostsUser extends Component{
  constructor(props){
    super(props);
    this.state={
      editing:false,
      user:{}
    }
  }
  componentWillMount(){
    this.setState({
      editing:false
    });
  }
  componentWillReceiveProps(nextProps){
    let user = nextProps.user;
    let currentUser = nextProps.currentUser;
    this.setState({
      user:user,
      currentUser:currentUser
    });
  }

  emphasizeForm(){
    console.log('bing!');
    let editing = this.state.editing;
    editing = (editing) ? false : true;
    let color = (editing) ? 'black' : 'white';
    let zIndex = (editing) ? 2 : -1;
    console.log('color: ',color);
    this.setState({
      editing:editing
    });
    setTimeout(()=>{
        jquery('.opaqueBackground').css('background-color',color);
        jquery('.opaqueBackground').css('z-index',zIndex);
      },15);
  }
  submitPost(e){
    this.emphasizeForm();
    let postText = this.refs.comment.value;
    // console.log('comment: ',comment);

    //user whose wall this is:
    let user = this.props.user;

    //user looking at page:
    let currentUser = this.state.currentUser;

    console.log('user: ',user);
    console.log('currentUser: ',currentUser);
    //create date information for post:
    var today = Functions.createDate();
    console.log('today: ',today);
    //create remaining variables for post:
    let uid = currentUser.userid;
    let affiliation = user.affiliation;
    //make user's post on his own page have 'NA' for postedon
    let postedon;
    if(currentUser.userid==user.userid){
      postedon='NA';
    }else{
      postedon=user.userid
    }
    //create post for POST request
    let post = {
      text:postText,
      uid:uid,
      affiliation:affiliation,
      date:today,
      postedon:postedon
    }
    console.log('post: ',post);
    let queryString = "http://localhost:3001/post/"
    let postsquery = jquery.ajax({
      url:queryString,
      type:'POST',
      data:post,
      success:(val)=>{'success!! ',val}
    });
    postsquery.done((posts)=>{
      console.log('success!! posts: ',posts);
      posts = posts.reverse();
      this.refs.comment.value = '';
      this.setState({
        posts:posts
      });
    });
  }


  render(){
    let user = (this.state.user) ? this.state.user : '';
    // let opaqueBackground = (this.state.editing) ?
    // (
    //   <div onClick={this.emphasizeForm.bind(this)} className="opaqueBackground"></div>
    // )
    // : '';
    // let opaqueBackground = (
    //   <div onClick={this.emphasizeForm.bind(this)} className="opaqueBackground"></div>
    // );
    let postEntry = (this.state.editing) ?
    (  <div className="panel clearfix panel-default tall-comment-form">
          <form className="" action="index.html" method="post">
            <textarea ref="comment" name="comment" rows="8" cols="40"></textarea>
          </form>
            <div onClick={this.submitPost.bind(this)} className="btn btn-primary">Post</div>
      </div>
    )
    :
    (
      <div onClick={this.emphasizeForm.bind(this)} className="panel clearfix panel-default comment-form">
            <form className="" action="index.html" method="post">
              <textarea ref="comment" name="comment" rows="8" cols="20"></textarea>
            </form>
              <div onClick={this.submitPost.bind(this)} className="btn btn-primary">Post</div>
        </div>
    );
    let posts = (this.props.posts.length>0) ? this.props.posts.map((post)=>{
      // console.log('post in posts: ',post);
      return(
        <PostUser uid={post.uid} user={user} post={post} />
      );
    }) : '';
    return(
      <div className="live-posts-panel">
        LIVE POSTS
        {/* {opaqueBackground} */}
        <div className="scroller">
          {postEntry}
          {posts}
        </div>

      </div>
    );
  }
}

export default PostsUser;
