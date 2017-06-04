import React, { Component } from 'react';
import Post from './Post';
import jquery from 'jquery';
import { createDate } from './Functions';
let newModule = require('./Functions');
let Functions = new newModule();

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mainApp,submitPost,fetchPosts,fetchAllUsers } from '../actions/index';

class Posts extends Component{
  constructor(props){
    super(props);
    this.props.fetchPosts('');
    this.state={
      editing:false,
      user:{},
      posts:'',
      updated:false
    }
  }
  componentWillMount(){
    // let posts = this.props.posts.reverse();
    // let posts=this.props.posts;
    // // posts = posts.reverse();
    //
    // this.setState({
    //   editing:false,
    //   posts:posts
    // });
  }
  componentWillReceiveProps(nextProps){
    // let user = nextProps.user;
    // let posts;
    // if(!this.props.postsUpdated){
    //   posts = nextProps.posts;
    //   // this.setState({
    //   //   updated:true
    //   // });
    // }else{
    //   posts = nextProps.posts.reverse();
    // }
    // posts=nextProps.posts;
    // posts = posts.filter((val)=>{
    //   return val.postedon=='NA';
    // });
    // console.log('now the posts are: ',posts);
    // this.setState({
    //   user:user,
    //   posts:posts
    // });
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
    console.log('submitting post');
    this.emphasizeForm();
    let comment = this.refs.comment.value;
    console.log('comment: ',comment);
    let user = this.props.user[0];
    console.log('user: ',user);
    //create date information for post:
    var today = Functions.createDate();
    let time = new Date().getTime();
    console.log('today: ',today);
    //create remaining variables for post:
    let userid = user.userid;
    console.log('userid: ',userid);
    let affiliation = user.affiliation;
    //create post for POST request
    let post = {
      text:comment,
      uid:userid,
      affiliation:affiliation,
      date:today,
      time:time,
      postedon:'NA',
      likes:0,
      likers:["12345"],
      comments:[{
        "id":"12345",
        "text":"hi",
        "userid":userid,
        "likes":0
      }]
    }
    console.log('post: ',post);
    this.props.submitPost(post);
    this.refs.comment.value = '';
  }

  submitUserPost(e){
    console.log('submitting user post');
    this.emphasizeForm();
    let postText = this.refs.comment.value;
    //user whose wall this is:
    let user = this.props.usersObject[this.props.wall];
    //user looking at page:
    let currentUser = this.props.user[0];
    let time = new Date().getTime();
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
      time:time,
      postedon:postedon,
      likes:0,
      likers:["12345"],
      comments:[{
        "id":"12345",
        "text":"hi",
        "userid":uid,
        "likes":0
      }]
    }
    console.log('post: ',post);

    this.props.submitPost(post);
    this.refs.comment.value = "";
  }

  render(){

    let submitFunction = (this.props.wall=='public') ? (()=>{this.submitPost()}) : (()=>{this.submitUserPost()});
    console.log('wall state: ',this.props.wall);
    // let user = (this.state.user) ? this.state.user : '';
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
            <div onClick={submitFunction} className="btn btn-primary">Post</div>
      </div>
    )
    :
    (
      <div onClick={this.emphasizeForm.bind(this)} className="panel clearfix panel-default comment-form">
            <form className="" action="index.html" method="post">
              <textarea ref="comment" name="comment" rows="8" cols="20"></textarea>
            </form>
              <div onClick={submitFunction} className="btn btn-primary">Post</div>
        </div>
    );

    let posts = (this.props.posts.length>0) ? this.props.posts : [];


    //filter for different post component locations:
    if(this.props.wall === 'public'){

    //case public wall:
      posts = posts.filter((val)=>{
        return val.postedon=='NA' || val.postedon==this.props.user[0].userid;
      });
    }else{

    //case user wall:
      let results = [];
      for(let i=0; i<posts.length; i++){
        if(
          (posts[i].uid === this.props.wall && posts[i].postedon==='NA')
         ||
          (posts[i].postedon === this.props.wall)
        )
          {
            results.push(posts[i]);
          }
      }
      posts = results;
    }
    let finalposts = posts.map((post)=>{
      return(
        <Post uid={post.uid} post={post._id} />
      );
    });

    return(
      <div className="live-posts-panel">
        {opaqueBackground}
        <div className="scroller">
          {postEntry}
          {finalposts}
          {/* <div className="tall panel panel-default">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste optio, veniam consequatur sed molestias. Corporis temporibus accusamus nesciunt perspiciatis quaerat vel cum omnis modi dolores fugit ex impedit, ullam libero.</div> */}
        </div>

      </div>
    );
  }
}

function mapStateToProps(state){
  let user = state.allReducers.mainApp.user;
  let posts = state.allReducers.mainApp.posts;
  let isSubmitting = state.allReducers.mainApp.isSubmitting;
  let postsUpdated = state.allReducers.mainApp.postsUpdated;
  let wall = state.allReducers.mainApp.wall;
  let usersObject = state.allReducers.mainApp.usersObject;
  return{
    user,
    posts,
    isSubmitting,
    postsUpdated,
    wall,
    usersObject
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    mainApp,
    submitPost,
    fetchPosts,
    fetchAllUsers
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Posts);
