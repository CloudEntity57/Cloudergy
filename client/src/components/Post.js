import React, { Component } from 'react';
import UserPic from './UserPic';
import PostHeader from './PostHeader';
import jquery from 'jquery';
let functionsModule = require('./Functions');
let Functions = new functionsModule();

class Post extends Component{
  constructor(props){
    super(props);
    this.state={
      user:{}
    }
  }
  componentWillMount(){
    let uid = (this.props.uid) ? this.props.uid : '';
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
  displayUser(e){
    let target = e.target;
    console.log('displaying! ',e.target);
    let message = (<div id="user-hover-tab">hello!!!!!</div>);
    setTimeout(
      function(){
        target.after(message);
      },1000);
  }
  hideUser(e){
    let target = e.target
    console.log('hiding! ',e.target);
    jquery(e.target).siblings('div').remove();
  }
  updatePosts(){
    this.props.updatePosts();
  }
  postComment(e){
    e.preventDefault();
    console.log('posting comment:',this.refs.comment.value);
    console.log('data: ',this.refs.comment);
    jquery.ajax({
      url:"http://localhost:3001/postcomment",
      type:"POST",
      data:{
        comment:this.refs.comment.value,
        id:this.refs.comment.id
      },
      success:(val)=>{
        console.log('success! ',val);
      }
    });
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
    let post = (this.props.post) ? this.props.post : '';
    // console.log('Post post: ',post);
    let text = post.text;
    let date = post.date;
    let id = post._id;
    let postId = post._id;
    console.log('post id: ',postId);
    let currentId = post.uid;
    const props = {
      post : (this.props.post) ? this.props.post : '',
      // console.log('Post post: ',post);
      text : post.text,
      date : post.date,
      id : post._id,
      postId : post._id,
      currentId: currentId,
      pic:userpic,
      updatePosts:this.updatePosts.bind(this)
    }
    return(
      <div className="user-post">
      <div id={id} className="post-panel">
        <PostHeader {...props} id={user.userid}  user={user}/>

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
        <UserPic userid={myId} />
        <form info={postId} onSubmit={this.postComment.bind(this)}>
          <input ref="comment" id={postId} placeholder=" Comment here..." />
        </form>
      </div>
    </div>
    );
  }
}

export default Post;
