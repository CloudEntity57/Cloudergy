import React, { Component } from 'react';
import UserPic from './UserPic';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
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
  likeComment(e){
    e.preventDefault();
    let comment = e.target;
    let data = {
      comment,
      liker:this.props.user[0].userid
    }
    // this.props.likeComment(data);
  }
  replyComment(e){
    e.preventDefault();
    let comment = e.target.id;
    console.log('target: ',comment);
    // this.refs.comment.value='@'+comment.id+' ';
    // this.refs.comment.focus();
    this.props.replyComment(comment);
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
  render(){
    let comments=(this.props.comments) ? this.props.comments : [];
    console.log('comments in component: ',comments);
    let userid = (this.props.userid) ? this.props.userid:'';
    console.log('userid: ',userid);
    let users = (this.props.users) ? this.props.users : [];
    console.log('users in component: ',users);
    let user = (this.props.user[0].hasOwnProperty('_id')) ? this.props.user[0] : {};
    console.log('userid in comment: ',this.props.user[0].userid);
    let val = (this.props.comment) ? this.props.comment : '';
    console.log('this comments id: ',val.userid);
      let username = users[val.userid].username;
      let editOption = (val.userid === user.userid) ? (
            <a id={val.id} onClick={this.editComment.bind(this)} href="#">Edit comment</a>
      ) : '';
      let edit = (this.state.displayeditoption) ? (
        <div className="comment-editbox">
          {/* <ul> */}
            {editOption}
            <a id={val.id} onClick={this.deleteComment.bind(this)} href="#">Delete comment</a>
          {/* </ul> */}
        </div>
      ) : '';
      let edittoggle = (this.state.displayedit && this.props.authenticated) ? (<div className="comment-edit" onClick={this.toggleEditOption.bind(this)}><div className="fa fa-sort-desc"></div> {edit}</div>) : '';
      return(
        <div onMouseEnter={()=>this.displayEdit()} onMouseLeave={()=>this.hideEdit()} className="comment-container">
          <span className='userpic-comment-col'><UserPic userid={val.userid} /></span>
          <div className="comment-header-text">
          <div className="user-comment"><span className="comment-username"><a id={val.userid} href=""  onClick={()=>this.goToUser(val.userid)}>{username}</a></span><span className="user-comment-text">{val.text}</span></div>
          <div className="user-comment"><a id={val.id} onClick={this.likeComment.bind(this)} href="#">Like</a><a id={username} onClick={this.replyComment.bind(this)} href="#">Reply</a></div>
        </div>
          {edittoggle}
        </div>
      );

  }
}
function mapStateToProps(state){
  state = state.allReducers.mainApp;
  let user = state.user;
  let authenticated = state.authenticated
  return{
    user,
    authenticated
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    push
  },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
