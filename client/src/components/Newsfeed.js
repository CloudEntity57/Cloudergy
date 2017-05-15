import React, { Component } from 'react';
import Header from './Header';
import StoryLinks from './StoryLinks';
import Post from './Post';
import Posts from './Posts';
import UserPanel from './UserPanel';
import { filterUser } from './Functions';
import jquery from 'jquery';
import { hashHistory } from 'react-router';
import { nyt_feed } from './apis/NYT_API';
import { wp_feed } from './apis/WP_API';
import { breitbart_feed } from './apis/BREIT_API';
import moment from 'moment';
const nytkey=process.env.REACT_APP_NYTAPI;
const wpkey=process.env.REACT_APP_WP_API;



class Newsfeed extends Component{
  constructor(props){
    super(props);
    this.state={
      test:'',
      stories:[],
      affiliation:this.props.affiliation,
      editing:false
    }
  }
  filterPosts(){
    let querystring = "http://localhost:3001/posts";
    let postsquery = jquery.ajax({
      url:querystring,
      type:'GET',
      success:(posts)=>{
        posts = posts.reverse();
        posts = posts.filter((val)=>{
          return val.postedon=='NA';
        });
        console.log('posts: ',posts);
        this.setState({
          posts:[]
        });
        this.setState({
          posts:posts
        });
      }
    });
  }
  componentWillMount(){
    let user = this.props.user;
    console.log('user in cdm newsfeed: ',user);
    this.setState({
      user:user
    });
    this.setState({
      editing:false
    });
    console.log('api key: ',nytkey);
    let affiliation = this.state.affiliation;
    console.log('affiliation in newsfeed: ',affiliation);
    let fullfeed=[];
    let result;

    this.filterPosts();

    let callback = (stories)=>{
      console.log('stories in callback: ',stories);
      fullfeed=fullfeed.concat(stories);
      this.setState({
        stories:fullfeed
      });
    }
      this.getNews(callback);
  }
  updatePosts(){
    this.filterPosts();
    console.log('updating!!!');
  }
  componentDidMount(){
    // let user = this.props.user;
    // console.log('user in cdm newsfeed: ',user);
    // this.setState({
    //   user:this.props.user
    // });

  }
  getNews(callback){
    nyt_feed(nytkey,callback);
    wp_feed(wpkey,callback);
    breitbart_feed(callback);
  }
  shuffle(array){
    //Fisher-Yates shuffle algorithm:
       var currentIndex = array.length, temporaryValue, randomIndex;

       // While there remain elements to shuffle...
       while (0 !== currentIndex) {

         // Pick a remaining element...
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;

         // And swap it with the current element.
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
     }

       return array;
  }

  emphasizeForm(e){
    let editing = this.state.editing;
    editing = (editing) ? false : true;
    this.setState({
      editing:editing
    });
  }
  render(){

    const profile = this.props.auth.getProfile();
    if(profile !== {}){
      console.log('render profile: ', profile);
    }
    let posts = (this.state.posts) ? this.state.posts : '';
    console.log('posts in newsfeed: ',posts);
    let affiliation = this.props.affiliation;
    console.log('affiliation in render: ',affiliation);
    let stories = this.state.stories;
    switch(affiliation){
      case 'liberal':
      stories = stories.filter((story)=>{
        return story.affiliation == 'liberal';
      });
      break;
      case 'conservative':
      stories = stories.filter((story)=>{
        return story.affiliation == 'conservative';
      });
      break;
    }
    stories = this.shuffle(stories);
    let user = this.props.user;
    console.log('user in newsfeed render: ',user);
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
                <div className="posts-wrapper">
                  <Posts update={this.updatePosts.bind(this)} posts={posts} userid={this.props.userid} user={user}/>
                </div>
                  <StoryLinks stories={stories}/>

            </div>
        </div>

        {/* <UserPanel/> */}



    </div>
    )
  }
}

export default Newsfeed;
