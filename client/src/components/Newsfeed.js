import React, { Component } from 'react';
import Header from './Header';
import StoryLinks from './StoryLinks';
import Post from './Post';
import { filterUser } from './FilterUser';
import jquery from 'jquery';
import { hashHistory } from 'react-router';
import { nyt_feed } from './NYT_API';
const nytkey=process.env.REACT_APP_NYTAPI;
const wpkey=process.env.REACT_APP_WP_API;

class Newsfeed extends Component{
  constructor(props){
    super(props);
    this.state={
      test:''
    }
  }
  componentWillMount(){
    console.log('api key: ',nytkey);
    let result;
    let callback = (stories)=>{
      console.log('stories in callback: ',stories);
      this.setState({
        stories:stories
      });
    }
    nyt_feed(nytkey,callback);
  }
  setStories(stories){
    console.log('stories in callback: ',stories);
    this.setState({
      stories:stories
    });
  }
  componentDidMount(){



    let auth = this.props.auth;
    let targetURL = "http://localhost:3001/user/"
    console.log('app js auth: ',auth);

    setTimeout(()=>{
      const profile = auth.getProfile();
      console.log('cwm profile: ', profile);
      console.log('app js profile: ',profile);
        this.setState({
          profile:profile
        });
        let query = jquery.ajax({
          url:targetURL+profile.clientID,
          type:'GET',
          success:(val)=>{
            console.log('success: ',val);
          }
        });
        query.done((val)=>{
          console.log('user in database: ',val);
          if(!val || val.length===0){
            console.log('val empty! Not on file.');
            let post = jquery.ajax({
              url:targetURL,
              data:{
                first_name:profile.given_name,
                last_name:profile.family_name,
                photo:profile.picture,
                userid:profile.clientID
              },
              type:'POST'
            });
            hashHistory.push('/account');
          }
        });
  },1000);
    // setTimeout(()=>{
    //
    // },300);
  }
  render(){
    const profile = this.props.auth.getProfile();
    if(profile !== {}){
      console.log('render profile: ', profile);
    }
    let stories = this.state.stories;
    return(
      <div>
        <div className="outer-wrapper">
            <div className="wrapper">
                <div className="navigation-panel">
                  NAVIGATION
                  <div className="panel panel-default">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque corrupti quo voluptas est, incidunt repudiandae, facilis nisi quam possimus quae beatae blanditiis, repellendus, ducimus placeat totam. Aliquid maiores porro harum?</div>
                  <div className="panel panel-default">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa nihil optio quae sunt possimus fugit doloribus quidem nisi inventore iusto aut, distinctio hic, maxime adipisci facilis illo sint laboriosam exercitationem.</div>
                  <div className="panel panel-default">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis nam sed odit maiores corporis accusantium dignissimos quis consequatur, accusamus et. Sapiente aperiam excepturi, perferendis aliquam cumque amet praesentium quasi adipisci.</div>
                </div>
                <div className="live-posts-panel">
                  LIVE POSTS
                  <div className="scroller">
                    <div className="panel clearfix panel-default comment-form">
                        <form className="" action="index.html" method="post">
                          <textarea name="comment" rows="8" cols="40"></textarea>
                        </form>
                          <div className="btn btn-primary">Post</div>
                    </div>
                    <div className="panel panel-default">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt consequuntur odio laboriosam distinctio, veritatis obcaecati dicta totam aut, sunt officia autem non quasi nisi nostrum. Quod voluptate, quidem tenetur corporis.</div>
                    <div className="panel panel-default">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis voluptatibus, excepturi corrupti culpa laborum at tempore nulla quas minima ab perferendis ipsum odio illo dignissimos odit aut, libero nam? Aut.</div>
                    <div className="tall panel panel-default">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste optio, veniam consequatur sed molestias. Corporis temporibus accusamus nesciunt perspiciatis quaerat vel cum omnis modi dolores fugit ex impedit, ullam libero.</div>
                  </div>

                </div>
              <StoryLinks stories={stories}/>
            </div>
        </div>

        <div className="users">
          users
        </div>



    </div>
    )
  }
}

export default Newsfeed;
