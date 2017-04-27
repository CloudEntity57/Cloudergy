import React, { Component } from 'react';
import Post from './Post';
import jquery from 'jquery';
import { createDate } from './Functions';

class Posts extends Component{
  constructor(props){
    super(props);
    this.state={
      editing:false
    }
  }
  componentWillMount(){
    this.setState({
      editing:false
    });
  }
  componentDidMount(){
    let querystring = "http://localhost:3001/posts";
    let postsquery = jquery.ajax({
      url:querystring,
      type:'GET',
      success:(posts)=>{
        posts = posts.reverse();
        console.log('posts: ',posts);
        this.setState({
          posts:posts
        });
      }
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
    let comment = this.refs.comment.value;
    console.log('comment: ',comment);
    let user = this.props.user;
    console.log('user: ',user);
    //create date information for post:
    var today = createDate();
    console.log('today: ',today);
    //create remaining variables for post:
    let userid = user.userid;
    let affiliation = user.affiliation;
    //create post for POST request
    let post = {
      text:comment,
      uid:userid,
      affiliation:affiliation,
      date:today
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
    let user = this.props.user;
    let opaqueBackground = (this.state.editing) ?
    (
      <div onClick={this.emphasizeForm.bind(this)} className="opaqueBackground"></div>
    )
    : '';
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
    let posts = (this.state.posts) ? this.state.posts.map((post)=>{
      console.log('post in posts: ',post);
      return(
        <Post uid={post.uid} post={post} />
      );
    }) : '';
    return(
      <div className="live-posts-panel">
        LIVE POSTS
        {opaqueBackground}
        <div className="scroller">
          {postEntry}
          {posts}
          <div className="tall panel panel-default">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste optio, veniam consequatur sed molestias. Corporis temporibus accusamus nesciunt perspiciatis quaerat vel cum omnis modi dolores fugit ex impedit, ullam libero.</div>
        </div>

      </div>
    );
  }
}

export default Posts;
