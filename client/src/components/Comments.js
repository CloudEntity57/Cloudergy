import React, { Component } from 'react';
import UserPic from './UserPic';
//
class Comments extends Component{
  render(){
    return
  }
}

export default Comments;

// const comments = (post,users,onClick) =>{
//   //create comments:
//   // let post = this.props.post;
//   let comments = post.comments;
//   let userid = post.userid;
//   console.log('users in post: ',users);
//   console.log('this posts comments are: ',comments);
//   let commentSection = comments.map((val)=>{
//     let username = users[val.userid].username;
//     return(
//       <div className="user-comment"><UserPic userid={val.userid} /><span className="comment-username"><a id={userid} href="#" onClick={onClick}>{username}</a></span><span className="user-comment-text">{val.text}</span></div>
//     );
//   });
// }
//
// export default comments;
