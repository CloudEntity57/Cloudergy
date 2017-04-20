import React, { Component } from 'react';
import Post from './Post';

class Posts extends Component{
  render(){
    return(
      <div className="live-posts-panel">
        LIVE POSTS
        <div className="scroller">
          <div className="panel clearfix panel-default comment-form">
              <form className="" action="index.html" method="post">
                <textarea name="comment" rows="8" cols="40"></textarea>
              </form>
                <div className="btn btn-primary">Post</div>
          </div>
          <Post />
          <div className="panel panel-default">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt consequuntur odio laboriosam distinctio, veritatis obcaecati dicta totam aut, sunt officia autem non quasi nisi nostrum. Quod voluptate, quidem tenetur corporis.</div>
          <div className="panel panel-default">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis voluptatibus, excepturi corrupti culpa laborum at tempore nulla quas minima ab perferendis ipsum odio illo dignissimos odit aut, libero nam? Aut.</div>
          <div className="tall panel panel-default">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste optio, veniam consequatur sed molestias. Corporis temporibus accusamus nesciunt perspiciatis quaerat vel cum omnis modi dolores fugit ex impedit, ullam libero.</div>
        </div>

      </div>
    );
  }
}

export default Posts;
