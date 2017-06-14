import React, { Component } from 'react';
import Post from './Post';
import jquery from 'jquery';
import { createDate } from './Functions';
let newModule = require('./Functions');
let Functions = new newModule();

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mainApp,submitPost,fetchPosts,fetchAllUsers,login } from '../actions/index';

class Posts extends Component{
  constructor(props){
    super(props);
    this.props.fetchPosts('');
    this.state={
      editing:false,
      user:{},
      posts:'',
      updated:false,
      privacyshowing:false
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
    let user = nextProps.user;
    console.log('users privacy: ',user[0].privacy);
    this.setState({
      privacy:user[0].privacy
    });
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
      editing:editing,
      privacyshowing:false
    });
    setTimeout(()=>{
        jquery('.opaqueBackground').css('background-color',color);
        jquery('.opaqueBackground').css('z-index',zIndex);
      },15);
  }
  submitPost(e){
    console.log('submitting post');
    this.emphasizeForm();
    // let affiliation = user.affiliation;
    let user = this.props.user[0];
    let prefix='';
    let affiliation = user.affiliation;
    console.log('user: ',user);
    if(user.affiliation !== this.props.affiliation_display && this.props.affiliation_display !=='none'){
      affiliation = this.props.affiliation_display;
      prefix="@"+this.props.affiliation_display+'s: '
    }
    let comment = prefix+this.refs.comment.value;
    console.log('comment: ',comment);
    //create date information for post:
    var today = Functions.createDate();
    let time = new Date().getTime();
    console.log('today: ',today);
    //create remaining variables for post:
    let userid = user.userid;
    console.log('userid: ',userid);
    //create post for POST request
    let post = {
      text:comment,
      uid:userid,
      affiliation:affiliation,
      date:today,
      time:time,
      privacy:this.state.privacy,
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
    if(this.props.token){
      this.props.submitPost(post);
    }else{
      this.props.login();
    }
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
      privacy:this.state.privacy,
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
    if(this.props.token){
      this.props.submitPost(post);
    }else{
      this.props.login();
    }
    // this.props.submitPost(post);
    this.refs.comment.value = "";
  }
  togglePrivacyChoices(){
    console.log('privacy');
    let boolean = !this.state.privacyshowing;
    this.setState({
      privacyshowing:boolean
    })
  }
  hidePrivacyChoices(){
    console.log('privacy');
    if(this.state.privacyshowing ==true){
      this.setState({
        privacyshowing:false
      })
    }
  }
  setPrivacy(setting){
    console.log('setting privacy to ',setting);
    this.setState({
      privacy:setting
    });
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
    let privacymenu = (this.state.privacyshowing) ? (
      <div className="privacymenu">
        <div>Who sees this?</div>
        <div onClick={()=>this.setPrivacy('public')} className="privacy-btns">Public</div>
        <div onClick={()=>this.setPrivacy('allies')} className="privacy-btns">Allies</div>
        <div onClick={()=>this.setPrivacy('private')} className="privacy-btns">Only Me</div>
      </div>
    ) : '';

    let userprivacy;
    switch(this.state.privacy){
      case 'public':
        userprivacy = (
          <span><i className = 'fa fa-users'></i>&nbsp;Everyone</span>
        );
      break;
      case 'allies':
        userprivacy = (
          <span><i className = 'fa fa-handshake-o'></i>&nbsp;Allies</span>
        );
      break;
      case 'private':
        userprivacy = (
          <span><i className = 'fa fa-lock'></i>&nbsp;Private</span>
        );
    }

    let postEntry = (this.state.editing) ?
    (  <div onClick={this.hidePrivacyChoices.bind(this)} className="panel clearfix panel-default tall-comment-form">
          <form className="" action="index.html" method="post">
            <textarea ref="comment" name="comment" rows="8" cols="40"></textarea>
          </form>
            <div onClick={submitFunction} className="btn btn-primary">Post</div>
            {privacymenu}
            <div onClick={this.togglePrivacyChoices.bind(this)} className="privacy-btn pull-left btn btn-default">{userprivacy}</div>
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
    //show only global, personal and ally posts:
    let myPost = false;
    posts = posts.filter((val)=>{
      if(val.uid == this.props.user[0].userid) myPost = true;
      let isAllies = false;
      this.props.user[0].allies.forEach((ally)=>{
        if (ally == val.uid) isAllies=true;
      });
      return val.privacy=='public' || val.privacy=='allies' && isAllies || myPost;
    });
    //case public wall:
      posts = posts.filter((val)=>{
        if(this.props.affiliation_display=="none"){
          return val.postedon=='NA' && val.text.slice(0,1) !== '@' || val.postedon==this.props.user[0].userid && val.text.slice(0,1) !== '@'
        }else{
          return (val.postedon=='NA' || val.postedon==this.props.user[0].userid) && val.affiliation==this.props.affiliation_display;
        }
      });
    }else{

    //case user wall:
      let results = [];
      for(let i=0; i<posts.length; i++){
        if(
          (posts[i].uid === this.props.wall && posts[i].postedon==='NA')  && posts[i].text.slice(0,1) !== '@'
         ||
          (posts[i].postedon === this.props.wall)  && posts[i].text.slice(0,1) !== '@'
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
  let affiliation_display = state.allReducers.mainApp.affiliation_display;
  let token = state.allReducers.mainApp.token;
  return{
    user,
    posts,
    isSubmitting,
    postsUpdated,
    wall,
    usersObject,
    affiliation_display,
    token
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    mainApp,
    submitPost,
    fetchPosts,
    fetchAllUsers,
    login
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Posts);
