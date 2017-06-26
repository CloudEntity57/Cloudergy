import React, { Component } from 'react';
import UserPic from './UserPic';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { likeComment } from '../actions/index';
//
class Comment extends Component{
  constructor(props){
    super(props);
    this.state={
      displayedit:false,
      displayeditoption:false
    }
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
      displayedit:false,
      displayeditoption:false
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
  editComment(e){
    e.preventDefault();
    let commentid = e.target.id;
    console.log('deleting! ',e.target);
    let post = this.props.post;
    console.log('post deleted: ',post);
    let data={
      id:commentid,
      post
    }
    this.props.editComment(data);
  }
  toggleEditOption(e){
    e.preventDefault();
    let option = this.state.displayeditoption;
    this.setState({
      displayeditoption:!option
    });
    if(this.state.editoption){

    }
  }
  goToUser(userid){
    this.props.push('/user/'+userid);
    console.log('going to user');
  }
  replyComment(e){
    e.preventDefault();
    let comment = e.target.id;
    console.log('target: ',comment);
    // this.refs.comment.value='@'+comment.id+' ';
    // this.refs.comment.focus();
    this.props.replyComment(comment);
  }
  likeComment(e){
    e.preventDefault();
    let comment = e.target;
    console.log('liking ',this.props.post_id,', ',e.target.id);
    let data = {
      comment,
      liker:this.props.user[0].userid,
      post:this.props.post_id,
      comment:e.target.id
    }
    this.props.likeComment(data);
  }
  render(){
    let comments=(this.props.comments.length>0) ? this.props.comments : [];
    console.log('comments in component: ',comments);
    let post_userid = (this.props.post_userid) ? this.props.post_userid:'';
    // console.log('userid: ',userid);
    let users = (this.props.users) ? this.props.users : [];
    console.log('users in component: ',users);
    let user = (this.props.user.length>0) ? this.props.user[0] : {};
    console.log('userid in comment: ',user.userid);
    let comment = (this.props.comment) ? this.props.comment : '';
    let comment_likes = (comment.likers && comment.likers.length>1) ? (
      <span>{comment.likers.length-1}</span>
    ) : '';
    let likes = (comment.likers !==undefined && comment.likers.length>1) ? (<span><a className="fa fa-thumbs-up"></a>{comment_likes}</span>) : '';
    console.log('this comments id: ',comment.userid);
      let username = users[comment.userid].username;
      let editOption = (comment.userid === user.userid) ? (
            <a id={comment.id} className="deletebar-item" onClick={this.editComment.bind(this)} href="#">Edit</a>
      ) : '';
      let deleteOption = (comment.userid == user.userid) ? (
            <a id={comment.id} className="deletebar-item" onClick={this.deleteComment.bind(this)} href="#">Delete</a>
      ) : '';
      let edit = (this.state.displayeditoption) ? (
        <div className="post-header-deletebar">
          {/* <ul> */}
            {deleteOption}
            {editOption}
            {/* <a id={comment.id} className="deletebar-item" onClick={this.deleteComment.bind(this)} href="#">Delete comment</a> */}
          {/* </ul> */}
        </div>
      ) : '';
      // <div>
      //   <a id={postId} className="deletebar-item" onClick={this.deletePost.bind(this)} href="#">Delete</a>
      //   <a id={postId} className="deletebar-item" onClick={this.editPost.bind(this)} href="#">Edit</a>
      // </div>
      let edittoggle = (this.state.displayedit && this.props.token && comment.userid == user.userid) ? (<div className="comment-edit" onClick={this.toggleEditOption.bind(this)}><div className="fa fa-sort-desc"></div> {edit}</div>) : '';
      return(
        <div onMouseEnter={()=>this.displayEdit()} onMouseLeave={()=>this.hideEdit()} className="comment-container">
          <span className='userpic-comment-col'>
            <UserPic userid={comment.userid} />
          </span>
          <div className="comment-header-text">
          <div className="user-comment">
            <span className="comment-username">
              <span id={post_userid} href="" onClick={()=>this.goToUser(comment.userid)}>
                {username}
              </span>
            </span>
            <span className="user-comment-text">{comment.text}</span>
          </div>
          <div className="user-comment"><a id={comment.id} onClick={this.likeComment.bind(this)} href="#">Like</a><a id={username} onClick={this.replyComment.bind(this)} href="#">Reply</a>{likes}</div>
        </div>
          {edittoggle}
        </div>
      );

  }
}
function mapStateToProps(state){
  state = state.allReducers.mainApp;
  let user = state.user;
  let token = state.token
  return{
    user,
    token
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    push,
    likeComment
  },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
